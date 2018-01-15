import datetime
import pymysql
import flask
from flask import Flask
from flaskext.mysql import MySQL
from flask import request
from flask import session
from flask import redirect, url_for
from werkzeug.utils import secure_filename

app = Flask(__name__, static_url_path="")

mysql = MySQL(cursorclass=pymysql.cursors.DictCursor)

app.secret_key = "SECRET_KEY"
UPLOAD_FOLDER = '/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER




app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "filipcurcic1997"
app.config["MYSQL_DATABASE_DB"] = "movies_db"
app.config["MYSQL_DATABASE_HOST"] = "localhost"

mysql.init_app(app)



@app.route("/")
@app.route("/index")
@app.route("/index.html")
def home():
    return app.send_static_file("index.html")

@app.route("/filmovi", methods=["GET"])
def filmovi():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM movie")
    rows = cursor.fetchall()

    return flask.jsonify(rows)
@app.route("/ratings", methods=["GET"])
def rejtinzi():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT movie.avg_vote, movie.title, movie.poster_path FROM movie ORDER BY movie.avg_vote DESC")
    rows = cursor.fetchall()

    return flask.jsonify(rows)
@app.route("/popularity", methods=["GET"])
def popular():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT movie.vote_count, movie.title, movie.poster_path, movie.avg_vote FROM movie ORDER BY movie.vote_count DESC")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@app.route("/actors", methods=["GET"])
def getActors():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM movie_person INNER JOIN person ON movie_person.person_idperson = person.idperson")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@app.route("/directors", methods=["GET"])
def getDirectors():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM movie_person INNER JOIN person ON movie_person.person_idperson = person.idperson WHERE role_idrole=2")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@app.route("/users", methods=["GET"])
def getUsers():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM user INNER JOIN person ON user.person_idperson = person.idperson")
    rows = cursor.fetchall()

    return flask.jsonify(rows)


@app.route('/register', methods=["POST"])
def registration():
    db = mysql.get_db()
    first_name = request.form['firstName']
    last_name = request.form['lastName']
    user_email = request.form['emailAdress']
    user_name = request.form['username']
    pass_word = request.form['password']
    gender = request.form['options']
    birthday = request.form['date_of_birth']
    cursor = mysql.get_db().cursor()
    query='''INSERT INTO person(first_name,last_name,gender,date_of_birth) VALUES(%s,%s,%s,%s)'''
    query1='''INSERT INTO user(username,password,person_idperson,email) VALUES(%s,%s,%s,%s)'''
    
    cursor.execute(query, (first_name, last_name, gender, birthday))
    cursor.execute(query1,(user_name, pass_word, cursor.lastrowid, user_email))
    db.commit()

    return flask.jsonify({"status": "done"}), 201

@app.route('/login', methods=["POST"])
def login():
    login_user = request.json
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM user WHERE username=%s AND password=%s", (login_user["username"], login_user["password"]))
    user = cursor.fetchone()
    if user is not None:
        session["user"] = user


    
    return flask.jsonify(session["user"])


@app.route('/upload', methods=["POST"])
def newMovie():
    db = mysql.get_db()
   

    movie_title = request.form['title']
    movie_description = request.form['description']
    movie_runtime = int(request.form['runtime'])
    movie_release = int(request.form['release'])
    movie_actors = request.form.getlist('actor')
    movie_directors = request.form.getlist('directors')

    cursor = mysql.get_db().cursor()
    query1 = '''INSERT INTO movie_person(role_idrole, person_idperson, movie_idmovie) VALUES(%s,%s,%s)'''

    
    for i in movie_actors:
        
        cursor.execute(query1,(i['role_idrole'], i['person_idperson'], cursor.lastrowid))
        

    db.commit()
    return flask.jsonify({"status": "done"}), 201
    
app.run("0.0.0.0", 80, threaded=True)