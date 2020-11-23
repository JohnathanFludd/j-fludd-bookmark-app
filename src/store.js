// import $ from 'jquery';
import api from './api.js';
import templates from './templates.js';

let template, bookmark, _bookMarkList, idBookmark, postBody;   

function render(type) 
{
    if(type == 'list-bookmark')
        template = templates.bookmarkListSection();
    else if(type == 'add-bookmark')
        template = templates.addBookmarkSection();
    $('main').html('<div class="App">'+ template +'</div>');
}

function getBookmarksList(filter = false, rating = false) {
    api.fetchApi(api.targetURL, 'GET')
    .then(bookmarks => { 
        _bookMarkList = '';
        if (bookmarks.length > 0) {
            for (const bookmark of bookmarks) {
                if (filter && bookmark.rating != rating && rating != '') continue;
                _bookMarkList += '<li data-idBookmark="' + bookmark.id + '">' + bookmark.title + '<span class="bookmark-rating">' + bookmark.rating + '  ★</span><div class="details"><p>' +
                    bookmark.rating + ' ★</p><p>' +
                    bookmark.desc + '</p><button class="deleteBookmark">Delete</button></div></li>';
            }
            $('#bookmark-list').html(_bookMarkList);
        } else
            $('#bookmark-list').html('<li>No bookmarks saved yet!</li>');
    });
}


$(function() {
    console.log("hello world")
    getBookmarksList();        

    $('main').on('click', '#add-bookmark', function() {
        render('add-bookmark');
    });

    $('main').on('click', '#cancel-bookmark', function() {
        render('list-bookmark');
        getBookmarksList();
    });

    $('main').on('submit', '#bookmark-list-form', function(e) {
        e.preventDefault();            
        bookmark = {
            url: $('#bookmark-list-entry').val(),
            title: $('#website-name').val(),
            desc: $('#website-description').val(),
            rating: $('input[name="star-rating"]:checked').val()
        };
        postBody = JSON.stringify(bookmark);
        api.createBookmarks(postBody)
        .then(resp => {
            console.log(resp);
            getBookmarksList();
        });
        render('list-bookmark');
    });

    $('main').on('click', '#bookmark-list li', function(e) {
        $(this).find('.details').toggle();
        $(this).find('.bookmark-rating').toggle();
    });
    
    $('main').on('click', '.deleteBookmark', function(e) {
        idBookmark = $(this).closest('li').attr('data-idBookmark');
        api.deleteBookmark(idBookmark)
        .then(resp => {
            console.log('Bookmark has been deleted!');
            getBookmarksList();
        });
    });

    $('main').on('change', '#filter', function() {
        getBookmarksList(true, $(this).val());
    });
});
