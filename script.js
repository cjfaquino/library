const library = (() => {
  let myLibrary = [];
  // test data
  const testTitles = [
    'A book of books',
    'THE Book',
    'Just Another Book',
    'Not Your Average Book',
    'Not a Book',
    'That Book',
    'This Book',
  ];
  const testAuthors = [
    'Author',
    'Another Author',
    'That Author',
    'This Author',
    'Plenty of Authors',
    'Not an Author',
    'No Author',
  ];
  class Book {
    static test() {
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

    constructor(title, author, pages, haveRead) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.haveRead = haveRead;
    }
  }

  //cache DOM
  const form = document.getElementById('form');
  const library = document.getElementById('library');
  const labels = form.getElementsByTagName('label');
  const inputs = form.getElementsByTagName('input');
  const [title, author, pages, haveRead] = inputs;
  const nameInputs = [title, author];
  const validInputs = [...nameInputs, pages];
  const submit = document.getElementById('submit');
  const add = document.getElementById('add');
  //bind events
  submit.addEventListener('click', addBookToLibrary);
  submit.addEventListener('click', render);
  add.addEventListener('click', showForm);

  const checkErrors = (event) => {
    const item = event.target;
    item.setCustomValidity('');
    item.checkValidity();
  };

  const setNameErrorMessage = (event) => {
    const item = event.target;
    item.setCustomValidity(`Please add the book's ${item.id}`);
    item.checkValidity();
  };

  const setPageErrorMessage = (event) => {
    const item = event.target;
    if (item.validity.valueMissing) {
      item.setCustomValidity('Please add book length in pages');
    }
  };

  validInputs.forEach((el) => {
    el.addEventListener('input', checkErrors);
  });

  nameInputs.forEach((el) => {
    el.addEventListener('invalid', setNameErrorMessage);
  });

  pages.addEventListener('invalid', setPageErrorMessage);

  function getLibrary() {
    return myLibrary;
  }

  function showForm() {
    for (const item of labels) {
      item.classList.remove('hide');
    }
    for (const item of inputs) {
      item.classList.remove('hide');
    }
    submit.classList.remove('hide');
    add.classList.add('hide');
  }

  function hideForm() {
    for (const item of labels) {
      item.classList.add('hide');
    }
    for (const item of inputs) {
      item.classList.add('hide');
    }
    submit.classList.add('hide');
    add.classList.remove('hide');
  }

  function addBookToLibrary() {
    const newTitle = title.value;
    const newAuthor = author.value;
    const newPages = pages.value;
    const newHaveRead = haveRead.checked;

    if (form.checkValidity()) {
      const newBook = new Book(newTitle, newAuthor, newPages, newHaveRead);
      myLibrary.push(newBook);
      setLocalStorage();
      hideForm();
    }
  }

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function updateRead(index) {
    return (event) => {
      myLibrary[index].haveRead = event.target.checked;
      setLocalStorage();
    };
  }

  function deleteBook(index) {
    return () => {
      myLibrary.splice(index, 1);
      setLocalStorage();
      render();
    };
  }

  function setLocalStorage() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
  }

  function getLocalStorage() {
    const local = JSON.parse(localStorage.getItem('library'));
    myLibrary = local;
  }

  function createNewCardDOM(index) {
    const card = document.createElement('div');
    const content = document.createElement('div');
    card.classList.add('card');

    const preTextTitle = document.createElement('span');
    const preTextAuthor = document.createElement('span');
    const mainTextTitle = document.createElement('span');
    const mainTextAuthor = document.createElement('span');
    const pagesText = document.createElement('span');
    const pagesNumber = document.createElement('span');
    const cardImage = document.createElement('img');
    const cardTitle = document.createElement('div');
    const cardAuthor = document.createElement('div');
    const cardPages = document.createElement('div');
    const readLabel = document.createElement('label');
    const readText = document.createTextNode('Read: ');
    const cardHaveRead = document.createElement('input');
    const deleteBtn = document.createElement('button');

    card.appendChild(cardImage);
    card.appendChild(content).classList.add('cardContent');
    content.appendChild(cardTitle).classList.add('cardTitle');
    cardTitle.appendChild(preTextTitle).classList.add('preText');
    cardTitle.appendChild(mainTextTitle).classList.add('mainText');
    cardAuthor.appendChild(preTextAuthor).classList.add('preText');
    cardAuthor.appendChild(mainTextAuthor).classList.add('mainText');
    content.appendChild(cardAuthor).classList.add('cardAuthor');
    cardPages.appendChild(pagesNumber).classList.add('pagesNumber');
    cardPages.appendChild(pagesText).classList.add('pagesText');
    content.appendChild(cardPages).classList.add('cardPages');
    content.appendChild(readLabel).classList.add('readLabel');
    readLabel.appendChild(readText);
    readLabel.appendChild(cardHaveRead).classList.add('cardHaveRead');
    card.appendChild(deleteBtn).classList.add('deleteBtn');
    cardHaveRead.type = 'checkbox';

    cardImage.src = `https://picsum.photos/165/260?random=${index}`;
    preTextTitle.textContent = 'Title: ';
    preTextAuthor.textContent = 'By: ';
    mainTextTitle.textContent = myLibrary[index].title;
    mainTextAuthor.textContent = myLibrary[index].author;
    pagesText.textContent = ' pages';
    pagesNumber.textContent = myLibrary[index].pages;
    cardHaveRead.checked = myLibrary[index].haveRead;
    deleteBtn.textContent = 'Delete';
    return { cardHaveRead, deleteBtn, card };
  }

  function render() {
    removeAllChildNodes(library);

    for (let i = 0; i < myLibrary.length; i++) {
      const { cardHaveRead, deleteBtn, card } = createNewCardDOM(i);

      cardHaveRead.addEventListener('click', updateRead(i));
      deleteBtn.addEventListener('click', deleteBook(i));

      library.appendChild(card);
    }
  }
  return { render, Book, getLibrary, setLocalStorage, getLocalStorage };
})();

if (typeof localStorage.library === 'undefined') {
  library.Book.test();
  library.setLocalStorage();
}

library.getLocalStorage();
library.render();
