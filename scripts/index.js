// import $ from 'jquery';
import store from './store.js';
import api from './api.js';
import bookmark from './bookmark.js';

function main() {
  api.getBookmarks()

  .then(response => {
    response.forEach(bookmark => store.addBookmarkToStore(bookmark)
    );

    bookmark.render()
  });
  bookmark.bindEventListeners();
}

$(main);