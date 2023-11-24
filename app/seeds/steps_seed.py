from app.models import db, Step, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_steps():
    step1 = Step(
        applicationId=1, name='step1', url="step",type="input", selector="selector")
    step2 = Step(
        applicationId=1, name='step2',url="step", type="buttonClick",selector="selector")
    step3 = Step(
        applicationId=2, name='step3',url="step",type="buttonClick", selector="selector")

    db.session.add(step1)
    db.session.add(step2)
    db.session.add(step3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_steps():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.steps RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM steps"))

    db.session.commit()
