let cookie = "";

function getAccountInfo() {
    cookie = document.getElementById("cookie").value;
    if (!cookie) {
        alert("Por favor, cole o cookie.");
        return;
    }

    // Exemplo de URL da API do Roblox para obter informações do usuário
    const url = `https://users.roblox.com/v1/users/authenticated`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Cookie': `.ROBLOSECURITY=${cookie}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("nickname").innerText = data.name;
        document.getElementById("displayname").innerText = data.displayName;
        document.getElementById("profile-pic").src = data.thumbnailUrl;
        document.getElementById("status").innerText = "Conectado";
        alert("Conta Verificada!");
    })
    .catch(err => {
        alert("Erro ao verificar conta. Verifique seu cookie.");
    });
}

function removeFriends() {
    document.getElementById("output").innerText = "Removendo amigos...";

    // Lógica para remover amigos via API
    fetch('https://friends.roblox.com/v1/my/friends', {
        method: 'GET',
        headers: {
            'Cookie': `.ROBLOSECURITY=${cookie}`
        }
    })
    .then(response => response.json())
    .then(data => {
        data.data.forEach(friend => {
            // API para remover amigos
            fetch(`https://friends.roblox.com/v1/friends/${friend.id}`, {
                method: 'DELETE',
                headers: {
                    'Cookie': `.ROBLOSECURITY=${cookie}`
                }
            })
            .then(response => response.json())
            .then(() => {
                document.getElementById("output").innerText += `\nAmigo removido: ${friend.name}`;
            })
            .catch(err => console.error(err));
        });
    })
    .catch(err => {
        console.error(err);
        document.getElementById("output").innerText = "Erro ao remover amigos.";
    });
}

function unfollow() {
    document.getElementById("output").innerText = "Parando de seguir...";

    // Lógica para parar de seguir
    fetch('https://api.roblox.com/users/1/following', {
        method: 'GET',
        headers: {
            'Cookie': `.ROBLOSECURITY=${cookie}`
        }
    })
    .then(response => response.json())
    .then(data => {
        data.data.forEach(following => {
            fetch(`https://api.roblox.com/users/1/following/${following.id}`, {
                method: 'DELETE',
                headers: {
                    'Cookie': `.ROBLOSECURITY=${cookie}`
                }
            })
            .then(() => {
                document.getElementById("output").innerText += `\nParou de seguir: ${following.name}`;
            })
            .catch(err => console.error(err));
        });
    })
    .catch(err => {
        console.error(err);
        document.getElementById("output").innerText = "Erro ao parar de seguir.";
    });
}

function cancelAction() {
    document.getElementById("output").innerText = "Ação cancelada.";
}
