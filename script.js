let myLibrary = [];

class Book {
  constructor(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
  }
}

// test data
const testTitles = [
  "A book of books",
  "THE Book",
  "Just Another Book",
  "Not Your Average Book",
  "Not a Book",
  "That Book",
  "This Book",
];
const testAuthors = [
  "Author",
  "Another Author",
  "That Author",
  "This Author",
  "Plenty of Authors",
  "Not an Author",
  "No Author",
];

function test() {
  for (let i = 1; i < 7; i++) {
    const randomNumber = Math.floor(Math.random() * 7);
    const newBook = new Book(
      testTitles[randomNumber],
      testAuthors[randomNumber],
      Math.floor(Math.random() * 9999),
      Math.random() < 0.5
    );
    myLibrary.push(newBook);
  }
}

test()

const form = document.getElementById("form");
const labels = form.getElementsByTagName("label");
const inputs = form.getElementsByTagName("input");
const submit = document.getElementById("submit");
const add = document.getElementById("add");
submit.addEventListener("click", addBookToLibrary);
submit.addEventListener("click", displayLibrary);
add.addEventListener("click", showForm);

function showForm() {
  for (const item of labels) {
    item.classList.remove("hide");
  }
  for (const item of inputs) {
    item.classList.remove("hide");
  }
  submit.classList.remove("hide");
  add.classList.add("hide");
}

function hideForm() {
  for (const item of labels) {
    item.classList.add("hide");
  }
  for (const item of inputs) {
    item.classList.add("hide");
  }
  submit.classList.add("hide");
  add.classList.remove("hide");
}

function addBookToLibrary(e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const haveRead = document.getElementById("haveRead").checked;

  if (form.checkValidity()) {
    const newBook = new Book(title, author, pages, haveRead);
    myLibrary.push(newBook);
    hideForm();
  }
}

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
    const content = document.createElement("div");
    card.classList.add("card");

    const preTextTitle = document.createElement("span");
    const preTextAuthor = document.createElement("span");
    const mainTextTitle = document.createElement("span");
    const mainTextAuthor = document.createElement("span");
    const pagesText = document.createElement("span");
    const pagesNumber = document.createElement("span");
    const cardImage = document.createElement("img");
    const cardTitle = document.createElement("div");
    const cardAuthor = document.createElement("div");
    const cardPages = document.createElement("div");
    const readLabel = document.createElement("label");
    const readText = document.createTextNode("Read: ");
    const cardHaveRead = document.createElement("input");
    const deleteBtn = document.createElement("button");

    card.appendChild(cardImage);
    card.appendChild(content).classList.add("cardContent");
    content.appendChild(cardTitle).classList.add("cardTitle");
    cardTitle.appendChild(preTextTitle).classList.add("preText");
    cardTitle.appendChild(mainTextTitle).classList.add("mainText");
    cardAuthor.appendChild(preTextAuthor).classList.add("preText");
    cardAuthor.appendChild(mainTextAuthor).classList.add("mainText");
    content.appendChild(cardAuthor).classList.add("cardAuthor");
    cardPages.appendChild(pagesNumber).classList.add("pagesNumber");
    cardPages.appendChild(pagesText).classList.add("pagesText");
    content.appendChild(cardPages).classList.add("cardPages");
    content.appendChild(readLabel).classList.add("readLabel");
    readLabel.appendChild(readText);
    readLabel.appendChild(cardHaveRead).classList.add("cardHaveRead");
    card.appendChild(deleteBtn).classList.add("deleteBtn");
    cardHaveRead.type = "checkbox";

    cardImage.src = `https://picsum.photos/165/260?random=${i}`;
    preTextTitle.textContent = "Title: ";
    preTextAuthor.textContent = "By: ";
    mainTextTitle.textContent = myLibrary[i].title;
    mainTextAuthor.textContent = myLibrary[i].author;
    pagesText.textContent = " pages";
    pagesNumber.textContent = myLibrary[i].pages;
    cardHaveRead.checked = myLibrary[i].haveRead;
    deleteBtn.textContent = "Delete";

    cardHaveRead.addEventListener("click", updateRead.bind(null, i));
    deleteBtn.addEventListener("click", deleteBook.bind(null, i));

    library.appendChild(card);
  }
}

displayLibrary();
