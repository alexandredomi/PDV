document.addEventListener('DOMContentLoaded', carregarVendas);
document.getElementById('adicionarVenda').addEventListener('click', adicionarVenda);
document.getElementById('limparCaixa').addEventListener('click', limparCaixa);
document.getElementById('fecharCaixa').addEventListener('click', fecharCaixa);
document.getElementById('enviarWhatsapp').addEventListener('click', enviarWhatsapp);

document.addEventListener('DOMContentLoaded', carregarProdutos);
document.getElementById('adicionarProduto').addEventListener('click', adicionarProduto);
document.getElementById('pesquisarProduto').addEventListener('input', pesquisarProduto);

let vendas = [];
let produtos = [];

function carregarVendas() {
    const vendasSalvas = localStorage.getItem('vendas');
    if (vendasSalvas) {
        vendas = JSON.parse(vendasSalvas);
        atualizarListaVendas();
    }
}

function salvarVendas() {
    localStorage.setItem('vendas', JSON.stringify(vendas));
}

function adicionarVenda() {
    const produto = document.getElementById('produto').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const custo = parseFloat(document.getElementById('custo').value);
    const valorVenda = parseFloat(document.getElementById('valorVenda').value);
    const fornecedor = document.getElementById('fornecedor').value;

    const venda = { produto, quantidade, custo, valorVenda, fornecedor };
    vendas.push(venda);
    atualizarListaVendas();
    salvarVendas();
    limparCamposVenda();
}

function atualizarListaVendas() {
    const listaVendas = document.getElementById('listaVendas');
    listaVendas.innerHTML = '';

    vendas.forEach((venda, index) => {
        const vendaItem = document.createElement('div');
        vendaItem.className = 'venda-item';

        vendaItem.innerHTML = `
            <div>
                <strong>Produto:</strong> ${venda.produto} |
                <strong>Quantidade:</strong> ${venda.quantidade} |
                <strong>Custo:</strong> ${venda.custo} |
                <strong>Valor de Venda:</strong> ${venda.valorVenda} |
                <strong>Fornecedor:</strong> ${venda.fornecedor}
            </div>
            <div>
                <button onclick="editarVenda(${index})">Editar</button>
                <button onclick="excluirVenda(${index})">Excluir</button>
            </div>
        `;

        listaVendas.appendChild(vendaItem);
    });
}

function limparCamposVenda() {
    document.getElementById('produto').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('custo').value = '';
    document.getElementById('valorVenda').value = '';
}

function editarVenda(index) {
    const venda = vendas[index];
    document.getElementById('produto').value = venda.produto;
    document.getElementById('quantidade').value = venda.quantidade;
    document.getElementById('custo').value = venda.custo;
    document.getElementById('valorVenda').value = venda.valorVenda;
    document.getElementById('fornecedor').value = venda.fornecedor;

    vendas.splice(index, 1);
    atualizarListaVendas();
    salvarVendas();
}

function excluirVenda(index) {
    vendas.splice(index, 1);
    atualizarListaVendas();
    salvarVendas();
}

function limparCaixa() {
    vendas = [];
    atualizarListaVendas();
    localStorage.removeItem('vendas');
}

function fecharCaixa() {
    let totalVendas = 0;
    let totalLucro = 0;
    let pagamentoFornecedores = {};

    vendas.forEach(venda => {
        totalVendas += venda.valorVenda * venda.quantidade;
        totalLucro += (venda.valorVenda - venda.custo) * venda.quantidade;

        if (!pagamentoFornecedores[venda.fornecedor]) {
            pagamentoFornecedores[venda.fornecedor] = 0;
        }
        pagamentoFornecedores[venda.fornecedor] += venda.custo * venda.quantidade;
    });

    alert(`Total de Vendas: R$${totalVendas.toFixed(2)}
Total de Lucro: R$${totalLucro.toFixed(2)}
Pagamento para Fornecedores: ${JSON.stringify(pagamentoFornecedores, null, 2)}`);
}

