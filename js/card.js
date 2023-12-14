export const createCard = (recipe) => {
  const card = `
      <div class="card">
        <div class="card-header">
          <img class="card-header-img" src="./img/recipes/${
            recipe.image
          }" alt="${recipe.name}">
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
              ${recipe.ingredients
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
                .join("")}
            </div>
          </div>
        </div>
      </div>
    `;

  return card;
};
