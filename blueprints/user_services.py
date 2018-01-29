import datetime
import flask
# Dobavljanje klase blueprint iz flask modula.
from flask import Blueprint
from utils.db_connection import mysql
from flask import request, session, redirect, flash, render_template

user_services = Blueprint("user_services", __name__)


@user_services.route('/registration', methods=["POST", "GET"])
def registration():
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    data = request.json
    
    first_name = data['first_name']
    last_name = data['last_name']
    gender = data['gender']
    birthday = data['date_of_birth']

    user_name = data['username']
    pass_word = sha256_crypt.encrypt(str(data['password']))
    user_email = data['email']

     

    

    query='''INSERT INTO person(first_name,last_name,gender,date_of_birth, person_type) VALUES(%s,%s,%s,%s,%s)'''
    query1='''INSERT INTO user(username,password,person_idperson,email, user_type) VALUES(%s,%s,%s,%s,%s)'''
    
    cursor.execute(query, (first_name, last_name, gender, birthday, "USER"))
    cursor.execute(query1,(user_name, pass_word, cursor.lastrowid, user_email, "User"))
    db.commit()
    return ''

