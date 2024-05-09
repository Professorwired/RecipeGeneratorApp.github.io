const YOUR_APP_ID = '0a6d1a30';
const YOUR_APP_KEY = '6effed7048cc943a779a84710604addc';

function searchRecipe() {
    const searchQuery = document.getElementById("searchInput").value.trim();
    if (!searchQuery) {
        alert("Please enter a recipe to search.");
        return;
    }

    const endpoint = `https://api.edamam.com/search?q=${searchQuery}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;

    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.hits.length === 0) {
                displayRecipeNotFound();
            } else {
                const recipe = data.hits[0].recipe; // Get the first recipe for simplicity
                displayRecipe(recipe);
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}



function displayRecipe(recipe) {
    const recipeContainer = document.getElementById("recipeContainer");

    // Clear previous recipe details
    recipeContainer.innerHTML = "";

    // Display recipe details
    const recipeTitle = document.createElement("h2");
    recipeTitle.textContent = recipe.label;
    recipeContainer.appendChild(recipeTitle);

    // Display recipe image
    if (recipe.image) {
        const recipeImage = document.createElement("img");
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.label;
        recipeContainer.appendChild(recipeImage);
    }

    const ingredientsTitle = document.createElement("h3");
    ingredientsTitle.textContent = "Ingredients:";
    recipeContainer.appendChild(ingredientsTitle);

    const ingredientsList = document.createElement("ul");
    recipe.ingredientLines.forEach(ingredient => {
        const listItem = document.createElement("li");
        listItem.textContent = ingredient;
        ingredientsList.appendChild(listItem);
    });
    recipeContainer.appendChild(ingredientsList);   
}

function displayRecipeNotFound() {
    const recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.innerHTML = "<p>No recipes found.</p>";
}



