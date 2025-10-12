from app.models_peewee import db, User, Music, User_music_ratings
from services.popular import recommend_popular


def run_test():
    db.connect(reuse_if_open=True)
    print("📡 Conectado ao banco!")

    results = recommend_popular(
        User=User,
        Music=Music,
        UserMusicRating=User_music_ratings,
        user_id=1,  # muda pro ID de um user real
        limit=5
    )

    print("\n🎧 Recomendações:")
    for music in results:
        print(f"🎵 {music['title']} — Likes: {music['likes']} — Data: {music['posted_at']}")

    db.close()


if __name__ == "__main__":
    run_test()
