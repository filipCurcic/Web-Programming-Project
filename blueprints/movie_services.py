import datetime
import flask
# Dobavljanje klase blueprint iz flask modula.
from flask import Blueprint
from utils.db_connection import mysql

movie_services = Blueprint("movie_services", __name__)

@movie_services.route("/movies", methods=["GET"])
def movies():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM movie ")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@movie_services.route("/movies/<int:idmovie>", methods=["GET"])
def movie(idmovie):

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM movie WHERE movie.idmovie=%s", (idmovie, ))
    row = cursor.fetchone()


    return flask.jsonify(row)

@movie_services.route("/ratings", methods=["GET"])
def ratings():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT movie.vote_sum, movie.vote_amt, movie.title, movie.poster_path FROM movie ORDER BY movie.avg_vote DESC")
    rows = cursor.fetchall()

    return flask.jsonify(rows)


@movie_services.route("/popularity", methods=["GET"])
def popular():

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT movie.vote_count, movie.title, movie.poster_path, movie.avg_vote FROM movie ORDER BY movie.vote_count DESC")
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@movie_services.route("/moviesGenres/<int:idmovie>", methods=["GET"])
def moviesGenres(idmovie):

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * from movie INNER JOIN movie_genre ON movie.idmovie = movie_genre.movie_idmovie INNER JOIN genre ON movie_genre.genre_idgenre = genre.idgenre WHERE movie.idmovie=%s ", (idmovie, ))
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@movie_services.route("/moviesByGenre/<int:idgenre>", methods=["GET"])
def moviesByGenre(idgenre):

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * from movie_genre INNER JOIN movie ON movie_genre.movie_idmovie = movie.idmovie INNER JOIN genre ON movie_genre.genre_idgenre = genre.idgenre WHERE genre.idgenre=%s ", (idgenre, ))
    rows = cursor.fetchall()

    return flask.jsonify(rows)

@movie_services.route("/moviesByDirector/<int:idperson>", methods=["GET"])
def moviesByDirector(idperson):

    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * from movie_person INNER JOIN movie ON movie_person.movie_idmovie = movie.idmovie INNER JOIN person ON movie_person.person_idperson = person.idperson WHERE person.idperson=%s ", (idperson, ))
    rows = cursor.fetchall()

    return flask.jsonify(rows)
