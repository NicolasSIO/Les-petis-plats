import { recipes } from "../data/recipes.js";
import { createCard } from "./card.js";

const title = document.querySelector(".title");
const nbRecipes = document.querySelector(".recipes-nb");
let totalRecipes = 0;

const searchTags = document.querySelectorAll(".search-tags-title");

searchTags.forEach((el) => {
  el.addEventListener("click", () => {
    console.log(el);
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

const main = () => {
  try {
    displayCard(recipes);
  } catch (error) {
    console.error("Une erreur est survenue :", error);
  }
};

main();
