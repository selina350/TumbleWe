from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class MockApi(db.Model):
    __tablename__ = 'mockApis'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer(), primary_key=True)
    applicationId = db.Column(db.Integer(), db.ForeignKey(
        add_prefix_for_prod("applications.id")), nullable=False)
    method = db.Column(db.String(60), nullable=False)
    path = db.Column(db.String())
    responseType = db.Column(db.String(),nullable=False)
    responseBody = db.Column(db.String())
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)
    updatedAt = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    application = db.relationship("Application", back_populates="mockApis")


    def to_dict(self):
        return {
            "id": self.id,
            "applicationId": self.applicationId,
            "method": self.method,
            "path": self.path,
            "responseType": self.responseType,
            "responseBody":self.responseBody
        }
