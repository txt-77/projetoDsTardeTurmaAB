import unittest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

class TestArtistRoutes(unittest.TestCase):

    def test_get_all_artists(self):
        """Testa a rota GET /api/artists"""
        response = client.get("/api/artists/")
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json(), list)

    def test_create_artist(self):
        """Testa a rota POST /api/artists"""
        data = {"name": "New Artist"}
        response = client.post("/api/artists/", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())
        self.assertEqual(response.json()["name"], "New Artist")

    def test_get_single_artist(self):
        """Testa a rota GET /api/artists/{id}"""
        response = client.get("/api/artists/1")
        self.assertEqual(response.status_code, 200)
        self.assertIn("id", response.json())

    def test_update_artist(self):
        """Testa a rota PUT /api/artists/{id}"""
        data = {"name": "Updated Artist"}
        response = client.put("/api/artists/1", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("message", response.json())
        self.assertEqual(response.json()["message"], "Artist updated")

    def test_delete_artist(self):
        """Testa a rota DELETE /api/artists/{id}"""
        response = client.delete("/api/artists/1")
        self.assertEqual(response.status_code, 200)
        self.assertIn("message", response.json())
        self.assertEqual(response.json()["message"], "Artist deleted")

if __name__ == "__main__":
    unittest.main()
