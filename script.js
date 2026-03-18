let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarLista(lista) {
  const baixa = document.getElementById("baixa");
  const media = document.getElementById("media");
  const alta = document.getElementById("alta");
  const contador = document.getElementById("contador");

  baixa.innerHTML = "";
  media.innerHTML = "";
  alta.innerHTML = "";

  if (lista.length === 0) {
    contador.innerText = "Nenhuma tarefa cadastrada";
    return;
  } else {
    contador.innerText = `Total de tarefas: ${lista.length}`;
  }

  lista.forEach(t => {
    const div = document.createElement("div");
    div.classList.add("tarefa");

    let corPrioridade = "";

    if (t.prioridade === "Alta") {
      corPrioridade = "red";
    } else if (t.prioridade === "Média") {
      corPrioridade = "orange";
    } else {
      corPrioridade = "green";
    }

    div.innerHTML = `
      <h3>${t.titulo}</h3>
      <p>${t.descricao}</p>
      <p><strong>Prioridade:</strong> <span style="color:${corPrioridade}">${t.prioridade}</span></p>
      <p><strong>Data:</strong> ${t.data}</p>
      <p><strong>Status:</strong> ${t.status}</p>

      <button onclick="concluir(${t.id})">Concluir</button>
      <button onclick="editar(${t.id})">Editar</button>
      <button onclick="excluir(${t.id})">Excluir</button>
    `;

    if (t.status === "Concluída") {
      div.style.backgroundColor = "#d4edda";
    }

    if (t.prioridade === "Baixa") {
      baixa.appendChild(div);
    } else if (t.prioridade === "Média") {
      media.appendChild(div);
    } else {
      alta.appendChild(div);
    }
  });
}

function renderizar() {
  renderizarLista(tarefas);
}

const form = document.getElementById("form-tarefa");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const prioridade = document.getElementById("prioridade").value;

  if (!titulo || !descricao) {
    alert("Preencha todos os campos!");
    return;
  }

  const tarefa = {
    id: Date.now(),
    titulo,
    descricao,
    prioridade,
    data: new Date().toLocaleDateString(),
    status: "Pendente"
  };

  tarefas.push(tarefa);
  salvar();
  renderizar();
  form.reset();
});

function concluir(id) {
  const tarefa = tarefas.find(t => t.id === id);
  tarefa.status = "Concluída";
  salvar();
  renderizar();
}

function excluir(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  salvar();
  renderizar();
}

function editar(id) {
  const tarefa = tarefas.find(t => t.id === id);

  const novoTitulo = prompt("Novo título:", tarefa.titulo);
  const novaDescricao = prompt("Nova descrição:", tarefa.descricao);

  if (novoTitulo && novaDescricao) {
    tarefa.titulo = novoTitulo;
    tarefa.descricao = novaDescricao;
    salvar();
    renderizar();
  }
}

document.getElementById("busca").addEventListener("input", (e) => {
  const valor = e.target.value.toLowerCase();

  const filtradas = tarefas.filter(t =>
    t.titulo.toLowerCase().includes(valor)
  );

  renderizarLista(filtradas);
});

renderizar();