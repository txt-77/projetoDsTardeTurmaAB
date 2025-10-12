from peewee import *
import datetime

db = PostgresqlDatabase(
    "postgres",
    user="postgres",
    password="postgres",
    host="localhost",
    port=2222
)

class BaseModel(Model):
    class Meta:
        database = db

class User(BaseModel):
    name = CharField()
    email = CharField(unique=True)
    password = CharField()
    bio = CharField(null=True)

    class Meta:
        table_name = "user"


class Artist(BaseModel):
    name = CharField()
    email = CharField(unique=True)
    password = CharField()
    bio = CharField(null=True)

    class Meta:
        table_name = "artist"


class Music(BaseModel):
    title = CharField()
    description = CharField(null=True)
    duration = CharField(null=True)
    link = CharField(null=True)
    lyric = TextField(null=True)
    posted = DateField()

    class Meta:
        table_name = "music"

class User_music_ratings(BaseModel):
    id: int
    user_id: int
    music_id: int
    rating: int
    created_at: datetime
    genre: str