// Function to show the selected page and hide others
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.id === pageId) {
            if (page.style.display === 'none') {
                const myTimein = setTimeout(() => {
                    page.classList.remove('fade')
                    page.style.display = 'inline';
                    /*if ('home' === pageId) {
                        document.getElementById('logo-container').classList.add('home-logo');
                    } else {
                        document.getElementById('logo-container').classList.remove('home-logo');
                    }*/
                }, 500)
            }
        } else {
            page.classList.add('fade');
            page.style.display = 'none';
        }
    });

    // Update the active link style (optional)
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById('nav-' + pageId).classList.add('active');
}

let total = 0; // Global total variable

const cashewContainer = document.getElementById('cashews-container');
const teaContainer = document.getElementById('tea-container');

const products = {
    cashews: [
        { name: "Cashew 1", price: 150.00, image: "https://via.placeholder.com/150" },
        { name: "Cashew 2", price: 180.00, image: "https://via.placeholder.com/150" },
        { name: "Cashew 3", price: 200.00, image: "https://via.placeholder.com/150" },
        { name: "Cashew 4", price: 170.00, image: "https://via.placeholder.com/150" },
        { name: "Cashew 5", price: 220.00, image: "https://via.placeholder.com/150" }
    ],
    teaPowder: [
        { name: "Tea Powder 1", price: 100.00, image: "https://via.placeholder.com/150" },
        { name: "Tea Powder 2", price: 120.00, image: "https://via.placeholder.com/150" },
        { name: "Tea Powder 3", price: 140.00, image: "https://via.placeholder.com/150" },
        { name: "Tea Powder 4", price: 130.00, image: "https://via.placeholder.com/150" },
        { name: "Tea Powder 5", price: 150.00, image: "https://via.placeholder.com/150" }
    ]
};

// Define your images in folders and corresponding text
const cashewImages = [
    "images/home/Cashews/cashew1.jpg",
    "images/home/Cashews/cashew2.jpg",
    "images/home/Cashews/cashew3.jpg",
    "images/home/Cashews/cashew4.jpg",
    "images/home/Cashews/cashew5.jpg",
    "images/home/Cashews/cashew6.jpg",
    "images/home/Cashews/cashew7.jpg",
    "images/home/Cashews/cashew8.jpg",
    "images/home/Cashews/cashew9.jpg",
    "images/home/Cashews/cashew10.jpg",
    "images/home/Cashews/cashew11.jpg"
];

const cashewTexts = [
    "Cashews are rich in healthy fats and provide essential vitamins and minerals.",
    "Cashews have a smooth, buttery texture, making them a favorite snack.",
    "Cashews can be used in cooking, baking, or enjoyed on their own.",
    "Cashews are grown in tropical climates and are known for their delicious taste."
];

let currentIndex = 0;

// Elements
const containerElement = document.getElementById("slideshow-container");
const imageElement = document.getElementById("slideshow-image");
const textElement = document.getElementById("slideshow-text");

// Function to display the next image and a random text
function showNextImageAndText() {
    // Set the current image
    containerElement.classList.add('fade');
    const myTimein = setTimeout(() => {
        containerElement.classList.remove('fade');
        imageElement.src = cashewImages[currentIndex];

        // Select a random text from cashewTexts
        const randomText = cashewTexts[Math.floor(Math.random() * cashewTexts.length)];
        textElement.textContent = randomText;

        // Update index to loop through images
        currentIndex = (currentIndex + 1) % cashewImages.length;
    }, 1000);

}

// Initial display and interval setup
showNextImageAndText();
setInterval(showNextImageAndText, 5000); // Adjust the interval as needed

// Function to create product box
function createProductBox(product) {
    const productBox = document.createElement('div');
    productBox.classList.add('checkout-box');

    productBox.innerHTML = `
    <div class="product-container">
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-name">
            <h2>${product.name}</h2>
        </div>
        <div class="product-price">
            <p>₹${product.price}</p>
        </div>
        <div class="quantity-selector">
            <button class="quantity-btn" onclick="decreaseQuantity(this)">-</button>
            <span class="quantity">0</span>
            <button class="quantity-btn" onclick="increaseQuantity(this)">+</button>
        </div>
    </div>
    `;
    return productBox;
}

//toggle product checkout details
function toggleCategory(productType) {
    const thisProducts = document.querySelectorAll('.products-container');
    thisProducts.forEach(thisProduct => {
        if (thisProduct.id === productType) {
            thisProduct.style.display = '';
        } else {
            thisProduct.style.display = 'none';
        }
    });
    showPage('checkout');
}

// Function to load products into respective categories
function loadProducts() {
    products.cashews.forEach(product => {
        cashewContainer.appendChild(createProductBox(product));
    });

    products.teaPowder.forEach(product => {
        teaContainer.appendChild(createProductBox(product));
    });
}

// Function to increase quantity and update total incrementally
function increaseQuantity(button) {
    const quantityElement = button.previousElementSibling;
    let quantity = parseInt(quantityElement.innerText);

    if (quantity < 99) {
        quantity++;
        quantityElement.innerText = quantity;

        // Incrementally update total
        const price = parseFloat(button.closest('.checkout-box').querySelector('.product-price p').innerText.replace('₹', ''));
        total += price;
    }

    // Update total on screen
    document.getElementById('total-price').innerText = `Total: ₹${total.toFixed(2)}`;
}

// Function to decrease quantity and update total incrementally
function decreaseQuantity(button) {
    const quantityElement = button.nextElementSibling;
    let quantity = parseInt(quantityElement.innerText);

    if (quantity > 0) {
        quantity--;
        quantityElement.innerText = quantity;

        // Decrementally update total
        const price = parseFloat(button.closest('.checkout-box').querySelector('.product-price p').innerText.replace('₹', ''));
        total -= price;
    }

    // Update total on screen
    document.getElementById('total-price').innerText = `Total: ₹${total.toFixed(2)}`;
}

// Refresh total button recalculates the total from scratch
function refreshTotal() {
    total = 0; // Reset the total
    const productBoxes = document.querySelectorAll('.checkout-box');

    productBoxes.forEach(box => {
        const price = parseFloat(box.querySelector('.product-price p').innerText.replace('₹', ''));
        const quantity = parseInt(box.querySelector('.quantity').innerText);

        if (quantity > 0) {
            total += price * quantity;
        }
    });

    // Update the total on screen
    document.getElementById('total-price').innerText = `Total: ₹${total.toFixed(2)}`;
}

// Checkout via WhatsApp
function checkoutWhatsApp() {
    let message = "Checkout details:\n";
    const productBoxes = document.querySelectorAll('.checkout-box');
    let hasItems = false;

    productBoxes.forEach(box => {
        const name = box.querySelector('.product-name h2').innerText;
        const quantity = parseInt(box.querySelector('.quantity').innerText);
        const price = parseFloat(box.querySelector('.product-price p').innerText.replace('₹', ''));

        if (quantity > 0) {
            message += `${name}: ${quantity}, ₹${price}, Quantity Total: ₹${quantity * price}\n`;
            hasItems = true;
        }
    })
    refreshTotal();
    message += `\n\nGrand Total: ₹${total}\n`;

    if (hasItems) {
        const whatsappUrl = `https://wa.me/+918089841228?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    } else {
        alert("No items in the cart to checkout.");
    }
}

// Load products on page load
window.onload = loadProducts;