function enviarWhatsapp() {
    let totalVendas = 0;
    let totalLucro = 0;
    let pagamentoFornecedores = {};

    vendas.forEach(venda => {
        totalVendas += venda.valorVenda * venda.quantidade;
        totalLucro += (venda.valorVenda - venda.custo) * venda.quantidade;

        if (!pagamentoFornecedores[venda.fornecedor]) {
            pagamentoFornecedores[venda.fornecedor] = 0;
        }
        pagamentoFornecedores[venda.fornecedor] += venda.custo * venda.quantidade;
    });

    const mensagem = `Total de Vendas: R$${totalVendas.toFixed(2)}%0ATotal de Lucro: R$${totalLucro.toFixed(2)}%0APagamento para Fornecedores: ${JSON.stringify(pagamentoFornecedores, null, 2)}`;
    window.open(`https://api.whatsapp.com/send?text=${mensagem}`, '_blank');
}

// Funções para controle de estoque
function carregarProdutos() {
    const produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
        produtos = JSON.parse(produtosSalvos);
        atualizarListaProdutos();
    }
}

function salvarProdutos() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function adicionarProduto() {
    const nomeProduto = document.getElementById('nomeProduto').value;
    const quantidadeEstoque = parseInt(document.getElementById('quantidadeEstoque').value);
    const corProduto = document.getElementById('corProduto').value;
    const custoProduto = parseFloat(document.getElementById('custoProduto').value);
    const precoVendaProduto = parseFloat(document.getElementById('precoVendaProduto').value);

    const produto = { nomeProduto, quantidadeEstoque, corProduto, custoProduto, precoVendaProduto };
    produtos.push(produto);
    atualizarListaProdutos();
    salvarProdutos();
    limparCamposProduto();
}

function atualizarListaProdutos() {
    const listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = '';

    produtos.forEach((produto, index) => {
        const produtoItem = document.createElement('div');
        produtoItem.className = 'produto-item';

        produtoItem.innerHTML = `
            <div>
                <strong>Nome:</strong> ${produto.nomeProduto} |
                <strong>Quantidade:</strong> ${produto.quantidadeEstoque} |
                <strong>Cor:</strong> ${produto.corProduto} |
                <strong>Custo:</strong> ${produto.custoProduto} |
                <strong>Preço de Venda:</strong> ${produto.precoVendaProduto}
            </div>
            <div>
                <button onclick="editarProduto(${index})">Editar</button>
                <button onclick="excluirProduto(${index})">Excluir</button>
            </div>
        `;

        listaProdutos.appendChild(produtoItem);
    });
}

function limparCamposProduto() {
    document.getElementById('nomeProduto').value = '';
    document.getElementById('quantidadeEstoque').value = '';
    document.getElementById('corProduto').value = '';
    document.getElementById('custoProduto').value = '';
    document.getElementById('precoVendaProduto').value = '';
}

function editarProduto(index) {
    const produto = produtos[index];
    document.getElementById('nomeProduto').value = produto.nomeProduto;
    document.getElementById('quantidadeEstoque').value = produto.quantidadeEstoque;
    document.getElementById('corProduto').value = produto.corProduto;
    document.getElementById('custoProduto').value = produto.custoProduto;
    document.getElementById('precoVendaProduto').value = produto.precoVendaProduto;

    produtos.splice(index, 1);
    atualizarListaProdutos();
    salvarProdutos();
}

function excluirProduto(index) {
    produtos.splice(index, 1);
    atualizarListaProdutos();
    salvarProdutos();
}

function pesquisarProduto() {
    const termoPesquisa = document.getElementById('pesquisarProduto').value.toLowerCase();
    const listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = '';

    produtos.filter(produto => produto.nomeProduto.toLowerCase().includes(termoPesquisa)).forEach((produto, index) => {
        const produtoItem = document.createElement('div');
        produtoItem.className = 'produto-item';

        produtoItem.innerHTML = `
            <div>
                <strong>Nome:</strong> ${produto.nomeProduto} |
                <strong>Quantidade:</strong> ${produto.quantidadeEstoque} |
                <strong>Cor:</strong> ${produto.corProduto} |
                <strong>Custo:</strong> ${produto.custoProduto} |
                <strong>Preço de Venda:</strong> ${produto.precoVendaProduto}
            </div>
            <div>
                <button onclick="editarProduto(${index})">Editar</button>
                <button onclick="excluirProduto(${index})">Excluir</button>
            </div>
        `;

        listaProdutos.appendChild(produtoItem);
    });
}
