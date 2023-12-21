import { recipes } from "../data/recipes.js";

const container = document.querySelector(".container-main");
const nbRecipes = document.querySelector(".recipes-nb");
let totalRecipes = 0;

const searchInput = document.querySelector(".search-bar");
const searchTags = document.querySelectorAll(".search-tags-title");

let result = [];

const createCard = (recipe) => {
  const ingredientsContent = recipe.ingredients
    ? recipe.ingredients
        .map(
          (ingredient) => `
          <div class="card-content-ingredient">
            <p class="card-content-name">${ingredient.ingredient}</p>
            <p class="card-content-quantity">${ingredient.quantity}${
            ingredient.unit ? ingredient.unit : ""
          }</p>
          </div>
        `
        )
        .join("")
    : "";

  const card = `
      <div class="card">
        <div class="card-header">
          <img class="card-header-img" src="./img/recipes/${recipe.image}" alt="${recipe.name}">
          <p class="duration">${recipe.time}min</p>
        </div>
        <div class="card-content">
          <h3 class="card-title">${recipe.name}</h3>
          <div>
            <h4 class="card-content-title">Recette</h4>
            <p class="card-content-text">${recipe.description}</p>
          </div>
          <div>
            <h4 class="card-content-title">Ingrédients</h4>
            <div class="card-content-recipe">
              ${ingredientsContent}
            </div>
          </div>
        </div>
      </div>
    `;

  return card;
};

const createIngredient = (ingredient) => {
  const ingredients = `
      <li class="tag">${ingredient}</li>
    `;

  return ingredients;
};

const createAppliance = (applaince) => {
  const applainces = `
      <li class="tag">${applaince}</li>
    `;

  return applainces;
};
const createUstensils = (ustensil) => {
  const ustensils = `
      <li class="tag">${ustensil}</li>
    `;

  return ustensils;
};

searchTags.forEach((el) => {
  el.addEventListener("click", () => {
    if (el.parentNode.childNodes[3].classList.contains("display-none")) {
      el.parentNode.childNodes[3].classList.remove("display-none");
      el.parentNode.childNodes[3].classList.add("display-flex");
    } else {
      el.parentNode.childNodes[3].classList.remove("display-flex");
      el.parentNode.childNodes[3].classList.add("display-none");
    }
  });
});

const displayCard = (recipes) => {
  container.innerHTML = "";
  if (recipes.length === 0) {
    // Afficher un message si aucun résultat n'est trouvé
    container.innerHTML = `<p class="no-result">Aucun résultat trouvé</p>`;
    nbRecipes.innerHTML = "Aucun résultat";
  } else {
    recipes.forEach((recipe) => {
      const recipeCard = createCard(recipe);

      container.innerHTML += recipeCard;
    });
    totalRecipes = recipes.length;
    const textTotalRecipes =
      totalRecipes > 1
        ? `${totalRecipes} recettes`
        : `0${totalRecipes} recette`;
    nbRecipes.innerHTML = textTotalRecipes;
  }
};

const displayTags = (recipes) => {
  let ingredients = [];
  let appliances = [];
  let ustensils = [];
  let ingredientContainer = document.querySelector(".ingredients");
  let applianceContainer = document.querySelector(".appliances");
  let ustensilContainer = document.querySelector(".ustensils");

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (!ingredients.includes(ingredient.ingredient)) {
        ingredients.push(ingredient.ingredient);
      }
    });
    if (!appliances.includes(recipe.appliance)) {
      appliances.push(recipe.appliance);
    }
    recipe.ustensils.forEach((ustensil) => {
      if (!ustensils.includes(ustensil)) {
        ustensils.push(ustensil);
      }
    });
  });
  ingredients.forEach((ingredient) => {
    const ingredientTag = createIngredient(ingredient);
    ingredientContainer.innerHTML += ingredientTag;
  });
  appliances.forEach((appliance) => {
    const applainceTag = createAppliance(appliance);
    applianceContainer.innerHTML += applainceTag;
  });
  ustensils.forEach((ustensil) => {
    const ustensilTag = createUstensils(ustensil);
    ustensilContainer.innerHTML += ustensilTag;
  });
};

searchInput.addEventListener("input", () => {
  search();
});

const search = () => {
  const searchValue = searchInput.value.toLowerCase();

  if (searchValue.length > 2) {
    result = recipes.filter((recipe) => {
      const titleMatch = recipe.name.toLowerCase().includes(searchValue);
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchValue)
      );
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(searchValue);
      return titleMatch || ingredientsMatch || descriptionMatch;
    });
    displayCard(result);
    nbRecipes.innerHTML =
      result.length > 1
        ? `${result.length} recettes`
        : `0${result.length} recette`;
  } else {
    displayCard(recipes);
    nbRecipes.innerHTML =
      totalRecipes > 1
        ? `${totalRecipes} recettes`
        : `0${totalRecipes} recette`;
  }
};

const main = () => {
  try {
    displayCard(recipes);
    displayTags(recipes);
  } catch (error) {
    console.error("Une erreur est survenue :", error);
  }
};

main();
