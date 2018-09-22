console.log('I am ok. I am the controller.');
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
* - Search object
* - current recipe object
* - shopping list object
* - liked recipes object
*/

/**
 * SEARCH CONTROLLER
*/
const state = {};
const controlSearch = async () => {
  //1. Get query from view
  const query = searchView.getInput();
  console.log(query);
  if (query) {
    //2. New search object and add to state
    state.search = new Search(query);

    //3. Prepare results for UI
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      //4. Search for recipes
      await state.search.getResults();

      //5. Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
      //console.log(state.search.result);  
    } catch(error) {
      alert('Something wrong with with Search');
      clearLoader();
    }
    
  }
};

elements.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
    console.log(goToPage);
  }
});


/**
 * RECIPE CONTROLLER
*/

const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');
  console.log(id);
  if (id) {
    //Prepare UI for changes
    recipeView.renderRecipe();
    renderLoader(elements.recipe);
    if (state.search) searchView.highlightSelected(id);

    //Create new recipe object
    state.recipe = new Recipe(id);
    //Get recipe data
    try {
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      //Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      //Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
      console.log(state.recipe);

    } catch(error) {
      console.log('Error processing recipe');
    }
    
  }
};

//window.addEventListener('hashchange', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));