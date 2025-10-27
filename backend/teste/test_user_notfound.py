from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_delete_nonexistent_user():
    response = client.delete("/api/users/999")