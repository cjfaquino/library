let myLibrary = [];

class Book {
  constructor(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }
}

const submit = document.getElementById("submit");
submit.addEventListener("click", addBookToLibrary);
submit.addEventListener("click", displayLibrary);

function addBookToLibrary(e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const haveRead = document.getElementById("haveRead").checked;
  const newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
  e.preventDefault();
  console.log(myLibrary);
}

// test data
for (let i = 1; i < 6; i++) {
  const randomNumber = Math.floor(Math.random() * 9999);
  const newBook = new Book(
    `test${i}`,
    `test${i}`,
    randomNumber,
    Math.random() < 0.5
  );
  myLibrary.push(newBook);
}
console.log(myLibrary);

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function updateRead(index, event) {
  myLibrary[index].haveRead = event.target.checked;
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  displayLibrary();
}

function displayLibrary() {
  const library = document.getElementById("library");
  removeAllChildNodes(library);

  for (let i = 0; i < myLibrary.length; i++) {
    const card = document.createElement("div");
    const content = document.createElement('div');
    card.classList.add("card");

    const cardImage = document.createElement('img');
    const cardTitle = document.createElement("div");
    const cardAuthor = document.createElement("div");
    const cardPages = document.createElement("div");
    const cardHaveRead = document.createElement("input");
    const cardHaveReadLabel = document.createElement("p");
    const deleteBtn = document.createElement('button');

    card.appendChild(cardImage);
    card.appendChild(content).classList.add('cardContent');
    content.appendChild(cardTitle).classList.add("cardTitle");
    content.appendChild(cardAuthor).classList.add("cardAuthor");
    content.appendChild(cardPages).classList.add("cardPages");
    content.appendChild(cardHaveReadLabel).classList.add("cardHaveReadLabel");
    content.appendChild(cardHaveRead).classList.add("cardHaveRead");
    content.appendChild(deleteBtn).classList.add('deleteBtn')
    cardHaveRead.type = "checkbox";
    
    cardImage.src = `https://picsum.photos/165/265?random=${i}`;
    cardHaveReadLabel.textContent = "Read: ";
    cardTitle.textContent = "Title: " + myLibrary[i].title;
    cardAuthor.textContent = "Author: " + myLibrary[i].author;
    cardPages.textContent = myLibrary[i].pages + " pages";
    cardHaveRead.checked = myLibrary[i].haveRead;
    deleteBtn.textContent = 'Delete'

    cardHaveRead.addEventListener('click', updateRead.bind(null, i))
    deleteBtn.addEventListener('click', deleteBook.bind(null, i))
    
    card.dataset.book = i;
    library.appendChild(card);
  }
}

displayLibrary();
