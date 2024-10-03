from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Set up the database URL (SQLite in this case)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'

# Initialize SQLAlchemy with the Flask app
db = SQLAlchemy(app)

# Define a simple route
@app.route('/')
def home():
    return "Welcome to the Flask app!"

if __name__ == '__main__':
    app.run(debug=True)