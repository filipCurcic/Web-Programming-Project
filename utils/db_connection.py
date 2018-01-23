# Ovaj modul sluzi kako bi se izbegla ciklicna zavisnost
# izmedju aplikacije i blueprint-ova.

import pymysql
from flaskext.mysql import MySQL

# Kako torke zelimo da dobavljamo kao recnike gde je kljuc ime kolone
# a vrednost vrednost kolone neophodno je da cursor class postavimo na
# DictCursor.
mysql = MySQL(cursorclass=pymysql.cursors.DictCursor)