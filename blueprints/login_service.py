import datetime
import flask
# Dobavljanje klase blueprint iz flask modula.
from flask import Blueprint
from flask import session, request
from utils.db_connection import mysql
from passlib.hash import sha256_crypt

login_service = Blueprint("login_service", __name__)


@login_service.route("/login", methods=["GET"])
def login():

    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    data = request.form
    username = data["username"]
    password = data["password"]

    result = cursor.execute("SELECT * FROM user WHERE username=%s", (username))
    if result > 0:
        user = cursor.fetchone()
        user_password = user["password"]

        if sha256_crypt.verify(password, user_password):
            return flask.jsonify({"success": True})
            print("Login Succesful")
        else:
            print("Login not successful")
    else:
        print("no user with that username")

    return flask.jsonify({"success": False})

@login_service.route("/isLoggedin", methods=["GET"])
def is_loggedin():
    return flask.jsonify(session.get("user") is not None)

@login_service.route("/logout", methods=["GET"])
def logout():
    session.pop("user", None)
    return flask.jsonify({"success": True})