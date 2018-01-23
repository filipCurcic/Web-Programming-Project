import datetime
import flask
# Dobavljanje klase blueprint iz flask modula.
from flask import Blueprint
from flask import session
from utils.db_connection import mysql

login_service = Blueprint("login_service", __name__)


@login_service.route("/login", methods=["POST"])
def login():
    login_user = request.json
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM user WHERE username=%s AND password=%s", (login_user["username"], login_user["password"]))
    user = cursor.fetchone()

    if user is not None:
        session["user"] = user
        return flask.jsonify({"success": True})


    return flask.jsonify({"success": False})

@login_service.route("/isLoggedin", methods=["GET"])
def is_loggedin():
    return flask.jsonify(session.get("user") is not None)

@login_service.route("/logout", methods=["GET"])
def logout():
    session.pop("user", None)
    return flask.jsonify({"success": True})