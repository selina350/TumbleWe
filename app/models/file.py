from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class File(db.Model):
    __tablename__ = 'files'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    applicationId = db.Column(db.Integer(), db.ForeignKey(
        add_prefix_for_prod("applications.id")), nullable=False)
    name = db.Column(db.String(60), nullable=False)
    url = db.Column(db.String())
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    application = db.relationship("Application", back_populates="files")


    def to_dict(self):
        return {
            "id": self.id,
            "applicationId": self.applicationId,
            "name": self.name,
            "url": self.url,
        }
