import datetime
import random, string
import pymysql
import flask
from flask import Flask
from flaskext.mysql import MySQL
from flask import request
from flask import session
from flask import redirect, url_for
from werkzeug.utils import secure_filename

from utils.db_connection import mysql

from blueprints.movie_crew_services import movie_crew_services
from blueprints.movie_services import movie_services
from blueprints.user_services import user_services
from blueprints.admin_services import admin_services
from blueprints.login_service import login_service

app = Flask(__name__, static_url_path="")



app.secret_key = "SECRET_KEY"
UPLOAD_FOLDER = '/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER




app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "filipcurcic1997"
app.config["MYSQL_DATABASE_DB"] = "web_programming_new_db"
app.config["MYSQL_DATABASE_HOST"] = "localhost"

mysql.init_app(app)

app.register_blueprint(movie_services)
app.register_blueprint(movie_crew_services)
app.register_blueprint(user_services)
app.register_blueprint(admin_services)
app.register_blueprint(login_service)




@app.route("/")
@app.route("/index")
@app.route("/index.html")
def home():
    return app.send_static_file("index.html")

'''@app.route("/loggedIn", methods=["GET"])
def getLoggedIn():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM authentication INNER JOIN user ON authentication.user_iduser = user.iduser")
    rows = cursor.fetchall()

    return flask.jsonify(rows)


@app.route('/loginAuth', methods=["POST"])
def loginAuth():
    login_user = request.json
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM user WHERE username=%s AND password=%s", (login_user["username"], login_user["password"]))
    user = cursor.fetchone()
    cursor.execute("SELECT token FROM authentication WHERE user_iduser=%s", (user["iduser"]))
    tempdb = cursor.fetchone()'''




    


app.run("0.0.0.0", 80, threaded=True)