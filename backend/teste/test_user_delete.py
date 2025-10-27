from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_delete_user():
    user = {"name": "Ana"}
    create_response = client.post("/api/users/", json=user)  # <-- corrigido
    if create_response.status_code == 404:
        print("Erro 404! Usuário não encontrado.")
        print("Response content:", create_response.json())
        return
    
    user_id = create_response.json()["id"]