import requests
import time

def get_status():
    with open("status.txt", "r") as file:
        return file.read().strip()

def remover_amigos(cookie):
    headers = {
        "Cookie": f".ROBLOSECURITY={cookie}",
        "Content-Type": "application/json"
    }
    
    url = "https://friends.roblox.com/v1/my/friends"
    response = requests.get(url, headers=headers)
    amigos = response.json().get("data", [])
    
    for amigo in amigos:
        if get_status() == "paused":
            time.sleep(2)
            continue
        if get_status() == "stopped":
            break
        
        user_id = amigo["id"]
        requests.post(f"https://friends.roblox.com/v1/users/{user_id}/unfriend", headers=headers)
        print(f"Amizade removida com: {amigo['name']}")
        time.sleep(1)  

if __name__ == "__main__":
    import sys
    cookie = sys.argv[1]
    remover_amigos(cookie)
