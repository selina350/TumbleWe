from app.models import db, Application, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_applications():
    appli1 = Application(
        ownerId=1, name='appli1' )
    appli2 = Application(
        ownerId=1, name='appli2')
    appli3 = Application(
        ownerId=2, name='appli3')

    db.session.add(appli1)
    db.session.add(appli2)
    db.session.add(appli3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_applications():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.applications RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM applications"))

    db.session.commit()
