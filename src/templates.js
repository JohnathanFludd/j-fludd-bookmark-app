function bookmarkListSection()
{
    return `<div id="bookmark-list-section">
        <button id="add-bookmark" type="button">New</button>
        <label for="filter" class="Filter-By">Filter By</label>
        <select id="filter" name="fonts">
            <option value="">All</option>
            <option value="1">1 Star</option>
            <option value="2">2 Star</option>
            <option value="3">3 Star</option>
            <option value="4">4 Star</option>
            <option value="5">5 Star</option>
        </select>

        <ul id="bookmark-list" class=""> </ul>
    </div>`
}

function addBookmarkSection() 
{
    return `<div id="add-bookmark-section">
        <form id="bookmark-list-form">
            <div class="form-group">
                <label for="bookmark-list-entry">Add a website</label>
                <input type="url" id="bookmark-list-entry" class="js-bookmark-list-entry" placeholder="e.g., www.google.com" required />
            </div>
            <div class="form-group">
                <label for="website-name">Website Name:</label>
                <input id="website-name" type="text" required />
            </div>
            <p>Star Rating:</p>
            <p>
            <input id="star-rating-1" name="star-rating" type="radio" value="1" required />
            <label for="star-rating-1">1 ★</label>

            <input id="star-rating-2" name="star-rating" type="radio" value="2" required />
            <label for="star-rating-2">2 ★</label>

            <input id="star-rating-3" name="star-rating" type="radio" value="3" required />
            <label for="star-rating-3">3 ★</label>

            <input id="star-rating-4" name="star-rating" type="radio" value="4" required />
            <label for="star-rating-4">4 ★</label>

            <input id="star-rating-5" name="star-rating" type="radio" value="5" required />
            <label for="star-rating-5">5 ★</label>            

            </p>

            <div class="form-group">
                <label for="website-description">Website Description:</label>
                <textarea id="website-description" rows="5"></textarea>
            </div>
            <div class="form-group">
                <input type="submit" id="submit-bookmark" value="submit" />
                <input type="button" id="cancel-bookmark" value="cancel" />
            </div>
        </form>
    </div>`;
}

export default {
    bookmarkListSection,
    addBookmarkSection
}
