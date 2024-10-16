from config import db
from app import app
from models.orders import Orders

with app.app_context():
    Orders.query.delete()


    order1 = Orders(
        name = "Joe Shmoe",
        email = "jshmoe@email.com",
        pokemon = "Pikachu",
        color = "yellow",
        setup = "test setup",
        punchline = "test punchline"
    )

    db.session.add(order1)

    db.session.commit()