import datetime
import pymysql
import flask
from flask import Flask
from flaskext.mysql import MySQL
from flask import request


app = Flask(__name__, static_url_path="")

mysql = MySQL(cursorclass=pymysql.cursors.DictCursor)

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
    
    
app.run("0.0.0.0", 80, threaded=True)