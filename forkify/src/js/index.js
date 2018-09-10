console.log('I am ok. I am the controller.');
import Search from './models/Search';

/** Global state of the app
* - Search object
* - current recipe object
* - shopping list object
* - liked recipes object
*/
const state = {};
const controlSearch = async () => {
  //1. Get query from view
  const query = 'pizza';
  if (query) {
    //2. New search object and add to state
    state.search = new Search(query);

    //3. Prepare results for UI

    //4. Search for recipes
    await state.search.getResults();

    //5. Render results on UI
    console.log(state.search.result);
  }
}

document.querySelector('.search').addEventListener('submit', e => {
  e.preventDefault();
  controlSearch();
});
