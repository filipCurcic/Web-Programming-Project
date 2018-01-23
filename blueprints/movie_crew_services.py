import datetime
import flask
# Dobavljanje klase blueprint iz flask modula.
from flask import Blueprint
from utils.db_connection import mysql

movie_crew_services = Blueprint("movie_crew_services", __name__)


@movie_crew_services.route("/moviesActors/<int:idmovie>", methods=["GET"])
def moviesActors(idmovie):

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * from movie INNER JOIN movie_person ON movie.idmovie = movie_person.movie_idmovie INNER JOIN person ON movie_person.person_idperson = person.idperson WHERE movie.idmovie=%s ", (idmovie, ))
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@movie_crew_services.route("/actors", methods=["GET"])
def getActors():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM person WHERE person.person_type='ACTOR'")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@movie_crew_services.route("/directors", methods=["GET"])
def getDirectors():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM person WHERE person.person_type='DIRECTOR'")
    rows = cursor.fetchall()

    return flask.jsonify(rows)