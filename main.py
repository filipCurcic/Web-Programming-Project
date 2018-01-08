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


app.run("0.0.0.0", 80, threaded=True)