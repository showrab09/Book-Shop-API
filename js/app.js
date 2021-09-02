const searchInput = document.getElementById('searchData');
const displayBox = document.getElementById('displayBox');
const resultBox = document.getElementById('result-box');
//loading the api data
const searchButton = () => {
    //empty search box error handling
    if (searchInput.value === '') {
        alert('Please enter a Valid Book name');
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchInput.value}`
        fetch(url)
            .then(response => response.json())
            .then(data => displayData(data))
    }
};
const displayData = (books) => {
    //removing the previous data
    searchInput.value = '';
    displayBox.innerHTML = '';
    resultBox.innerHTML = '';
    //counting the number of books
    let count = 0;
    books.docs.forEach(book => {
        //checking if the exact named book is present or not
        if (book.has_fulltext === true) {
            //skipping the undefined data 
            if (typeof (book.publisher) === 'undefined' || typeof (book.author_name) === 'undefined') {
                console.log('no publisher');
            } else {
                count++;
                //Sizing the loaded data
                const author = book.author_name.splice(0, 1);
                const title = book.title.slice(0, 20);
                const firstPublish = book.first_publish_year;
                const publisher = book.publisher.splice(0, 1);
                const div = document.createElement("div");
                div.classList.add("book");
                div.innerHTML = `
         <div class="row  my-2 mx-1  rounded-3">
                <div class="col-md-4 my-auto">
                    <img  width="120px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class=" rounded-start  " alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title">${title}</h4>
                        <p class="card-text"><b>Author:</b> ${author}</p>
                        <p class="card-text"><b>First publish:</b> ${firstPublish}</p>
                        <p class="card-text"><b>Publisher:</b> ${publisher}</p>
                    </div>
                </div>
            </div>
        `;
                displayBox.appendChild(div);
            }
        }
    })
    // finding the total result.. here I used numFound value and Count value. 
    const div2 = document.createElement("div");
    div2.innerHTML = ` <h4 class="text-success">${books.numFound} results found, ${count}  displaying</h4>`;
    resultBox.appendChild(div2);
    if (count === 0) {
        alert('No book found in this name');
    }
}
