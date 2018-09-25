console.log('I am ok. I am the controller.');
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
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
  }
});


/**
 * RECIPE CONTROLLER
*/

const controlRecipe = async () => {
  const id = window.location.hash.replace('#', '');
  if (id) {
    //Prepare UI for changes
    recipeView.clearRecipe();
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

    } catch(error) {
      console.log(error);
      console.log('Error processing recipe');
      clearLoader();
    }
    
  }
};

//window.addEventListener('hashchange', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * LIST CONTROLLER
*/

const controlList = () => {
  if (!state.list) state.list = new List();

  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

/**
 * LIKE CONTROLLER
*/

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id; 
  if (!state.likes.isLiked(currentID)) {
    const newLike = state.likes.addLike(
      currentID, 
      state.recipe.title, 
      state.recipe.author, 
      state.recipe.img);
    console.log(state.likes);
  } else {
    state.likes.deleteLike(currentID);
    console.log(state.likes);
  }
};

// handle delete and update list item event
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
    
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    controlLike();
  }
});

