import datetime
import flask
# Dobavljanje klase blueprint iz flask modula.
from flask import Blueprint
from utils.db_connection import mysql
from flask import request

user_services = Blueprint("user_services", __name__)



@user_services.route("/login", methods=["POST"])
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
    return flask.jsonify({"success": True})


@user_services.route('/registration', methods=["POST"])
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

