import datetime
import flask
# Dobavljanje klase blueprint iz flask modula.
from flask import Blueprint
from utils.db_connection import mysql
from flask import request
from flask import session

user_services = Blueprint("user_services", __name__)



'''@user_services.route("/login", methods=["POST"])
def login():
    login_user = request.json
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM user WHERE username=%s AND password=%s", (login_user["username"], login_user["password"]))
    user = cursor.fetchone()

    if user is not None:
        session["user"] = user
        return flask.jsonify({"success": True})

    return flask.jsonify({"success": False}) 

@user_services.route("/isLoggedin", methods=["GET"])
def is_loggedin():
    # Vraca true ako je korisnik ulogovan,
    # u suprotnom vraca false.
    return flask.jsonify(session.get("user") is not None)

@user_services.route("/logout", methods=["GET"])
def logout():
    session.pop("user", None)
    return flask.jsonify({"success": True}) '''


@user_services.route('/registration', methods=["POST", "GET"])
def registration():
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    data = request.json
    print(data)
    
    first_name = data['first_name']
    last_name = data['last_name']
    gender = data['gender']
    birthday = data['date_of_birth']

    user_name = data['username']
    pass_word = data['password']
    user_email = data['email']

    

    query='''INSERT INTO person(first_name,last_name,gender,date_of_birth, person_type) VALUES(%s,%s,%s,%s,%s)'''
    query1='''INSERT INTO user(username,password,person_idperson,email, user_type) VALUES(%s,%s,%s,%s,%s)'''
    
    cursor.execute(query, (first_name, last_name, gender, birthday, "USER"))
    cursor.execute(query1,(user_name, pass_word, cursor.lastrowid, user_email, "User"))
    db.commit()

    return flask.jsonify({"status": "done"}), 201

