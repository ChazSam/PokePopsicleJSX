
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from sqlalchemy import MetaData

app = Flask(__name__)

# Set up the database URL
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# Define naming convention for migrations
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

# Initialize SQLAlchemy **before** initializing Migrate
db = SQLAlchemy(metadata=metadata)
db.init_app(app)  # Call init_app() before Migrate

# Initialize Migrate after db.init_app()
migrate = Migrate(app, db)

# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app)