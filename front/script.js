// Função responsável por buscar todos os pedidos na api e exibir na tela
function listarPedidos() {
    // Busca o elemento HTML (lista), onde a listagem de pedidos será exibida
    const lista = document.getElementById("lista");
    // Conexão suave entre a interface e a conexão da API
    lista.innerHTML = "Carregando pedidos...";
    // Faz uma requisição GET para a API com a url publicada
    fetch("https://node-js-api-publish-z2k9.onrender.com/pedidos")
    // Convertendo a resposta da API para JSON
    .then(res => res.json())
    // Trabalhando resultado da API
    .then(resultado => {
        // Limpando a lista para preencher com os pedidos
        lista.innerHTML = "";
        // Percorrendo o array de pedidos recebido da API
        resultado.dados.forEach(pedido => {
            // Cria um item de linha para cada pedido
            const item = document.createElement("li");
            // Define como o texto será exibido na tela
            item.textContent = `${pedido.id} - ${pedido.cliente} | ${pedido.produto} | ${pedido.status}`;
            // Adiciona o item dentro da lista
            lista.appendChild(item);

        });
    })
    // Caso o front não consiga acessar a API para trazer os dados
    .catch(() => {
        lista.innerHTML = "Erro ao carregar os pedidos"
    });

}

// Função responsável pela criação de novos pedidos
function cadastrarPedido() {
    // Pega os valores digitados nos inputs do HTML e depois limpar
    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value;

    fetch("https://node-js-api-publish-z2k9.onrender.com/pedidos", {
        method: "POST",
        headers: {'Content-Type' : 'application/JSON'},
        // Body
        body: JSON.stringify({
            id: Date.now(),
            cliente: cliente,
            produto: produto,
            status: 'pendente'
        })
    })

    //Converter a resposta da API para JSON
    .then(res => res.json())
    .then(() => {
        document.getElementById("cliente").value = "";
        document.getElementById("produto").value = "";
        // Atualizando a lista de pedidos
        listarPedidos();
    })

    // Alerta para caso não seja possível realizar o cadastro do pediddo
    .catch(() => {
        alert("Erro ao cadastrar pedido");
    })

}

// Função responsável por atualizar o status de um pedido
function atualizarPedido() {
    // Pega o ID informando e o força ser um número
    const id = Number(document.getElementById("idAtualizar").value);
    // Pega o novo status do pedido (digitado no input5)
    const status = document.getElementById("statusAtualizar").value;

    fetch("https://node-js-api-publish-z2k9.onrender.com/pedidos", {
        method: "PUT",
        headers: {'Content-Type' : 'application/JSON'},
        body: JSON.stringify({
            id: id,
            status: status
        })
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById("idAtualizar").value = '';
        document.getElementById("statusAtualizar").value = '';
        listarPedidos();
    })
    .catch(() => {
        alert("Erro ao editar o Pedido")
    })
}

// Função responsável por remover um pedido

function removerPedido() {
    // Pega o ID informando e o força ser um número
    const id = Number(document.getElementById("idRemover").value);

    fetch("https://node-js-api-publish-z2k9.onrender.com/pedidos", {
        method: "DELETE",
        headers: {'Content-Type': 'application/JSON'},
        // Envia apenas o ID do pedido a ser removido
        body: JSON.stringify({
            id: id
        })
    })
    .then(res => res.json())
    // Limpa o campo de ID e atualiza a lista de pedidos
    .then(() => {
        document.getElementById("idRemover").value = "";
        listarPedidos();
    })
    .catch(() => {
        alert("Erro ao cancelar o pedido")
    });
}
// Chama função assim que a página carregar
listarPedidos()