// I primarely reused another projects assests in this.
// Component list
// Product List
const productSearchList = document.querySelector("#productSearchList");
const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const searchFilteringButton = document.querySelector("#searchFiltering");
const shoppingListButton = document.querySelector("#shoppingListButton");
const productList = document.querySelector("#productList");
const productListBody = document.querySelector("#productListBody");
const message1 = document.querySelector("#message1");

// Shopping List
const shoppingList = document.querySelector("#shoppingList");
const closeShoppingListButton = document.querySelector("#closeShoppingList");
const shoppingListTable = document.querySelector("#shoppingListTable");
const shoppingListTableBody = document.querySelector("#shoppingListTableBody");
const message2 = document.querySelector("#message2");

// When started, autohides.
productSearchList.hidden = true;
message1.hidden = false;
shoppingList.hidden = true;
message2.hidden = true;

// Shopping list switcher. Simply hides the current section and shows the other one.
shoppingListButton.addEventListener("click", function () {
    productList.hidden = true;
    shoppingList.hidden = false;
});
closeShoppingListButton.addEventListener("click", function () {
    shoppingList.hidden = true;
    productList.hidden = false;
});

// Button input that fetches the products from the API and lists them in the table. If the input is empty, it will fetch all products.
searchButton.addEventListener("click", function () {
    // First we remove any whitespace. (Thanks auto-assist.)
    const searchTerm = searchInput.value.trim();
    // If the input is empty, we fetch all products and list them in the table.
    if (searchTerm === "") {
        // First, fetch from the API.
        fetch('https://fakestoreapi.com/products')
            // Then we convert the response to JSON.
            .then(response => response.json())
            // Then we call a function that will list the products in the table.
            .then(data => {console.log(data); listProducts(data);})
            // And incase it fails...
            .catch(error => {
                console.error('Error fetching products:', error);
                message1.textContent = ('Could not fetch products: Error ' + error);
            });
    }
    // Otherwise, we fetch all of the products and remove the ones that do not match the input.
    else {
        // If this is empty, then i didn't have enough time.
    }
    // After the search is complete, we clear the input field.
    searchInput.value = "";
});

// Function that lists the products in the table.
function listProducts(products) {
    // Clear the table of products.
    productListBody.innerHTML = "";
    // Insert the products into the one by one.
    products.forEach(product => {
        console.log(product);
        // <td class="ProductImgTD"><img src="${product.image}" alt="${product.title}" class="ProductImg"></td>
        // The above is outside for now...
        // Creating a new row for the HTML.
        productListBody.innerHTML += `
        <tr>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
        </tr>
        `;
    });
    console.log('Success!');
    // Now we hide the message and show the product list.
    message1.hidden = true;
    productSearchList.hidden = false;
}