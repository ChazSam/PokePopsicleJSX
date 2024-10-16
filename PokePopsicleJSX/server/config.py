from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from sqlalchemy import MetaData

app = Flask(__name__)

# Set up the database URL (SQLite in this case)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'

# Initialize SQLAlchemy with the Flask app
# db = SQLAlchemy(app)
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)

migrate = Migrate(app, db)
db.init_app(app)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)

