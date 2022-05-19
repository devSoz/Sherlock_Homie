from flask import Flask, jsonify, render_template, request, redirect, url_for, session

import mysql.connector
from mysql.connector import errorcode
app = Flask(__name__)  


username = 'admin_user@sherlock-homie'
pwd = 'Abitha-2002'
schema = 'new_schema'
hostname = 'sherlock-homie.mysql.database.azure.com'
portadr = 3306

@app.route('/Contact', methods=['GET', 'POST'])
def index1():
    if request.method == "GET":
        conn=mysql.connector.connect(host=hostname, 
                        port=portadr,user=username,
                        passwd=pwd,db=schema)
        
        cur = conn.cursor()
        cur.execute("select * from contact")
        data = cur.fetchall()
        cur.close()
        return jsonify(data)



@app.route('/User/Login', methods=['GET', 'POST'])
def index2():
    if request.method == "GET":
        conn=mysql.connector.connect(host=hostname, 
                        port=portadr,user=username,
                        passwd=pwd,db=schema)
        username_1 = request.args.get('username')
        password_1 = request.args.get('password')
        cur = conn.cursor()
        
        
        cur.execute("select * from user where userName=%s and pwd =%s",(username_1,password_1))
        data = cur.fetchall()
        cur.close()
        return jsonify(data)
  
  
if __name__ =="__main__":  
    app.run(debug = True)  