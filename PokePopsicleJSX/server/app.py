from flask import Flask, request, session
from config import app, db, api
from models.orders import Orders 
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError


class OrdersResource(Resource):
    def get(self):
        get_orders = [order.to_dict() for order in Orders.query.all()]
        return get_orders, 200
    
class AddOrder(Resource):        
    def post(self):
        new_order = Orders(
            name = request.get_json().get("name"),
            email = request.get_json().get("email"),
            pokemon = request.get_json().get("pokemon"),
            color = request.get_json().get("color"),
            setup = request.get_json().get("setup"),
            punchline = request.get_json().get("punchline")
        )

        try:
           
            db.session.add(new_order)
            db.session.commit()

            return new_order.to_dict(), 201
        
        except IntegrityError as exc:
            return {"message" : exc}, 422
        

api.add_resource(OrdersResource, "/orders", endpoint="orders")
api.add_resource(AddOrder, "/addOrder", endpoint="addOrder")

@app.route('/')
def home():
    return "Flask app!"

if __name__ == '__main__':
    app.run(port=5555, debug=True)