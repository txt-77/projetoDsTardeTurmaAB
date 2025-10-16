import unittest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

class TestArtistRoutes(unittest.TestCase):

    def test_get_all_artists(self):
        response = client.get("/artist/")
        self.assertEqual(response.status_code, 200)

    def test_create_artist(self):
        data = {"name": "New Artist"}
        response = client.post("/artist/", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())

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