from app.models import db, File, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_files():
    file1 = File(
        applicationId=1, name='file1', url="file")
    file2 = File(
        applicationId=1, name='file2',url="file")
    file3 = File(
        applicationId=2, name='file3',url="file")

    db.session.add(file1)
    db.session.add(file2)
    db.session.add(file3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_files():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.files RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM files"))

    db.session.commit()
