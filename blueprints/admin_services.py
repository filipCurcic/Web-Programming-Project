import datetime
import flask
# Dobavljanje klase blueprint iz flask modula.
from flask import Blueprint
from utils.db_connection import mysql
from flask import request
from functools import wraps
from werkzeug.utils import secure_filename
import os


admin_services = Blueprint("admin_services", __name__)




'''def is_logged_in(f): 
    @wraps(f)
    def wrap(*args, **kwargs):
        if session.get("user")["user_type"] == "Admin":
            return f(*args, **kwargs)
        else:
            return flask.jsonify({"Error": "Unauthorized access"})
    return wrap
'''

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS




@admin_services.route('/movies', methods=["POST"])
def newMovie():
    db = mysql.get_db()
    
    data = request.json
    cursor = mysql.get_db().cursor()

    movie_title = data['title']
    movie_description = data['desc']
    movie_runtime = data['runtime']
    movie_release = data['release']
    director = data['director']
    actors = data['actor']
    genre = data['genre']
    vote_amount = data['vote_count']
    average_vote = data['avg_vote']
    
    '''
    uploaded_file = request.files.get('poster')
    
    ext = os.path.splitext(uploaded_file.filename)[1]
    db_poster = uploaded_file+ext

    if uploaded_file and allowed_file(uploaded_file.filename):
        filename = secure_filename(uploaded_file.filename)
        uploaded_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    '''

    cursor.execute("SELECT title FROM movie")

    titleCheck = cursor.fetchall()

    print(titleCheck)


    
    query = '''INSERT INTO 
    movie(movie.title, movie.desc, movie.runtime, movie.release, movie.vote_count, movie.avg_vote, movie.vote_sum, movie.vote_amt)
    VALUES(%s, %s, %s, %s, %s, %s, %s, %s)
    '''

    query1 = '''INSERT INTO
    movie_person(movie_person.movie_idmovie, movie_person.person_idperson) 
    VALUES(%s,%s)
    '''

    query2 = '''INSERT INTO
    movie_genre(movie_genre.genre_idgenre, movie_genre.movie_idmovie) 
    VALUES(%s,%s)
    '''
    
    for i in titleCheck:
        if movie_title == i["title"]:
            return flask.jsonify({"status": "error"})
        else:
            cursor.execute(query,(movie_title, movie_description, movie_runtime, movie_release, vote_amount, average_vote, 0, 0))
            movie_id = cursor.lastrowid
            

            cursor.execute(query1,(movie_id, director["idperson"]))     
            for i in actors:
                cursor.execute(query1,(movie_id, i["idperson"]))
            for i in genre:
                cursor.execute(query2, (i["idgenre"], movie_id))
                
            db.commit()
            
            return flask.jsonify({"status": "done"}), 201

@admin_services.route("/people", methods=["POST", "GET"])
def add_person():

    db = mysql.get_db()

    data = request.json

    
    first_name =  data['first_name']
    last_name =  data['last_name']
    gender = data['gender']
    date_of_birth = data['date_of_birth']
    person_type = data['person_type']
    
    print(data['person_type'], "aaa")

    cursor = db.cursor()

    query = '''INSERT INTO person(first_name, last_name, gender, date_of_birth, person_type) VALUES(%s, %s, %s, %s, %s) '''
    cursor.execute(query, (first_name, last_name, gender, date_of_birth, person_type))
    db.commit()

    return flask.jsonify({"status": "done"}), 201

@admin_services.route("/users/<int:iduser>", methods=["DELETE"])
def remove_user(iduser):

    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM user WHERE iduser=%s", (iduser, ))
    cursor.execute("DELETE FROM person WHERE idperson=(SELECT user.person_idperson FROM user WHERE iduser=%s)", (iduser, ))
    cursor.execute("DELETE FROM user_ratings WHERE user_iduser=%s", (iduser, ))
    cursor.execute("DELETE FROM user_reviews WHERE user_iduser=%s", (iduser, ))
    cursor.execute("DELETE FROM watchlist WHERE user_iduser=%s", (iduser, ))
    db.commit()

    return ""

@admin_services.route("/users/<int:iduser>", methods=["PUT"])
def change_user(iduser):
    

    db = mysql.get_db()
    cursor = db.cursor()
    query = '''UPDATE user SET user.user_type=%s WHERE user.iduser=%s'''
    
    cursor.execute(query, ("Admin", iduser, ))
    db.commit()
    print("asdasdasd")

    return flask.jsonify({"status":"success"})




@admin_services.route("/movies/<int:idmovie>", methods=["DELETE"])
def remove_movie(idmovie):

    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM movie_genre WHERE movie_idmovie=%s", (idmovie, ))
    cursor.execute("DELETE FROM movie_person WHERE movie_idmovie=%s", (idmovie, ))
    cursor.execute("DELETE FROM watchlist WHERE movie_idmovie=%s", (idmovie, ))
    cursor.execute("DELETE FROM movie WHERE idmovie=%s", (idmovie, ))
    
    db.commit()

    return ""

@admin_services.route("/Genres", methods=["GET"])
def moviesGenres():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * from genre")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@admin_services.route("/users", methods=["GET"])
def getUsers():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM user INNER JOIN person ON user.person_idperson = person.idperson")
    rows = cursor.fetchall()

    return flask.jsonify(rows)


@admin_services.route("/movies/<int:idmovie>", methods=["PUT"])
def change_movie(idmovie):
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    q = '''UPDATE movie SET movie.title=%s, movie.desc=%s, movie.runtime=%s,
    movie.release=%s, movie.poster_path=%s WHERE movie.idmovie=%s'''
    
    cursor.execute(q, (data["title"], data["desc"], data["runtime"],
                       data["release"], data["poster_path"], idmovie))

    db.commit()
    return ""