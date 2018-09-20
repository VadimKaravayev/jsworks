console.log('I am ok. I am the controller.');
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

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

    //4. Search for recipes
    await state.search.getResults();

    //5. Render results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
    //console.log(state.search.result);
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

const r = new Recipe(46956);
r.getRecipe();
console.log(r);