let cookie = "";
let isRunning = false;

function iniciarRemocao() {
    cookie = document.getElementById("cookie").value;
    if (!cookie) {
        alert("Por favor, insira o cookie do Roblox!");
        return;
    }
    isRunning = true;
    removerAmigos();
    pararDeSeguir();
}

function pararRemocao() {
    isRunning = false;
    document.getElementById("status").innerText = "⏸ Processo pausado!";
}

function retomarRemocao() {
    if (cookie) {
        isRunning = true;
        removerAmigos();
        pararDeSeguir();
        document.getElementById("status").innerText = "▶️ Processo retomado!";
    } else {
        alert("Insira o cookie antes de retomar!");
    }
}

function cancelarRemocao() {
    isRunning = false;
    cookie = "";
    document.getElementById("status").innerText = "❌ Processo cancelado!";
}

async function removerAmigos() {
    if (!isRunning) return;
    
    let response = await fetch("https://friends.roblox.com/v1/my/friends", {
        method: "GET",
        headers: { "Cookie": `.ROBLOSECURITY=${cookie}` }
    });

    let data = await response.json();
    let amigos = data.data || [];

    for (let amigo of amigos) {
        if (!isRunning) break;

        await fetch(`https://friends.roblox.com/v1/users/${amigo.id}/unfriend`, {
            method: "POST",
            headers: { "Cookie": `.ROBLOSECURITY=${cookie}` }
        });

        document.getElementById("status").innerText = `🔴 Removendo: ${amigo.name}`;
        await new Promise(r => setTimeout(r, 1000));
    }

    document.getElementById("status").innerText = "✅ Remoção de amigos concluída!";
}

async function pararDeSeguir() {
    if (!isRunning) return;
    
    let response = await fetch("https://friends.roblox.com/v1/users/following?limit=100", {
        method: "GET",
        headers: { "Cookie": `.ROBLOSECURITY=${cookie}` }
    });

    let data = await response.json();
    let seguindo = data.data || [];

    for (let usuario of seguindo) {
        if (!isRunning) break;

        await fetch(`https://friends.roblox.com/v1/users/${usuario.id}/unfollow`, {
            method: "POST",
            headers: { "Cookie": `.ROBLOSECURITY=${cookie}` }
        });

        document.getElementById("status").innerText = `🔵 Parando de seguir: ${usuario.name}`;
        await new Promise(r => setTimeout(r, 1000));
    }

    document.getElementById("status").innerText = "✅ Remoção de seguidores concluída!";
      }
