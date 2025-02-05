// Sample product data with categories
const products = [
    { id: 1, name: "Smartphone", price: 599, image: "smartphone.jpg", category: "electronics" },
    { id: 2, name: "Laptop", price: 999, image: "laptop.jpg", category: "electronics" },
    { id: 3, name: "Headphones", price: 199, image: "headphones.jpg", category: "electronics" },
    { id: 4, name: "Smartwatch", price: 249, image: "smartwatch.jpg", category: "electronics" },
    { id: 5, name: "T-shirt", price: 19, image: "tshirt.jpg", category: "fashion" },
    { id: 6, name: "Jeans", price: 49, image: "jeans.jpg", category: "fashion" },
    { id: 7, name: "Blender", price: 89, image: "blender.jpg", category: "home-kitchen" },
    { id: 8, name: "Cookware Set", price: 159, image: "cookware.jpg", category: "home-kitchen" },
    { id: 9, name: "Face Cream", price: 29, image: "facecream.jpg", category: "beauty-health" },
    { id: 10, name: "Shampoo", price: 15, image: "shampoo.jpg", category: "beauty-health" }
];

// Sample cart to hold selected items
let cart = [];

// Function to load products dynamically into the product section
function loadProducts(filteredProducts = products) {
    const productList = document.querySelector(".product-list");
    productList.innerHTML = ''; // Clear existing products
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productElement);
    });
}

// Function to add products to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const productInCart = cart.find(item => item.id === productId);
    
    if (productInCart) {
        productInCart.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

// Function to update the cart UI
function updateCartUI() {
    const cartItems = document.querySelector(".cart-items");
    cartItems.innerHTML = ''; // Clear current cart

    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <p>${item.name} (x${item.quantity}) - $${item.price * item.quantity}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItems.appendChild(cartItemElement);
        });
    }

    // Update checkout button text based on cart content
    const checkoutButton = document.getElementById("checkout");
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    checkoutButton.textContent = `Proceed to Checkout ($${totalPrice})`;
}

// Function to remove items from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Function to handle checkout form submission
document.getElementById("checkout-form")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;

    if (!validateCardNumber(cardNumber) || !validateExpiryDate(expiryDate) || !validateCVV(cvv)) {
        alert("Please provide valid payment details.");
        return;
    }

    alert("Payment successful! Thank you for shopping with IBN Shopping.");
    cart = []; // Clear cart after successful checkout
    updateCartUI();
    document.getElementById("checkout-section").classList.add("hidden"); // Hide checkout form
});

// Function to show the checkout section
document.getElementById("checkout")?.addEventListener("click", function () {
    if (cart.length > 0) {
        document.getElementById("checkout-section").classList.remove("hidden");
    }
});

// Form validation functions
function validateCardNumber(cardNumber) {
    const regex = /^[0-9]{16}$/; // Card number must be 16 digits
    return regex.test(cardNumber);
}

function validateExpiryDate(expiryDate) {
    const today = new Date();
    const [year, month] = expiryDate.split('-').map(num => parseInt(num, 10));
    return today.getFullYear() < year || (today.getFullYear() === year && today.getMonth() + 1 <= month);
}

function validateCVV(cvv) {
    const regex = /^[0-9]{3}$/; // CVV must be 3 digits
    return regex.test(cvv);
}

// Function to filter products by category
function filterProducts(category) {
    const filteredProducts = products.filter(product => product.category === category);
    loadProducts(filteredProducts);
}

// Initial function calls
window.onload = () => {
    loadProducts(); // Load all products initially
    updateCartUI();
};
