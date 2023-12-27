import { recipes } from "../data/recipes.js";

const container = document.querySelector(".container-main");
const nbRecipes = document.querySelector(".recipes-nb");
let totalRecipes = 0;

const searchInput = document.querySelector(".search-bar");
const searchTags = document.querySelectorAll(".search-tags-title");
const tagSelectedGroup = document.querySelector(".tags-selected-group");

let ingredients = [];
let appliances = [];
let ustensils = [];
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

const createTagSelected = (tag) => {
  const tagSelected = `
    <li class="tag-selected">${tag} <img class="tag-cross" src="img/Cross.png" alt="Croix"></li>
  `;

  return tagSelected;
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
  let ingredientContainer = document.querySelector(".ingredients");
  let applianceContainer = document.querySelector(".appliances");
  let ustensilContainer = document.querySelector(".ustensils");
  ingredientContainer.innerHTML = "";
  applianceContainer.innerHTML = "";
  ustensilContainer.innerHTML = "";

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
  ingredientContainer.insertAdjacentHTML(
    "beforeend",
    ingredients
      .map((ingredient) => {
        return createIngredient(ingredient);
      })
      .join(" ")
  );
  applianceContainer.insertAdjacentHTML(
    "beforeend",
    appliances
      .map((appliance) => {
        return createAppliance(appliance);
      })
      .join(" ")
  );
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
    const tagIndex = selectedTags.indexOf(clickedTag);

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

    const filteredRecipes = recipes.filter((recipe) => {
      return selectedTags.every((selectedTag) => {
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
    });

    container.innerHTML = "";

    totalRecipes = filteredRecipes.length;
    const textTotalRecipes =
      totalRecipes > 1
        ? `${totalRecipes} recettes`
        : `0${totalRecipes} recette`;
    nbRecipes.innerHTML = textTotalRecipes;

    // Ajouter les nouvelles recettes à la suite du contenu existant
    container.insertAdjacentHTML(
      "beforeend",
      filteredRecipes.map((recipe) => createCard(recipe)).join("")
    );
  };

  tags.forEach((tag) => {
    tag.addEventListener("click", handleTagClick);
  });
};

// Supprime le tag en cliquant sur la croix
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("tag-cross")) {
    const tagToRemove = event.target.closest(".tag-selected");
    if (tagToRemove) {
      tagToRemove.remove();

      // Mettre à jour les tags restants
      const remainingTags = Array.from(
        document.querySelectorAll(".tag-selected")
      ).map((tag) => tag.textContent.trim());

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
      container.insertAdjacentHTML(
        "beforeend",
        filteredRecipes.map((recipe) => createCard(recipe)).join("")
      );
    }
  }
});

searchInput.addEventListener("input", () => {
  search();
});

const search = () => {
  const searchValue = searchInput.value.toLowerCase().trim();

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
