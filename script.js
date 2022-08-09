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