import unittest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_artists():
    response = client.get("/api/artists/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_artist():
    new_artist = {"name": "Anitta"}
    response = client.post("/api/artists/", json=new_artist)
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["name"] == "Anitta"

def test_get_single_artist(self):
    response = client.get("/artist/1")
    self.assertIn(response.status_code, [200, 404])  

def test_update_artist(self):
    data = {"name": "Updated Artist"}
    response = client.put("/artist/1", json=data)
    self.assertIn(response.status_code, [200, 404])

def test_delete_artist(self):
    response = client.delete("/artist/1")
    self.assertIn(response.status_code, [200, 404])