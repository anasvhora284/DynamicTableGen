from flask import Flask, request, jsonify, render_template

app = Flask(__name__, template_folder='./template', static_folder='./static')

@app.route("/", methods=['GET', 'POST'])
def home():
    return render_template('index.html')