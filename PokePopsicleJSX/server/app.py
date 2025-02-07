
from config import app, db, api
from models.orders import Orders 


# Define a simple route
@app.route('/')
def home():
    return "Welcome to the Flask app!"

if __name__ == '__main__':
    app.run(port=5555, debug=True)