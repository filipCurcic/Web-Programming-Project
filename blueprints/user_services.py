import datetime
import flask
from flask import Blueprint
from utils.db_connection import mysql
from flask import request, session, redirect, flash, render_template
from passlib.hash import sha256_crypt
from pymysql import IntegrityError

user_services = Blueprint("user_services", __name__)


@user_services.route('/registration', methods=["POST", "GET"])
def registration():
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    data = request.json
    
    first_name = data['first_name']
    last_name = data['last_name']
    gender = data['gender']
    birthday = data['date_of_birth']

    user_name = data['username']
    pass_word = sha256_crypt.encrypt(str(data['password']))
    user_email = data['email']

    cursor.execute("SELECT username FROM user")
    username_check = cursor.fetchall()


    cursor.execute("SELECT email FROM user")
    email_check = cursor.fetchall()


    
     

    

    query='''INSERT INTO person(first_name,last_name,gender,date_of_birth, person_type) VALUES(%s,%s,%s,%s,%s)'''
    query1='''INSERT INTO user(username,password,person_idperson,email, user_type) VALUES(%s,%s,%s,%s,%s)'''
    for i in username_check:
        for j in email_check:
            if user_name == i["username"] or user_email == j["email"]:
                print("A user with that username or email already exists")
                return flask.jsonify({"status": "error"})
    cursor.execute(query, (first_name, last_name, gender, birthday, "USER"))
    cursor.execute(query1,(user_name, pass_word, cursor.lastrowid, user_email, "User"))
    db.commit()
    return flask.jsonify({"status": "done"})

@user_services.route('/watchlist', methods=["GET"])
def watchlist():
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    iduser = session.get('user')["iduser"]
    cursor.execute("SELECT * FROM watchlist INNER JOIN movie ON watchlist.movie_idmovie = movie.idmovie WHERE watchlist.user_iduser=%s", (iduser, ))
    rows = cursor.fetchall()

    return flask.jsonify(rows)


@user_services.route('/AddToWatchlist', methods=["POST"])
def add_to_watchlist():
    db = mysql.get_db()
    data = request.json
    cursor = mysql.get_db().cursor()
    

    
    try:
        iduser = session.get('user')["iduser"]
        movie_idmovie = data["movie_idmovie"]

        query = ''' INSERT INTO watchlist(watchlist.movie_idmovie, watchlist.user_iduser) VALUES(%s, %s) '''
        cursor.execute(query, (movie_idmovie, iduser))
        db.commit()
        return flask.jsonify({"status": "done"}), 201
    except IntegrityError:
        return flask.jsonify({"status": "error"})
    except TypeError:
        return flask.jsonify({"status": "logError"})

    

@user_services.route("/watchlist/<int:idmovie>", methods=["DELETE"])
def remove_from_watchlist(idmovie):

    db = mysql.get_db()
    cursor = db.cursor()
    user_id = session.get("user")["iduser"]
    cursor.execute("DELETE FROM watchlist WHERE movie_idmovie=%s AND user_iduser=%s", (idmovie, user_id, ))

    db.commit()

    return ""

@user_services.route("/rateMovie", methods=["POST"])
def rate_movie():
    db = mysql.get_db()
    data = request.json
    cursor = mysql.get_db().cursor()
    user_id = session.get("user")["iduser"]
    movie_user_rating = data["movie_rating"]
    movie_id = data["movie_idmovie"]
    print('aaaaa', data["movie_rating"])
    print(data["movie_rating"])

    query = ''' INSERT INTO user_ratings(rating, movie_idmovie, user_iduser) VALUES(%s, %s, %s)'''

    try:
        cursor.execute(query, (movie_user_rating, movie_id, user_id))
        db.commit()
        return flask.jsonify({"status": "done"}), 201
    except IntegrityError:
        return flask.jsonify({"status": "error"})

@user_services.route('/ratingsByUser', methods=["GET"])
def ratings():
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    iduser = session.get('user')["iduser"]
    cursor.execute("SELECT * FROM user_ratings INNER JOIN movie ON user_ratings.movie_idmovie = movie.idmovie WHERE user_ratings.user_iduser=%s", (iduser, ))
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@user_services.route("/ratingsByUser/<int:idmovie>", methods=["GET"])
def movie_rating(idmovie):
    
    cursor = mysql.get_db().cursor()
    iduser1 = session.get('user')["iduser"]
    cursor.execute("SELECT * FROM user_ratings INNER JOIN movie ON user_ratings.movie_idmovie = movie.idmovie WHERE user_ratings.movie_idmovie=%s AND user_ratings.user_iduser=%s", (idmovie, iduser1))
    rows = cursor.fetchall()


    return flask.jsonify(rows)

@user_services.route("/editedProfile", methods=["PUT"])
def change_profile():
    data = request.json
    db = mysql.get_db()
    cursor = db.cursor()
    iduser2 = session.get('user')["iduser"]
    
    changed_username = data["username"]
    changed_email = data["email"]
    changed_first_name = data["first_name"]
    changed_last_name = data["last_name"]

    cursor.execute("SELECT username FROM user")
    username_check = cursor.fetchall()

    cursor.execute("SELECT email FROM user")
    email_check = cursor.fetchall()

    q = ''' UPDATE user SET user.username=%s, user.email=%s WHERE user.iduser=%s '''

    q1 = ''' UPDATE person SET person.first_name=%s, person.last_name=%s WHERE idperson=(SELECT person_idperson FROM user WHERE user.iduser=%s) '''
    
    for i in username_check:
        for j in email_check:
            if changed_username == i["username"] or changed_email == j["email"]:
                return flask.jsonify({"status": "error"})

    cursor.execute(q, (changed_username, changed_email, iduser2))
    cursor.execute(q1, (changed_first_name, changed_last_name, iduser2))

    db.commit()
    print(data)
    return flask.jsonify({"status": "success"})