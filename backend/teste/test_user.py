def test_create_user():
    user = {
        "email": "maria@gmail.com",
        "username": "mariazinha",
        "name": "Maria Silva",
        "password_hash": "senha123"
    }
    response = client.post("/api/users/", json=user)

    if response.status_code != 200:
        print(f" Erro {response.status_code} ao criar usuário.")
        print("Resposta completa:", response.json())