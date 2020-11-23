const targetURL = 'https://thinkful-list-api.herokuapp.com/johnathan/Bookmarks';
let args = {};

function fetchApi(url, method, body = '') 
{
    if(method == 'POST')
    {
        args = {method: method, headers: {'Content-Type': 'application/json'}, body : body};
    }
    else 
    {
        args = {method: method};
    }
    return fetch(url, args)
    .then(resp => resp.json());

}

function createBookmarks(body) {
    return fetchApi(targetURL, 'POST', body);
}

function deleteBookmark(bookmarkID)
{
    return fetchApi(targetURL +'/'+ bookmarkID, 'DELETE');   
} 

export default {
    targetURL,
    fetchApi,
    createBookmarks,
    deleteBookmark
}