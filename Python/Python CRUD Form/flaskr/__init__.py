from flask import Flask, request, jsonify, render_template
from psycopg2.extras import RealDictCursor
import psycopg2
import json

app = Flask(__name__, template_folder='./template', static_folder='./static')

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="html_form", 
            user="postgres",
            password="Anas@2906",
            cursor_factory=RealDictCursor
        )
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

@app.route("/get-form-data", methods=['GET'])
def get_form_data():
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"error": "Database connection failed"}), 500
            
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM users")
            result = cur.fetchall()
            print(jsonify(result))
            return jsonify(result)
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            conn.close()

@app.route("/add-form-data", methods=['POST'])
def add_form_data():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
            
        data = request.get_json()
        required_fields = ['name', 'email', 'details', 'password', 'age', 'dob', 'gender']
        
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        conn = get_db_connection()
        if not conn:
            return jsonify({"error": "Database connection failed"}), 500
            
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    details TEXT NOT NULL,
                    password VARCHAR(100) NOT NULL,
                    age INTEGER NOT NULL,
                    dob DATE NOT NULL,
                    gender VARCHAR(20) NOT NULL
                )
            """)
            
            cur.execute(
                """INSERT INTO users (name, email, details, password, age, dob, gender) 
                VALUES (%s, %s, %s, %s, %s, %s, %s)""",
                (data['name'], data['email'], data['details'], data['password'],
                 data['age'], data['dob'], data['gender'])
            )
            conn.commit()
            return jsonify({"message": "Data added successfully", "data": data})
            
    except Exception as e:
        if "duplicate" in str(e):
            return jsonify({"error": "User already exists"}), 400
        if 'conn' in locals() and conn:
            conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        if 'conn' in locals() and conn:
            conn.close()

@app.route("/delete-form-data/<int:id>", methods=['DELETE'])
def del_form_data(id):
    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({"error": "Database connection failed"}), 500
            
        with conn.cursor() as cur:
            cur.execute("DELETE FROM users WHERE id = %s", (id,))
            if cur.rowcount == 0:
                return jsonify({"error": "User not found"}), 404
            conn.commit()
            return jsonify({"message": "Data deleted successfully"})
            
    except Exception as e:
        if 'conn' in locals() and conn:
            conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        if 'conn' in locals() and conn:
            conn.close()

@app.route("/update-form-data", methods=['POST'])
def update_form_data():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400
            
        data = request.get_json()
        required_fields = ['name', 'email', 'details', 'password', 'age', 'dob', 'gender']
        
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
            
        conn = get_db_connection()
        if not conn:
            return jsonify({"error": "Database connection failed"}), 500
        
        with conn.cursor() as cur:
            cur.execute(
                """UPDATE users 
                SET name = %s, email = %s, details = %s, password = %s, age = %s, dob = %s, gender = %s 
                WHERE id = %s""", (data['name'], data['email'], data['details'], data['password'],
                                   data['age'], data['dob'], data['gender'], data['id']))
            conn.commit()
            return jsonify({"message": "Data updated successfully", "data": data})
        
    except Exception as e:
        if 'conn' in locals() and conn:
            conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        if 'conn' in locals() and conn:
            conn.close()

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/admin")
def admin():
    try:
        response = get_form_data().response
        response = json.loads(response[0].decode('utf-8'))
        print(json.dumps(response, indent=2))
        print(response)
        if isinstance(response, tuple) and len(response) == 2:
            return response
            
        users = response
        return render_template('admin.html', users=users)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/edit/<int:id>")
def edit_data(id):
    try:
        response = get_form_data().response
        response = json.loads(response[0].decode('utf-8'))

        user = next((user for user in response if user['id'] == id), None)
        date_parts = user['dob'][5:16].split()
        month_map = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
                    'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'}
        user['dob'] = f"{date_parts[2]}-{month_map[date_parts[1]]}-{date_parts[0]}"

        if user is None:
            return jsonify({"error": "User not found"}), 404
            
        return render_template("edit.html", user=user)
    except Exception as e:
        return jsonify({"error": str(e)}), 500