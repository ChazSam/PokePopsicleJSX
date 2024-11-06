
from config import db

class Orders(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    email = db.Column(db.String, nullable = False)
    pokemon = db.Column(db.String, nullable = False)
    color = db.Column(db.String, nullable = False)
    setup = db.Column(db.String)
    punchline = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=db.func.now())

    def __repr__(self):
        return f'<Order #{self.id}: {self.name}, {self.email}, {self.pokemon}, {self.color}, {self.setup}, {self.punchline}>'