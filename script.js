let myLibrary = [];

class Book {
    constructor(title, author, pages, haveRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
    }
}

const submit = document.getElementById('submit')
submit.addEventListener('click', addBookToLibrary)

function addBookToLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById("pages").value;
    const haveRead = document.getElementById("haveRead").checked;
    const newBook = new Book(title, author, pages, haveRead);
    myLibrary.push(newBook);
    console.log(myLibrary);
}


// test data
for (let i = 1; i < 6; i++) {
    const randomNumber = Math.floor(Math.random() * 9999)
    const newBook = new Book(`test${i}`, `test${i}`, randomNumber, Math.random() < 0.5);
    myLibrary.push(newBook)
}
console.log(myLibrary);

for (let i = 0; i < myLibrary.length; i++) {
    const library = document.getElementById("library");
    const card = document.createElement("div");
    card.classList.add("card");

    const cardTitle = document.createElement("div");
    const cardAuthor = document.createElement("div");
    const cardPages = document.createElement("div");
    const cardHaveRead = document.createElement("div");
    card.appendChild(cardTitle).classList.add('cardTitle');
    card.appendChild(cardAuthor).classList.add("cardAuthor");
    card.appendChild(cardPages).classList.add("cardPages");
    card.appendChild(cardHaveRead).classList.add("cardHaveRead");

    cardTitle.textContent = myLibrary[i].title;
    cardAuthor.textContent = myLibrary[i].author;
    cardPages.textContent = myLibrary[i].pages;
    cardHaveRead.textContent = myLibrary[i].haveRead;

    card.dataset.book = i;
    library.appendChild(card);
}