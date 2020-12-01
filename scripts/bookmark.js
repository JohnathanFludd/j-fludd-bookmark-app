// import $ from 'jquery';

import api from './api.js'
import store from './store.js'

function render() {
    let view = ``;
    view += `${submitFormUI()}${bookmarkListUI()}${filterUI()}`
    $('main').html(view);
}

//--------------------HTML INTERFACES BELOW------------------------------------------

function bookmarkListUI() {
    const list = store.bookmarks.filter(item => item.rating >= store.filter);
    const itemsUI = list.map((bookmark) => {
    return `
    <form class="bookmark-list-section">
    <div class='item' data-item-id='${bookmark.id}'>

        <span class='title-name'>${bookmark.title} ${bookmark.rating}</span>

        <div class='item-details hidden'>
            <span><a href='${bookmark.url}'>Visit</a></span>
            <span>${bookmark.desc || ''}</span>
            <input type="submit" value="Delete" name="delete"></input>
        </div>

        
    </div>
    </form>
    `;
});

    return `
    <div class="list">
        ${itemsUI.join(' ')}
    </div>
    `;

}

function filterUI() {
    return `
    <label for="filter" class="filter-by">Filter By:</label>
        <select id="filter" name="fonts">
            <option ${store.filter === 0 ? 'selected' : ''} value=0>All</option>
            <option ${store.filter === 1 ? 'selected' : ''} value=1>1 ★</option>
            <option ${store.filter === 2 ? 'selected' : ''} value=2>2 ★</option>
            <option ${store.filter === 3 ? 'selected' : ''} value=3>3 ★</option>
            <option ${store.filter === 4 ? 'selected' : ''} value=4>4 ★</option>
            <option ${store.filter === 5 ? 'selected' : ''} value=5>5 ★</option>
        </select>
    `;
}

{/* 
    THIS WAS STOPPING THE SUBMIT FORM FROM SHOWING UP
<div className="App"></div></div>
<div className="container-1"></div>
<div id="add-bookmark-section"></div> 

IN SUBMIT FORM, CHANGED THIS TO A DROPDOWN TO KEEP THINGS CONSISTENT
<input id="star-rating-1" name="star-rating" type="radio" value="1" required />
<label htmlFor="star-rating-1">1 ★</label>

<input id="star-rating-2" name="star-rating" type="radio" value="2" required />
<label htmlFor="star-rating-2">2 ★</label>

<input id="star-rating-3" name="star-rating" type="radio" value="3" required />
<label htmlFor="star-rating-3">3 ★</label>

<input id="star-rating-4" name="star-rating" type="radio" value="4" required />
<label htmlFor="star-rating-4">4 ★</label>

<input id="star-rating-5" name="star-rating" type="radio" value="5" required />
<label htmlFor="star-rating-5">5 ★</label>

*/}


function submitFormUI() {
    return `
    <form id="bookmark-list-form">

        <div>
            <label for="bookmark-list-entry">Add a website</label>
            <input type="text" id="url" name="url" class="js-url" placeholder="e.g., www.google.com" required />
        </div>

        <div>
            <label for="website-name">Website Name:</label>
            <input id="website-name" type="text" name="title" required />
        </div>

        <label for="rating">Rating</label>
            <select id="rating" name="rating">
                <option value=1>1 ★</option>
                <option value=2>2 ★</option>
                <option value=3>3 ★</option>
                <option value=4>4 ★</option>
                <option value=5>5 ★</option>
            </select>

        <div>
            <label for="description">Website Description:</label>
            <textarea name="desc" id="description" rows="3"></textarea>
        </div>

        <input type="submit" id="submit-bookmark" value="Add Bookmark" />
        <input type="button" id="cancel-bookmark" value="Cancel" />
    </form>
    `;
}

//------------------EVENT HANDLERS BELOW------------------------------------

function handleAddBookmark() {
    $('main').on('submit', '#bookmark-list-form', function(event) {
        event.preventDefault();


        let jsonObj = $(event.target).serializeJson();

        api.createBookmarks(jsonObj)
            .then(newBookmark => {
            store.addBookmarkToStore(newBookmark);
            render();
            });
    });
}

function handleBookmarkDelete() {
    $('main').on('submit', '.bookmark-list-section', (event) => {
    event.preventDefault();
  
    let bookmarkID = $(event.target).find('.item').data('item-id');
  
    api.deleteBookmark(bookmarkID)
        .then(() => {
        store.removeBookmarkFromStore(bookmarkID)
        render()
      })
    })
};

function handleFilterChange() {

    $('main').on('change', '#filter', (event) =>{

        store.filter = Number($('#filter').val())
        render()
    })
}



function handleShowDetails() {

    $('main').on('click','.title-name', (event) => {

        $(event.currentTarget).parent().find('.item-details')
       .toggleClass('hidden')
    })
}


// $(function() {
//     getBookmarksList();        

//     $('#cancel-bookmark').click(function() {
//         $('#bookmark-list-section').show();
//         $('#add-bookmark-section').hide();
//         $('#bookmark-list-form').trigger('reset');
//         $('#filter').val('').trigger('change');
//     });

//     $('#bookmark-list-form').submit(function(e) {
//         e.preventDefault();            
//         bookmark = {
//             url: $('#bookmark-list-entry').val(),
//             title: $('#website-name').val(),
//             desc: $('#description').val(),
//             rating: $('input[name="star-rating"]:checked').val()
//         };
//         postBody = JSON.stringify(bookmark);
//         createBookmarks(postBody);
//         $('#bookmark-list-section').show();
//         $('#add-bookmark-section').hide();            
//     });

//     $('#bookmark-list').on('click', 'li', function(e) {
//         $(e.target).find('.details').show();
//         $(e.target).find('.bookmark-rating').hide();
//     });
    
//     $('#bookmark-list').on('click', '.deleteBookmark', function(e) {
//         idBookmark = $(e.target).closest('li').attr('data-idBookmark');
//         deleteBookmark(idBookmark);
//     });

//     $('#filter').change(function() {
//         getBookmarksList(true, $(this).val());
//     });
// });



//NOT SURE WHAT THIS DOES BUT ITS NEEDED TO FUNCTION LOL
$.fn.extend({ serializeJson: function() { 
    const formData = new FormData(this[0]); 
    const o = {}; 
    formData.forEach((val, name) => o[name] = val); 
    return JSON.stringify(o); } 
});



function bindEventListeners() {
    handleAddBookmark();
    handleBookmarkDelete();
    handleFilterChange();
    handleShowDetails();
}

export default {
    bindEventListeners,
    render
}