from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Application(db.Model):
    __tablename__ = 'applications'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    ownerId = db.Column(db.Integer(), db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    # address = db.Column(db.String(255), nullable=False)
    # city = db.Column(db.String(255), nullable=False)
    # state = db.Column(db.String(255), nullable=False)
    # lat = db.Column(db.Float())
    # lng = db.Column(db.Float())
    name = db.Column(db.String(50), nullable=False)
    # type = db.Column(db.String(60), nullable=False)
    # image = db.Column(db.String(), nullable=False)
    # starRating = db.Column(db.Float())
    # numReviews = db.Column(db.Integer())
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = db.relationship("User", back_populates="applications")
    steps = db.relationship("Step", back_populates="application", cascade="all, delete-orphan")
    files = db.relationship("File", back_populates="application", cascade="all, delete-orphan")
    # menuItems = db.relationship("MenuItem", back_populates="restaurant", cascade="all, delete-orphan")

    # reviews = db.relationship("Review", back_populates="restaurant", cascade="all, delete-orphan")

    # shoppingCart = db.relationship("ShoppingCart", back_populates="restaurant", cascade="all, delete-orphan")

    # orders = db.relationship("Order", back_populates="restaurant")

    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.ownerId,
            # "address": self.address,
            # "city": self.city,
            # "state": self.state,
            # "lat": self.lat,
            # "lng": self.lng,
            "name": self.name,
            # "type": self.type,
            # "image": self.image,
            # "starRating": self.starRating,
            # "numReviews": self.numReviews,
        }

    def get_applications(self):
        return {
            'applications': [application.to_dict() for application in self.applications]
        }

    def get_files(self):
        return {
            'files': [file.to_dict() for file in self.files]
        }

    def get_steps(self):
        return {
            'files': [step.to_dict() for step in self.steps]
        }

    # def get_reviews(self):
    #     return {
    #         'reviews': [review.to_dict() for review in self.reviews]
    #     }
