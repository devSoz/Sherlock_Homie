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
        
        query = "select category,AppDisplayName, Address1, Address2, Pincode, Location, GLocation, u.*  from user u,location l , category c where l.category_id=c.category_id and u.location_id=l.location_id and u.userName=%s and u.pwd =%s"
        cur.execute(query ,(username_1,password_1))
        data = cur.fetchall()
        #mysql.connection.commit()
        cur.close()
        return jsonify(data)

@app.route('/Suspects', methods=['GET'])
def index3():
    if request.method == "GET":
        conn=mysql.connector.connect(host=hostname, 
                        port=portadr,user=username,
                        passwd=pwd,db=schema)
        #username_1 = request.args.get('username')
        #password_1 = request.args.get('password')
        cur = conn.cursor()
        
        query = "select COUNT(p.Suspect_ID),l.AppDisplayName, l.location, l.GLocation from suspect p, location l where p.location_id=l.location_id "
        cur.execute(query )
        data = cur.fetchall()
        #mysql.connection.commit()
        cur.close()
        return jsonify(data)
    
@app.route('/AddSuspect', methods=['POST'])
def index6():
    if request.method == "POST":
        try:
            conn=mysql.connector.connect(host=hostname, 
                            port=portadr,user=username,
                            passwd=pwd,db=schema)
    
            request_data = request.get_json()
            
            Location_ID = request_data['Location_ID']
            Person_ID = request_data['Person_ID']
            FullName = request_data['FullName']
            Alias = request_data['Alias']
            ProfileUrl = request_data['ProfileUrl']
            DateReported = request_data['DateReported']
            CrimeIndex = request_data['CrimeIndex']
            Confidence = request_data['Confidence']
            ReportedBy = request_data['ReportedBy']
            
            cur = conn.cursor()
            print("location")
            query = "INSERT INTO suspect (Location_ID, Person_ID, FullName,Alias,ProfileUrl,DateReported,CrimeIndex,Confidence,ReportedBy) values("
            query+= "%s, %s, %s, %s, %s, %s, %s, %s, %s )"
    
            cur.execute(query ,(Location_ID,Person_ID,FullName, Alias,ProfileUrl,DateReported,CrimeIndex,Confidence,ReportedBy))
            conn.commit()
            #data = cur.fetchall()
            cur.close()
            return "Sucessful"
        except:
            print("An error has occured")
    
    
            #mysql.connection.commit()
            cur.close()
            #return redirect('/')
            return jsonify(data)
    
@app.route('/SuspectsAll', methods=['GET'])
def index5():
    if request.method == "GET":
        conn=mysql.connector.connect(host=hostname, 
                        port=portadr,user=username,
                        passwd=pwd,db=schema)
        #username_1 = request.args.get('username')
        #password_1 = request.args.get('password')
        cur = conn.cursor()
        
        query = "select p.*,l.AppDisplayName, l.location, l.GLocation from suspect p, location l where p.location_id=l.location_id  order by suspect_id desc"
        cur.execute(query )
        data = cur.fetchall()
        #mysql.connection.commit()
        cur.close()
        return jsonify(data)    
    
@app.route('/Suspects/Location', methods=['GET'])
def index4():
    if request.method == "GET":
        conn=mysql.connector.connect(host=hostname, 
                        port=portadr,user=username,
                        passwd=pwd,db=schema)
        locationid = "1001" #request.args.get('location_ID')
        #password_1 = request.args.get('password')
        cur = conn.cursor()
        
        query = "select * from suspect p, location l where p.location_id=l.location_id and l.location_id = %s %s order by suspect_id desc"
        cur.execute(query,(locationid,""))
        data = cur.fetchall()
        #mysql.connection.commit()
        cur.close()
        return jsonify(data)    
  
  
if __name__ =="__main__":  
    app.run(debug = True)  