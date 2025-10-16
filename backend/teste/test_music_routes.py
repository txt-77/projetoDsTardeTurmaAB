from fastapi.testclient import TestClient
from app.main import app  # importa a aplicação FastAPI

client = TestClient(app)

def test_get_all_musics():
    response = client.get("/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)