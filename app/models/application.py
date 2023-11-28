from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Application(db.Model):
    __tablename__ = 'applications'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    ownerId = db.Column(db.Integer(), db.ForeignKey(
        add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(50), nullable=False, unique=True)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    owner = db.relationship("User", back_populates="applications")
    steps = db.relationship("Step", back_populates="application", cascade="all, delete-orphan")
    files = db.relationship("File", back_populates="application", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "ownerId": self.ownerId,
            "name": self.name,
            "createdAt": self.createdAt
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
