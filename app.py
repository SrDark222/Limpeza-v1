from flask import Flask, request, render_template
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/remover', methods=['POST'])
def remover():
    data = request.json
    cookie = data.get("cookie")
    if not cookie:
        return "Erro: Nenhum cookie fornecido.", 400

    with open("status.txt", "w") as file:
        file.write("running")

    subprocess.Popen(["python", "remover_amigos.py", cookie])
    subprocess.Popen(["python", "parar_seguir.py", cookie])
    
    return "Processo iniciado! Aguarde..."

@app.route('/parar', methods=['POST'])
def parar():
    with open("status.txt", "w") as file:
        file.write("paused")
    return "Processo pausado!"

@app.route('/retomar', methods=['POST'])
def retomar():
    with open("status.txt", "w") as file:
        file.write("running")
    return "Processo retomado!"

@app.route('/cancelar', methods=['POST'])
def cancelar():
    with open("status.txt", "w") as file:
        file.write("stopped")
    return "Processo cancelado!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
