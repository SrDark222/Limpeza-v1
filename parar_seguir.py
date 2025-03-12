import requests
import time

def get_status():
    with open("status.txt", "r") as file:
        return file.read().strip()

def parar_de_seguir(cookie):
    headers = {
        "Cookie": f".ROBLOSECURITY={cookie}",
        "Content-Type": "application/json"
    }
    
    url = "https://friends.roblox.com/v1/users/following?limit=100"
    response = requests.get(url, headers=headers)
    seguidores = response.json().get("data", [])

    for seguidor in seguidores:
        if get_status() == "paused":
            time.sleep(2)
            continue
        if get_status() == "stopped":
            break

        user_id = seguidor["id"]
        requests.post(f"https://friends.roblox.com/v1/users/{user_id}/unfollow", headers=headers)
        print(f"Parou de seguir: {seguidor['name']}")
        time.sleep(1)

if __name__ == "__main__":
    import sys
    cookie = sys.argv[1]
    parar_de_seguir(cookie)
