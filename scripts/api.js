const targetURL = 'https://thinkful-list-api.herokuapp.com/johnathan/Bookmarks';
  
function apiFetch(...args) {
    return fetch(...args)
        .then(response => {
            return response.json();
        })
}

function getBookmarks() {
    return apiFetch(`${targetURL}`)
} 

function createBookmarks(newBookmark) {
    console.log(newBookmark)
    return apiFetch(`${targetURL}`,
    {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: newBookmark,
    })
}

function deleteBookmark(id) {
    return apiFetch(`${targetURL}/${id}`,
    {
        method: 'DELETE',
    })
}

export default {
    getBookmarks,
    createBookmarks,
    deleteBookmark
}