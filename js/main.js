import { recipes } from "../data/recipes.js";

const container = document.querySelector(".container-main");
const nbRecipes = document.querySelector(".recipes-nb");
let totalRecipes = 0;

const searchInput = document.querySelector(".search-bar");
const searchIngredient = document.querySelector(".search-tags-ingredient");
const searchAppliance = document.querySelector(".search-tags-appliance");
const searchUstensil = document.querySelector(".search-tags-ustensil");
const searchTags = document.querySelectorAll(".search-tags-title");
const tagSelectedGroup = document.querySelector(".tags-selected-group");

const eraseSearchValue = document.querySelector(".erase-search-value");
const eraseIngredientValue = document.querySelector(".erase-ingredient-value");
const eraseApplianceValue = document.querySelector(".erase-appliance-value");
const eraseUstensilValue = document.querySelector(".erase-ustensil-value");

let ingredientContainer = document.querySelector(".ingredients");
let applianceContainer = document.querySelector(".appliances");
let ustensilContainer = document.querySelector(".ustensils");

let ingredients = [];
let appliances = [];
let ustensils = [];
let resultIngredients = [];
let resultAppliances = [];
let resultUstensils = [];

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
      <li class="tag ingredient">${ingredient} <img class="delete-tag" src="./img/CrossBlackBG.png" alt="Supprimer tag"></li>
    `;

  return ingredients;
};

const createAppliance = (appliance) => {
  const appliances = `
      <li class="tag applliance">${appliance} <img class="delete-tag" src="./img/CrossBlackBG.png" alt="Supprimer tag"></li>
    `;

  return appliances;
};
const createUstensils = (ustensil) => {
  const ustensils = `
      <li class="tag ustensil">${ustensil} <img class="delete-tag" src="./img/CrossBlackBG.png" alt="Supprimer tag"></li>
    `;

  return ustensils;
};

const createTagSelected = (tag) => {
  const tagSelected = `
    <li class="tag-selected">${tag} <img class="tag-cross" src="img/Cross.png" alt="Croix"></li>
  `;

  return tagSelected;
};

for (let i = 0; i < searchTags.length; i++) {
  searchTags[i].addEventListener("click", () => {
    const parentNodeChildren = searchTags[i].parentNode.childNodes;
    const childNode = parentNodeChildren[3];

    if (childNode.classList.contains("display-none")) {
      childNode.classList.remove("display-none");
      childNode.classList.add("display-flex");
    } else {
      childNode.classList.remove("display-flex");
      childNode.classList.add("display-none");
    }
  });
}

const displayCard = (recipes) => {
  container.innerHTML = "";
  if (recipes.length === 0) {
    // Afficher un message si aucun résultat n'est trouvé
    container.innerHTML = `<p class="no-result">Aucun résultat trouvé</p>`;
    nbRecipes.innerHTML = "Aucun résultat";
  } else {
    container.insertAdjacentHTML(
      "beforeend",
      recipes
        .map((recipe) => {
          return createCard(recipe);
        })
        .join(" ")
    );
    totalRecipes = recipes.length;
    const textTotalRecipes =
      totalRecipes > 1
        ? `${totalRecipes} recettes`
        : `0${totalRecipes} recette`;
    nbRecipes.innerHTML = textTotalRecipes;
  }
};

const displayTags = (recipes) => {
  ingredientContainer.innerHTML = "";
  applianceContainer.innerHTML = "";
  ustensilContainer.innerHTML = "";

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      const ingredient = recipe.ingredients[j].ingredient;
      if (!ingredients.includes(ingredient)) {
        ingredients.push(ingredient);
      }
    }
    if (!appliances.includes(recipe.appliance)) {
      appliances.push(recipe.appliance);
    }
    for (let k = 0; k < recipe.ustensils.length; k++) {
      const ustensil = recipe.ustensils[k];
      if (!ustensils.includes(ustensil)) {
        ustensils.push(ustensil);
      }
    }
  }

  // Affiche les ingrédients dans le dropdown associé
  ingredientContainer.insertAdjacentHTML(
    "beforeend",
    ingredients
      .map((ingredient) => {
        return createIngredient(ingredient);
      })
      .join(" ")
  );

  // Affiche les appareils dans le dropdown associé
  applianceContainer.insertAdjacentHTML(
    "beforeend",
    appliances
      .map((appliance) => {
        return createAppliance(appliance);
      })
      .join(" ")
  );

  // Affiche les ustensiles dans le dropdown associé
  ustensilContainer.insertAdjacentHTML(
    "beforeend",
    ustensils
      .map((ustensil) => {
        return createUstensils(ustensil);
      })
      .join(" ")
  );
};

const displayTagSelected = () => {
  const tags = document.querySelectorAll(".tag");
  let selectedTags = [];

  tagSelectedGroup.innerHTML = "";

  const handleTagClick = (event) => {
    const clickedTag = event.target.textContent.trim();
    const tagElement = event.target;
    const nextElement = tagElement.childNodes[1];
    const tagIndex = selectedTags.indexOf(clickedTag);

    // On vérifie si le tag est déjà selectionné
    if (!tagElement.classList.contains("selected")) {
      tagElement.classList.add("selected");
      nextElement.classList.add("display-flex");

      nextElement.addEventListener("click", () => {
        tagElement.classList.remove("selected");
        nextElement.classList.remove("display-flex");
      });
    }

    if (tagIndex === -1) {
      // Si le tag n'est pas déjà sélectionné, l'ajouter au tableau
      selectedTags.push(clickedTag);
    } else {
      // Si le tag est déjà sélectionné, le retirer du tableau
      selectedTags.splice(tagIndex, 1);
    }

    tagSelectedGroup.insertAdjacentHTML(
      "beforeend",
      createTagSelected(clickedTag)
    );

    let filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const lowerCaseSelectedTag = clickedTag.toLowerCase();
      const recipeIngredients = [];
      const recipeUstensils = [];

      for (let j = 0; j < recipe.ingredients.length; j++) {
        recipeIngredients.push(recipe.ingredients[j].ingredient.toLowerCase());
      }

      for (let k = 0; k < recipe.ustensils.length; k++) {
        recipeUstensils.push(recipe.ustensils[k].toLowerCase());
      }

      if (
        recipeIngredients.includes(lowerCaseSelectedTag) ||
        recipeUstensils.includes(lowerCaseSelectedTag) ||
        recipe.appliance.toLowerCase() === lowerCaseSelectedTag
      ) {
        filteredRecipes.push(recipe);
      }
    }

    container.innerHTML = "";

    totalRecipes = filteredRecipes.length;
    const textTotalRecipes =
      totalRecipes > 1
        ? `${totalRecipes} recettes`
        : `0${totalRecipes} recette`;
    nbRecipes.innerHTML = textTotalRecipes;

    // Ajouter les nouvelles recettes à la suite du contenu existant
    for (let i = 0; i < filteredRecipes.length; i++) {
      container.insertAdjacentHTML("beforeend", createCard(filteredRecipes[i]));
    }
  };

  for (let i = 0; i < tags.length; i++) {
    tags[i].addEventListener("click", handleTagClick);
  }
};

// Supprime le tag en cliquant sur la croix
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("tag-cross")) {
    const tagToRemove = event.target.closest(".tag-selected");
    if (tagToRemove) {
      tagToRemove.remove();

      // Mettre à jour les tags restants
      const tagSelectedElements = document.querySelectorAll(".tag-selected");
      const remainingTags = [];
      for (let i = 0; i < tagSelectedElements.length; i++) {
        remainingTags.push(tagSelectedElements[i].textContent.trim());
      }

      // Filtrer les recettes en fonction des tags restants ou afficher toutes les recettes
      const filteredRecipes =
        remainingTags.length > 0
          ? recipes.filter((recipe) => {
              return remainingTags.every((selectedTag) => {
                const lowerCaseSelectedTag = selectedTag.toLowerCase();
                const recipeIngredients = recipe.ingredients.map((ingredient) =>
                  ingredient.ingredient.toLowerCase()
                );
                const recipeUstensils = recipe.ustensils.map((ustensil) =>
                  ustensil.toLowerCase()
                );

                return (
                  recipeIngredients.includes(lowerCaseSelectedTag) ||
                  recipeUstensils.includes(lowerCaseSelectedTag) ||
                  recipe.appliance.toLowerCase() === lowerCaseSelectedTag
                );
              });
            })
          : recipes;

      container.innerHTML = "";

      const totalRecipes = filteredRecipes.length;
      const textTotalRecipes =
        totalRecipes > 1
          ? `${totalRecipes} recettes`
          : `0${totalRecipes} recette`;
      nbRecipes.innerHTML = textTotalRecipes;

      // Afficher les nouvelles recettes
      for (let i = 0; i < filteredRecipes.length; i++) {
        container.insertAdjacentHTML(
          "beforeend",
          createCard(filteredRecipes[i])
        );
      }
    }
  }
});

searchInput.addEventListener("input", () => {
  search();
});

const search = () => {
  const searchValue = searchInput.value.toLowerCase().trim();
  const result = [];

  if (searchValue.length > 2) {
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      const titleMatch = recipe.name.toLowerCase().includes(searchValue);
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchValue)
      );
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(searchValue);

      if (titleMatch || ingredientsMatch || descriptionMatch) {
        result.push(recipe);
      }
    }
    displayCard(result);
    nbRecipes.innerHTML =
      result.length > 1
        ? `${result.length} recettes`
        : `0${result.length} recette`;
    displayTags(result);
  } else {
    displayCard(recipes);
    nbRecipes.innerHTML =
      totalRecipes > 1
        ? `${totalRecipes} recettes`
        : `0${totalRecipes} recette`;
    displayTags(recipes);
  }
};

searchIngredient.addEventListener("input", () => {
  searchTagIngredient();
});

const searchTagIngredient = () => {
  ingredientContainer.innerHTML = "";
  resultIngredients = [];

  const searchValue = searchIngredient.value.toLowerCase().trim();

  if (searchValue.length >= 1) {
    eraseIngredientValue.classList.add("display-flex");
  } else {
    eraseIngredientValue.classList.remove("display-flex");
  }

  for (let i = 0; i < ingredients.length; i++) {
    const ingredient = ingredients[i];
    const ingredientMatch = ingredient.toLowerCase().includes(searchValue);

    if (ingredientMatch) {
      resultIngredients.push(ingredient);
    }
  }
  console.log(resultIngredients);

  for (let i = 0; i < resultIngredients.length; i++) {
    ingredientContainer.insertAdjacentHTML(
      "beforeend",
      createIngredient(resultIngredients[i])
    );
  }

  displayTagSelected();
};

searchAppliance.addEventListener("input", () => {
  searchTagAppliance();
});

const searchTagAppliance = () => {
  applianceContainer.innerHTML = "";
  const searchValue = searchAppliance.value.toLowerCase().trim();

  if (searchValue.length >= 1) {
    eraseApplianceValue.classList.add("display-flex");
  } else {
    eraseApplianceValue.classList.remove("display-flex");
  }

  let resultAppliances = [];

  for (let i = 0; i < appliances.length; i++) {
    const appliance = appliances[i];
    const applianceMatch = appliance.toLowerCase().includes(searchValue);

    if (applianceMatch) {
      resultAppliances.push(appliance);
    }
  }

  for (let i = 0; i < resultAppliances.length; i++) {
    applianceContainer.insertAdjacentHTML(
      "beforeend",
      createIngredient(resultAppliances[i])
    );
  }

  displayTagSelected();
};

searchUstensil.addEventListener("input", () => {
  searchTagUstensil();
});

const searchTagUstensil = () => {
  ustensilContainer.innerHTML = "";
  const searchValue = searchUstensil.value.toLowerCase().trim();

  if (searchValue.length >= 1) {
    eraseUstensilValue.classList.add("display-flex");
  } else {
    eraseUstensilValue.classList.remove("display-flex");
  }

  let resultUstensils = [];

  for (let i = 0; i < ustensils.length; i++) {
    const ustensil = ustensils[i];
    const ustensilMatch = ustensil.toLowerCase().includes(searchValue);

    if (ustensilMatch) {
      resultUstensils.push(ustensil);
    }
  }

  for (let i = 0; i < resultUstensils.length; i++) {
    ustensilContainer.insertAdjacentHTML(
      "beforeend",
      createIngredient(resultUstensils[i])
    );
  }

  displayTagSelected();
};

eraseSearchValue.addEventListener("click", () => {
  searchInput.value = "";
});

eraseIngredientValue.addEventListener("click", () => {
  searchIngredient.value = "";
  displayTags(recipes);
  eraseIngredientValue.classList.remove("display-flex");
});

eraseApplianceValue.addEventListener("click", () => {
  searchAppliance.value = "";
  displayTags(recipes);
  eraseApplianceValue.classList.remove("display-flex");
});

eraseUstensilValue.addEventListener("click", () => {
  searchUstensil.value = "";
  displayTags(recipes);
  eraseUstensilValue.classList.remove("display-flex");
});

const main = () => {
  try {
    displayCard(recipes);
    displayTags(recipes);
    displayTagSelected();
  } catch (error) {
    console.error("Une erreur est survenue :", error);
  }
};

main();
