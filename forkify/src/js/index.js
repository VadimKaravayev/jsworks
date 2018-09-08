console.log('I am ok. I am the controller.');
import str from './models/Search';
import * as view from './views/searchView';
console.log(`Data from Search.js: ${str}, 4 + 8 = ${view.add(4, 8)}, 5 * 23 = ${view.multiply(5, 23)}`);
console.log(`My id: ${view.id}`);
