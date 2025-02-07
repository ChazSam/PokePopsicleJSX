from flask import Flask, request, session
from config import app, db, api
from models.orders import Orders 
from flask_restful import Resource


class OrdersResource(Resource):
    def get(self):
        getOrders = [order.to_dict() for order in Orders.query.all()]
        return getOrders, 200
        
    def post(self):
        pass

api.add_resource(OrdersResource, "/orders", endpoint="orders")

@app.route('/')
def home():
    return "Welcome to the Flask app!"

if __name__ == '__main__':
    app.run(port=5555, debug=True)