const searchInput = document.getElementById('searchData');
const displayBox = document.getElementById('displayBox');

const searchButton = () => {
    const url = `http://openlibrary.org/search.json?q=${searchInput.value}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayData(data.docs))
}
const displayData = (books) => {
    books.forEach(book => {
        console.log(book);
        const div = document.createElement("div");
        div.classList.add("book");
        div.innerHTML = `  
         <div class="row border mb-3">
                <div class="col-md-4">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="img-fluid rounded-start"
                        alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Author: ${book.author_name[0]}</p>
                        <p class="card-text">${book.first_publish_year}</p>
                    </div>
                </div>
            </div>
        `;
        displayBox.appendChild(div);

    })
}
