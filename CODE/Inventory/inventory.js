// Inventory Management JavaScript

$(document).ready(function() {
    // Check if language is stored in localStorage
    let currentLang = localStorage.getItem('selectedLanguage') || 'en';
    
    // Function to update UI text based on selected language
    function updateInventoryLanguage() {
        // Update inventory page specific elements
        $('.card-title').text(translations[currentLang].inventoryItems || 'Inventory Items');
        $('.card-subtitle').text(translations[currentLang].currentStockStatus || 'Current Stock Status');
        $('#inventorySearch').attr('placeholder', translations[currentLang].searchItems || 'Search items...');
        $('.add-item-btn').html(`<i class="fas fa-plus"></i> ${translations[currentLang].addItem || 'Add Item'}`);
        
        // Update table headers
        $('.inventory-table th:nth-child(1)').text(translations[currentLang].itemName || 'Item Name');
        $('.inventory-table th:nth-child(2)').text(translations[currentLang].category || 'Category');
        $('.inventory-table th:nth-child(3)').text(translations[currentLang].quantity || 'Quantity');
        $('.inventory-table th:nth-child(4)').text(translations[currentLang].unit || 'Unit');
        $('.inventory-table th:nth-child(5)').text(translations[currentLang].lastUpdated || 'Last Updated');
        $('.inventory-table th:nth-child(6)').text(translations[currentLang].status || 'Status');
        $('.inventory-table th:nth-child(7)').text(translations[currentLang].actions || 'Actions');
    }
    
    // Initialize language
    updateInventoryLanguage();
    
    // Listen for language change events
    $(document).on('languageChanged', function(e, lang) {
        currentLang = lang;
        updateInventoryLanguage();
    });
});

// Sample inventory data for Crepe's Delight
const inventoryData = [
    {
        id: 1,
        name: "Flour",
        category: "Batter",
        quantity: 50,
        unit: "lbs",
        lastUpdated: "2023-11-15",
        status: "in-stock"
    },
    {
        id: 2,
        name: "Eggs",
        category: "Batter",
        quantity: 180,
        unit: "pieces",
        lastUpdated: "2023-11-12",
        status: "in-stock"
    },
    {
        id: 3,
        name: "Milk",
        category: "Batter",
        quantity: 25,
        unit: "gallons",
        lastUpdated: "2023-11-14",
        status: "in-stock"
    },
    {
        id: 4,
        name: "Butter",
        category: "Batter",
        quantity: 8,
        unit: "lbs",
        lastUpdated: "2023-11-10",
        status: "low"
    },
    {
        id: 5,
        name: "Nutella",
        category: "Filling",
        quantity: 5,
        unit: "jars",
        lastUpdated: "2023-11-08",
        status: "low"
    },
    {
        id: 6,
        name: "Strawberries",
        category: "Fruit",
        quantity: 15,
        unit: "lbs",
        lastUpdated: "2023-11-15",
        status: "in-stock"
    },
    {
        id: 7,
        name: "Bananas",
        category: "Fruit",
        quantity: 25,
        unit: "lbs",
        lastUpdated: "2023-11-15",
        status: "in-stock"
    },
    {
        id: 8,
        name: "Chocolate Sauce",
        category: "Topping",
        quantity: 10,
        unit: "bottles",
        lastUpdated: "2023-11-13",
        status: "in-stock"
    },
    {
        id: 9,
        name: "Whipped Cream",
        category: "Topping",
        quantity: 3,
        unit: "cans",
        lastUpdated: "2023-11-09",
        status: "low"
    },
    {
        id: 10,
        name: "Ham",
        category: "Savory",
        quantity: 12,
        unit: "lbs",
        lastUpdated: "2023-11-14",
        status: "in-stock"
    },
    {
        id: 11,
        name: "Cheese",
        category: "Savory",
        quantity: 15,
        unit: "lbs",
        lastUpdated: "2023-11-14",
        status: "in-stock"
    },
    {
        id: 12,
        name: "Crepe Boxes",
        category: "Packaging",
        quantity: 500,
        unit: "pieces",
        lastUpdated: "2023-11-11",
        status: "in-stock"
    },
    {
        id: 13,
        name: "Sauce Cups",
        category: "Packaging",
        quantity: 200,
        unit: "pieces",
        lastUpdated: "2023-11-10",
        status: "low"
    },
    {
        id: 14,
        name: "Paper Bags",
        category: "Packaging",
        quantity: 150,
        unit: "pieces",
        lastUpdated: "2023-11-12",
        status: "in-stock"
    },
    {
        id: 15,
        name: "Napkins",
        category: "Supplies",
        quantity: 0,
        unit: "packs",
        lastUpdated: "2023-11-05",
        status: "out"
    },
    {
        id: 16,
        name: "Powdered Sugar",
        category: "Topping",
        quantity: 5,
        unit: "lbs",
        lastUpdated: "2023-11-08",
        status: "low"
    },
    {
        id: 17,
        name: "Spinach",
        category: "Savory",
        quantity: 8,
        unit: "lbs",
        lastUpdated: "2023-11-13",
        status: "in-stock"
    },
    {
        id: 18,
        name: "Coffee",
        category: "Beverage",
        quantity: 20,
        unit: "lbs",
        lastUpdated: "2023-11-15",
        status: "in-stock"
    }
];

