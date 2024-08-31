window.onload = function() {
    alert("AaharHub");
};
function searchRecipes() {
    // Get the search query
    const query = document.getElementById('search-input').value.toLowerCase();

    // Get all recipe elements
    const recipes = document.querySelectorAll('.recipe');

    // Loop through each recipe and hide those that don't match the query
    recipes.forEach(recipe => {
        const title = recipe.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
            recipe.style.display = '';
        } else {
            recipe.style.display = 'none';
        }
    });
}

// Add event listener for the search input
document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchRecipes();
    }
});

function showMoreRecipes() {
    // Select all hidden recipes
    const hiddenRecipes = document.querySelectorAll('.recipe.hidden');
    
    // Show all hidden recipes
    hiddenRecipes.forEach(recipe => {
        recipe.style.display = 'block';
    });
    
    // Hide the "See More Recipes" button
    document.getElementById('see-more-button').style.display = 'none';
}
// Open the order form modal and set the selected recipe
function openOrderForm(recipe) {
    document.getElementById('order-form-modal').style.display = 'flex';
    document.getElementById('recipe').value = recipe;
}

// Close the order form modal
function closeOrderForm() {
    document.getElementById('order-form-modal').style.display = 'none';
}

// Handle form submission
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Your order has been placed! Thank you.');
    closeOrderForm();
});

function togglePaymentFields() {
    const paymentMethod = document.getElementById('payment-method').value;
    const cardFields = document.getElementById('card-payment-fields');
    const upiFields = document.getElementById('upi-payment-fields');
    const gpayFields = document.getElementById('gpay-payment-fields');
    const phonepeFields = document.getElementById('phonepe-payment-fields');

    
    cardFields.style.display = 'none';
    upiFields.style.display = 'none';
    gpayFields.style.display = 'none';
    phonepeFields.style.display = 'none';

    if (paymentMethod === 'card') {
        cardFields.style.display = 'block';
    } else if (paymentMethod === 'upi') {
        upiFields.style.display = 'block';
    } else if (paymentMethod === 'gpay') {
        gpayFields.style.display = 'block';
    } else if (paymentMethod === 'phonepe') {
        phonepeFields.style.display = 'block';
    }
}

function submitOrder(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    
    const dish = document.getElementById('dish').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.getElementById('payment-method').value;

    if (paymentMethod === 'card') {
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    
    // For now, we'll log the order and payment details to the console
    console.log(`Order Details:
    Dish: ${dish}
    Name: ${name}
    Address: ${address}
    Phone: ${phone}
    Payment:
    Card Name: ${cardName}
    Card Number: ${cardNumber}
    Expiry Date: ${expiryDate}
    CVV: ${cvv}`);

} else if (paymentMethod === 'upi') {
    const upiId = document.getElementById('upi-id').value;

    // Process the UPI payment (mock)
    console.log(`Order Details:
    Dish: ${dish}
    Name: ${name}
    Address: ${address}
    Phone: ${phone}
    Payment Method: UPI
    UPI ID: ${upiId}`);
}else if (paymentMethod === 'gpay') {
    // Mock GPay payment processing
    console.log(`Order Details:
    Dish: ${dish}
    Name: ${name}
    Address: ${address}
    Phone: ${phone}
    Payment Method: Google Pay (GPay)`);
} else if (paymentMethod === 'phonepe') {
    // Mock PhonePe payment processing
    console.log(`Order Details:
    Dish: ${dish}
    Name: ${name}
    Address: ${address}
    Phone: ${phone}
    Payment Method: PhonePe`);
}

    alert('Thank you for your order! Your payment has been processed.');
    
    // Optionally, reset the form after submission
    document.getElementById('order-form').reset();
    togglePaymentFields(); // Reset payment fields to the default state
}

// Array to store contributed dishes
let contributedDishes = [];

