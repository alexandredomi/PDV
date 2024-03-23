function addProduct() {
    var name = document.getElementById("productName").value;
    var quantity = document.getElementById("productQuantity").value;
    var cost = document.getElementById("productCost").value;
    var price = document.getElementById("productPrice").value;
    var supplier = document.getElementById("productSupplier").value;

    var productList = document.getElementById("productList");

    var li = document.createElement("li");
    li.classList.add("productItem");
    li.innerHTML = `
        <div>${name}</div>
        <div>${quantity}</div>
        <div>${cost}</div>
        <div>${price}</div>
        <div>${supplier}</div>
    `;

    productList.appendChild(li);

    // Limpa os campos do formulário após adicionar o produto
    document.getElementById("productName").value = "";
    document.getElementById("productQuantity").value = "";
    document.getElementById("productCost").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productSupplier").value = "";
}

function calculateProfits() {
    var products = document.querySelectorAll('.productItem');
    var totalProfit = 0;
    var supplierCosts = {
        "libert": 0,
        "dentinho": 0,
        "fox": 0,
        "juares": 0,
        "bandeira": 0
    };

    products.forEach(function(product) {
        var cost = parseFloat(product.children[2].textContent);
        var price = parseFloat(product.children[3].textContent);
        var quantity = parseInt(product.children[1].textContent);
        var supplier = product.children[4].textContent;

        var profit = (price - cost) * quantity;
        totalProfit += profit;

        supplierCosts[supplier] += cost * quantity;
    });

    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p><strong>Total do Caixa:</strong> R$${calculateTotalCash().toFixed(2)}</p>
        <p><strong>Lucro Total:</strong> R$${totalProfit.toFixed(2)}</p>
        <p><strong>Custo por Fornecedor:</strong></p>
        <ul>
            <li>Libert: R$${supplierCosts['libert'].toFixed(2)}</li>
            <li>Dentinho: R$${supplierCosts['dentinho'].toFixed(2)}</li>
            <li>Fox: R$${supplierCosts['fox'].toFixed(2)}</li>
            <li>Juares: R$${supplierCosts['juares'].toFixed(2)}</li>
            <li>Bandeira: R$${supplierCosts['bandeira'].toFixed(2)}</li>
        </ul>
    `;
}

function calculateTotalCash() {
    var products = document.querySelectorAll('.productItem');
    var totalCash = 0;

    products.forEach(function(product) {
        var price = parseFloat(product.children[3].textContent);
        var quantity = parseInt(product.children[1].textContent);

        var cash = price * quantity;
        totalCash += cash;
    });

    return totalCash;
}