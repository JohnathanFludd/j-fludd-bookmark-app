// import $ from 'jquery';
import api from './api.js';
import templates from './templates.js';
  
function render(bookmarkListSection)
{
    let template
    if(bookmarkListSection == 'list-bookmark')
        template = templates.bookmarkListSection();
    else if(bookmarkListSection == 'add-bookmark')
        template = templates.addBookmarkSection();
    $('main').html('<div class="App">'+ template +'</div>');
}

function getBookmarksList(filter, rating) {
    console.log(filter,rating)
    api.fetchApi(api.targetURL, 'GET')
    .then(bookmarks => { 
        $('#bookmark-list').html(templates.bookmarksList(bookmarks,filter,rating))    
    });
}


$(function() {
   // console.log("hello world")
    getBookmarksList(true, Number($(this).val()));        

    $('main').on('click', '#add-bookmark', function() {
        render('add-bookmark');
    });

    $('main').on('click', '#cancel-bookmark', function() {
        render('list-bookmark');
        getBookmarksList(true, Number($(this).val()));
    });

    $('main').on('submit', '#bookmark-list-form', function(e) {
        e.preventDefault();            
        let bookmark = {
            url: $('#bookmark-list-entry').val(),
            title: $('#website-name').val(),
            desc: $('#website-description').val(),
            rating: $('input[name="star-rating"]:checked').val()
        };
       let postBody = JSON.stringify(bookmark);
        api.createBookmarks(postBody)
        .then(resp => {
            console.log(resp);
            getBookmarksList(true, Number($(this).val()));
        });
        render('list-bookmark');
    });

    $('main').on('click', '#bookmark-list li', function(e) {
        $(this).find('.details').toggle();
        $(this).find('.bookmark-rating').toggle();
    });
    
    $('main').on('click', '.deleteBookmark', function(e) {
        let idBookmark = $(this).closest('li').attr('data-idBookmark');
        api.deleteBookmark(idBookmark)
        .then(resp => {
            console.log('Bookmark has been deleted!');
            getBookmarksList();
        });
    });

    $('main').on('change', '#filter', function() {
        getBookmarksList(true, $(this).val()); ///////// dont change this works!
    });
});
