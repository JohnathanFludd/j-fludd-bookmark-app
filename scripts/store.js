let bookmarks = [];
let filter = 0;

function addBookmarkToStore(newEntry) {
    bookmarks.push(Object.assign(newEntry))
}

function findBookmarkId(id) {
    let thisObject = bookmarks.find(bookmark => bookmark.id === id);
    return thisObject;
}

function removeBookmarkFromStore(id) {
    let index = -1;
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].id == id) 
        index = i;
    }
    bookmarks.splice(index, 1);
}

function setError(value) {
    this.error = value;
}

export default {
    bookmarks,
    filter,
    addBookmarkToStore,
    findBookmarkId,
    removeBookmarkFromStore,
    setError
}