function submitDish(event) {
    event.preventDefault();

    const dishName = document.getElementById('dish-name').value;
    const contributorName = document.getElementById('contributor-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const dishVideo = document.getElementById('dish-video').files[0]; // Get the video file

    // Create an object for the new dish
    const newDish = {
        dishName: dishName,
        contributorName: contributorName,
        ingredients: ingredients,
        instructions: instructions,
        videoURL: URL.createObjectURL(dishVideo) // Create a temporary URL for the video file
    };

    // Add the new dish to the array
    contributedDishes.push(newDish);

    // Clear the form
    document.getElementById('contribute-form').reset();

    // Notify the user
    alert("Recipe submitted successfully!");

    // Optionally display the contributed dishes
    displayContributedDishes();
}

function displayContributedDishes() {
    const dishList = document.createElement('ul');
    
    contributedDishes.forEach(dish => {
        const dishItem = document.createElement('li');
        
        // Create dish details
        const dishDetails = document.createElement('div');
        dishDetails.textContent = `${dish.dishName} by ${dish.contributorName}`;
        
        // Create a video element
        const videoElement = document.createElement('video');
        videoElement.controls = true;
        videoElement.src = dish.videoURL;
        videoElement.width = 320; // Set video width (adjust as needed)
        
        // Append details and video to the list item
        dishItem.appendChild(dishDetails);
        dishItem.appendChild(videoElement);
        dishList.appendChild(dishItem);
    });

    const contributedSection = document.getElementById('contributed-dishes');
    contributedSection.innerHTML = '';
    contributedSection.appendChild(dishList);
}
// Initialize coin balance
let coinBalance = 0;

// Function to update the coin balance display
function updateCoinDisplay() {
    const coinDisplay = document.getElementById('coin-display');
    coinDisplay.textContent = `Coins: ${coinBalance}`;
}

// Function to add coins to the user's balance
function earnCoins(amount) {
    coinBalance += amount;
    updateCoinDisplay();
}

// Initialize the display when the page loads
document.addEventListener('DOMContentLoaded', updateCoinDisplay);

let coinsEarned = 0; // Track coins earned in the game

// Function to update the display of earned coins
function updateEarnedCoinsDisplay() {
    const earnedCoinsDisplay = document.getElementById('coins-earned');
    earnedCoinsDisplay.textContent = coinsEarned;
}

// Function to handle the button click
function clickToEarnCoins() {
    const coinsPerClick = 10; // Amount of coins earned per click
    coinsEarned += coinsPerClick;
    coinBalance += coinsPerClick; // Add to the overall coin balance
    updateEarnedCoinsDisplay();
    updateCoinDisplay(); // Update the overall coin display
}

// Event listener for the click button
document.getElementById('click-button').addEventListener('click', clickToEarnCoins);

// Initialize the display when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateEarnedCoinsDisplay();
    updateCoinDisplay();
});


// Array to store user's orders
let userOrders = [];

// Function to add a new order
function addOrder(dishName) {
    const order = {
        id: userOrders.length + 1,
        dishName: dishName,
        date: new Date().toLocaleDateString(),
    };
    userOrders.push(order);
    displayOrders();
}

// Function to display orders in the "Your Orders" section
function displayOrders() {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';

    userOrders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `<p>Order #${order.id}: ${order.dishName}</p><p>Date: ${order.date}</p>`;
        ordersList.appendChild(orderItem);
    });
}

// Example: Add an order when the user places one (this should be linked to your existing order system)
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const dishName = document.getElementById('dish').value;
    addOrder(dishName);
    alert('Your order has been added to "Your Orders".');
});



document.getElementById('coupon-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const couponCode = document.getElementById('coupon-code').value.trim().toUpperCase();
    const couponResult = document.getElementById('coupon-result');

    const validCoupons = {
        "SAVE10": "10% off applied!",
        "FREESHIP": "Free shipping applied!",
        "AUGUST20": "20% off applied!"
    };

    if (validCoupons[couponCode]) {
        couponResult.textContent = validCoupons[couponCode];
        couponResult.style.color = "#28a745"; // Success color
    } else {
        couponResult.textContent = "Invalid coupon code. Please try again.";
        couponResult.style.color = "#d9534f"; // Error color
    }

    // Optionally, clear the input field
    document.getElementById('coupon-code').value = '';
});
