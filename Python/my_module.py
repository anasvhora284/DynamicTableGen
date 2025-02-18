# my_module.py
import json
def greet(name):
    return f"Hello, {name}! Welcome to Python Modules."

def add(a, b):
    return a + b

PI = 3.14159  # Constant variable
x = [b'[\n  {\n    "age": 18,\n    "details": "something Something",\n    "dob": "Tue, 18 Feb 2025 00:00:00 GMT",\n    "email": "aetomtomy1@gmail.com",\n    "gender": "male",\n    "id": 4,\n    "name": "aetom tomy",\n    "password": "Anas@123"\n  },\n  {\n    "age": 18,\n    "details": "something Something",\n    "dob": "Tue, 18 Feb 2025 00:00:00 GMT",\n    "email": "aetomtomy@gmail.com",\n    "gender": "male",\n    "id": 5,\n    "name": "aetom tomy",\n    "password": "a@123"\n  }\n]\n']

# Decode bytes to string and parse JSON
x = json.loads(x[0].decode('utf-8'))

# Now x is a proper Python list of dictionaries
print(json.dumps(x, indent=2))