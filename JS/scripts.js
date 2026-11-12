// I primarely reused another projects assests in this.
// Component list
// Product List
const productSearchList = document.querySelector("#productSearchList");
const searchButton = document.querySelector("#searchButton");
const viewShoppingListButton = document.querySelector("#shoppingListButton");
const productList = document.querySelector("#productList");
const productListBody = document.querySelector("#productListBody");
const message1 = document.querySelector("#message1");
const addToShopListButtons = document.querySelectorAll(".addToShopListButton"); // Dunno if this is needed...

// Shopping List
const shoppingList = document.querySelector("#shoppingList");
const hideShoppingListButton = document.querySelector("#closeShoppingList");
const shoppingListTable = document.querySelector("#shoppingListTable");
const shoppingListTableBody = document.querySelector("#shoppingListTableBody");
const message2 = document.querySelector("#message2");
const removeFromShopListButtons = document.querySelectorAll(".removeFromShopListButton"); // Or this...

// When started, autohides.
productSearchList.hidden = true;
message1.hidden = false;
shoppingList.hidden = true;
message2.hidden = false;

// Shopping list switcher. Simply hides the current section and shows the other one.
viewShoppingListButton.addEventListener("click", function () {
    productList.hidden = true;
    shoppingList.hidden = false;
});
hideShoppingListButton.addEventListener("click", function () {
    shoppingList.hidden = true;
    productList.hidden = false;
});

// Button function that fetches the products from the API and lists them in the table. If the input is empty, it will fetch all products.
searchButton.addEventListener("click", function () {
    // First, fetch from the API.
    fetch('https://fakestoreapi.com/products')
        // Then we convert the response to JSON.
        .then(response => response.json())
        // Then we call a function that takes said JSON response and makes a list out of it..
        .then(data => {listProducts(data); console.info('Success!');})
        // And incase it fails...
        .catch(error => {
            console.error('Error fetching products:', error);
            message1.textContent = ('Could not fetch products: Error ' + error);
        });
});

// Function that lists the products in the table.
function listProducts(products) {
    // Clear the table of products.
    productListBody.innerHTML = "";
    // Insert the products into the one by one.
    products.forEach(product => {
        // <td class="ProductImgTD"><img src="${product.image}" alt="${product.title}" class="ProductImg"></td>
        // The above is outside for now...
        // Creating a new row for the HTML. Using '' method this time.
        productListBody.innerHTML += `
        <tr>
            <td hidden>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td><button class="addToShopListButton" onclick="addToShoppingList(this.parentNode.parentNode)">Add</button></td>
        </tr>
        `;
    });
    // Now hide the message and show the product list.
    message1.hidden = true;
    productSearchList.hidden = false;
}

// Function that adds a given product to the shopping list and replaces the button with a delete version.
// Also locks itself to prevent having more than 1 item in a shopping list.
function addToShoppingList(productRow) {
    // First we check if the product is in the shopping list.
    if (productRow.querySelector(".addToShopListButton").classList.contains("inShoppingListButton")) {
    } else {
        // We clone the product row. (Note: First time I learned this function. Thanks autofill!)
        copiedProductRow = productRow.cloneNode(true);

        // Then we insert/append the copied row into the shopping list table.
        shoppingListTableBody.appendChild(copiedProductRow);

        // Then we replace the button with a remove button that removes its own row.
        copiedProductRow.querySelector(".addToShopListButton").outerHTML = '<button class="removeFromShopListButton" onclick="removeFromShoppingList(this.parentNode.parentNode)">Remove</button>';

        // Now we add the class that prevents this function from running at all.
        productRow.querySelector(".addToShopListButton").classList.add("inShoppingListButton");
        
        message2.hidden = true;
    };
}

// Function to remove the product from the shopping list.
// The reason why it was made a seperate function instead of having it directly be in the button's onclick function
// is because we want to check if the shopping list is empty after said removal and display the message if it is.
function removeFromShoppingList(productRow) {
    // First we remove the lock class from the original product row using the ID of copied row.
    // We fetch the ID of the row.
    var copyProductId = productRow.children[0].textContent;
    // Then we get all of the rows that have the lock class
    var rowsDLTButtons = productSearchList.querySelectorAll(".inShoppingListButton");
    // Now we compare their ID's to the one we have one by one.
    rowsDLTButtons.forEach(row => {
        var rowTR = row.parentNode.parentNode
        if (rowTR.children[0].textContent == copyProductId){
            // If it is the same, then we unlock it. Can't break the foreach, so...
            rowTR.querySelector(".addToShopListButton").classList.remove("inShoppingListButton");
        } 
    });

    // NOW we remove the product row.
    productRow.remove();
    // Now we check if the shopping list is empty.
    if (shoppingListTableBody.children.length === 0) {
        // If it is, we show the message.
        message2.hidden = false;
    } else {
        message2.hidden = true;
    };
}