// Sample recipe data based on inventory items
const recipeData = [
    {
        id: 1,
        name: "Nutella Banana Crepe",
        ingredients: ["Flour", "Eggs", "Milk", "Nutella", "Bananas", "Powdered Sugar"],
        image: "nutella-banana.jpg"
    },
    {
        id: 2,
        name: "Strawberry Delight",
        ingredients: ["Flour", "Eggs", "Milk", "Strawberries", "Whipped Cream", "Chocolate Sauce"],
        image: "strawberry-crepe.jpg"
    },
    {
        id: 3,
        name: "Ham & Cheese Special",
        ingredients: ["Flour", "Eggs", "Milk", "Butter", "Ham", "Cheese"],
        image: "ham-cheese-crepe.jpg"
    },
    {
        id: 4,
        name: "Spinach & Cheese Crepe",
        ingredients: ["Flour", "Eggs", "Milk", "Spinach", "Cheese", "Butter"],
        image: "spinach-crepe.jpg"
    },
    {
        id: 5,
        name: "Chocolate Lover's Crepe",
        ingredients: ["Flour", "Eggs", "Milk", "Chocolate Sauce", "Whipped Cream"],
        image: "chocolate-crepe.jpg"
    },
    {
        id: 6,
        name: "Berry Blast Crepe",
        ingredients: ["Flour", "Eggs", "Milk", "Strawberries", "Powdered Sugar"],
        image: "berry-crepe.jpg"
    }
];

// Initialize the inventory table when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Populate inventory table
    populateInventoryTable();
    
    // Populate recipe cards
    populateRecipeCards();
    
    // Set up search functionality
    setupSearch();
    
    // Set up add item button
    setupAddItemButton();
});

// Function to populate the inventory table with data
function populateInventoryTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    tableBody.innerHTML = '';
    
    inventoryData.forEach(item => {
        const row = document.createElement('tr');
        
        // Determine status class
        let statusClass = '';
        if (item.status === 'in-stock') {
            statusClass = 'status-in-stock';
        } else if (item.status === 'low') {
            statusClass = 'status-low';
        } else if (item.status === 'out') {
            statusClass = 'status-out';
        }
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.unit}</td>
            <td>${item.lastUpdated}</td>
            <td><span class="status-badge ${statusClass}">${item.status}</span></td>
            <td>
                <button class="action-btn" onclick="editItem(${item.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn" onclick="deleteItem(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Function to populate recipe cards
function populateRecipeCards() {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = '';
    
    recipeData.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        
        // Check if all ingredients are available
        const allIngredientsAvailable = recipe.ingredients.every(ingredient => {
            const inventoryItem = inventoryData.find(item => item.name === ingredient);
            return inventoryItem && inventoryItem.status !== 'out';
        });
        
        card.innerHTML = `
            <div class="recipe-image">
                <i class="fas fa-utensils"></i>
            </div>
            <div class="recipe-title">${recipe.name}</div>
            <div class="recipe-ingredients">${recipe.ingredients.join(', ')}</div>
            <button class="view-recipe-btn" ${!allIngredientsAvailable ? 'disabled' : ''} onclick="viewRecipe(${recipe.id})">
                ${allIngredientsAvailable ? 'View Recipe' : 'Missing Ingredients'}
            </button>
        `;
        
        recipesContainer.appendChild(card);
    });
}

// Function to set up search functionality
function setupSearch() {
    const searchInput = document.getElementById('inventorySearch');
    
    searchInput.addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const tableBody = document.getElementById('inventoryTableBody');
        const rows = tableBody.getElementsByTagName('tr');
        
        for (let i = 0; i < rows.length; i++) {
            const itemName = rows[i].getElementsByTagName('td')[0].textContent.toLowerCase();
            const itemCategory = rows[i].getElementsByTagName('td')[1].textContent.toLowerCase();
            
            if (itemName.includes(searchTerm) || itemCategory.includes(searchTerm)) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    });
}

// Function to set up add item button
function setupAddItemButton() {
    const addItemBtn = document.querySelector('.add-item-btn');
    
    addItemBtn.addEventListener('click', function() {
        // In a real application, this would open a modal or form to add a new item
        alert('Add new inventory item functionality would go here!');
    });
}

// Function to edit an item (placeholder)
function editItem(itemId) {
    // In a real application, this would open a modal or form to edit the item
    alert(`Edit item with ID: ${itemId}`);
}

// Function to delete an item (placeholder)
function deleteItem(itemId) {
    // In a real application, this would show a confirmation dialog and then delete the item
    alert(`Delete item with ID: ${itemId}`);
}

// Function to view a recipe (placeholder)
function viewRecipe(recipeId) {
    // In a real application, this would open a modal or navigate to a recipe detail page
    alert(`View recipe with ID: ${recipeId}`);
}