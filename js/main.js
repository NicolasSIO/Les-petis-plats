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
let result = [];
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
            ingredient.unit ? ingredient.unit : " "
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

// affiche les dropdowns des filtres
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
    // Ajoute les card dans l'élément
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

    // On récupère les recettes contennant les tags séléctionnés
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
    eraseSearchValue.classList.add("display-flex");
    // On ajouté dans les results les recettes qui correspondent à la valeur de l'input
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
    displayTagSelected();
  } else {
    eraseSearchValue.classList.remove("display-flex");
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
  const searchValue = searchIngredient.value.toLowerCase().trim();
  if (searchValue.length >= 1) {
    eraseIngredientValue.classList.add("display-flex");
  } else {
    eraseIngredientValue.classList.remove("display-flex");
  }
  resultIngredients = ingredients.filter((ingredient) => {
    const ingredientMatch = ingredient.toLowerCase().includes(searchValue);
    return ingredientMatch;
  });
  ingredientContainer.insertAdjacentHTML(
    "beforeend",
    resultIngredients
      .map((ingredient) => {
        return createIngredient(ingredient);
      })
      .join(" ")
  );
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
  resultAppliances = appliances.filter((appliance) => {
    const applianceMatch = appliance.toLowerCase().includes(searchValue);
    return applianceMatch;
  });
  applianceContainer.insertAdjacentHTML(
    "beforeend",
    resultAppliances
      .map((appliance) => {
        return createAppliance(appliance);
      })
      .join(" ")
  );
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
  resultUstensils = ustensils.filter((ustensil) => {
    const ustensilMatch = ustensil.toLowerCase().includes(searchValue);
    return ustensilMatch;
  });
  ustensilContainer.insertAdjacentHTML(
    "beforeend",
    resultUstensils
      .map((ustensil) => {
        return createUstensils(ustensil);
      })
      .join(" ")
  );
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
