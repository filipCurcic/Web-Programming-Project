import datetime
import flask
# Dobavljanje klase blueprint iz flask modula.
from flask import Blueprint
from flask import session, request, redirect
from utils.db_connection import mysql
from passlib.hash import sha256_crypt

login_service = Blueprint("login_service", __name__)


@login_service.route("/login", methods=["POST"])
def login():

    db = mysql.get_db()

    cursor = mysql.get_db().cursor()


    data = request.json

    username = data["username"]
    password = data["password"]

    result = cursor.execute("SELECT * FROM user WHERE username=%s", (username))
    if result > 0:
        user = cursor.fetchone()
        user_password = user["password"]

        if sha256_crypt.verify(password, user_password):
            print("Login Succesful")
            session["user"] = user
            session["logged_in"] = True

            return flask.jsonify({"success": True})
            
        else:
            print("Login not successful")
            return flask.jsonify({"success": "wrong"})
    else:
        print("No user with that username")
        return flask.jsonify({"success": "notFound"})

    return flask.jsonify({"success": False})


@login_service.route("/loggedInUser", methods=["GET"])
def logged_in_user():
    if session.get("user") is not None:
        login_user = request.json
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM user INNER JOIN person ON user.person_idperson = person.idperson WHERE iduser=%s", (session.get("user")["iduser"]))
        user = cursor.fetchone()

        return flask.jsonify(user)
    else:
        return "Access denied!", 401


@login_service.route("/isLoggedin", methods=["GET"])
def is_loggedin():
    return flask.jsonify(session.get("user") is not None)

@login_service.route("/logout", methods=["GET"])
def logout():
    session["logged_in"] = False
    session.pop("user", None)
    return redirect("", code=302)