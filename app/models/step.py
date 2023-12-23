from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Step(db.Model):
    __tablename__ = 'steps'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    applicationId = db.Column(db.Integer(), db.ForeignKey(
        add_prefix_for_prod("applications.id")), nullable=False)
    name = db.Column(db.String(60), nullable=False)
    url = db.Column(db.String())
    innerHTML = db.Column(db.String())
    type = db.Column(db.String(50),nullable=False)
    order = db.Column(db.Integer())
    selector = db.Column(db.String(), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    application = db.relationship("Application", back_populates="steps")


    def to_dict(self):
        return {
            "id": self.id,
            "applicationId": self.applicationId,
            "name": self.name,
            "selector": self.selector,
            "url": self.url,
            "type":self.type,
            "innerHTML": self.innerHTML,
            "order":self.order
        }
