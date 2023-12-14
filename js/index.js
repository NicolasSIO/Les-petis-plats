import { recipes } from "../data/recipes.js";
import { createCard } from "./card.js";
import { createAppliance, createIngredient, createUstensils } from "./tag.js";

const title = document.querySelector(".title");
const nbRecipes = document.querySelector(".recipes-nb");
let totalRecipes = 0;

const searchTags = document.querySelectorAll(".search-tags-title");

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
  const main = document.querySelector(".container-main");

  recipes.forEach((recipe) => {
    const recipeCard = createCard(recipe);

    totalRecipes += 1;
    const textTotalRecipes =
      totalRecipes > 1
        ? `${totalRecipes} recettes`
        : `0${totalRecipes} recette`;

    nbRecipes.innerHTML = textTotalRecipes;
    title.innerHTML = `Cherchez parmi plus de ${totalRecipes} recettes <br/>du quotidien, simples et délicieuses`;
    main.innerHTML += recipeCard;
  });
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
    console.log(ustensil);
    ustensilContainer.innerHTML += ustensilTag;
  });
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
