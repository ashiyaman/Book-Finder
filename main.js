/******************* handle when user presses enter key in search bar **********************/
let handleKey = () =>{
  let inputElement = document.querySelector('#query');
  inputElement.addEventListener('keypress', function(event){
    if (event.key === 'Enter'){
      event.preventDefault();
      searchBooks();
    }
  })
}

/******************* search for books using fetch api ********************/

let searchBooks = () =>{
  const QUERY = document.querySelector('#query').value;
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${QUERY}`)
    .then (res => res.json())
    .then (data => booksContainer(data.items))
}

/******************** display books container  **********************/
let booksContainer = (items) =>{
  let displayBookElement = document.querySelector('.display-container');
  displayBookElement.classList.remove('hidden');
  items.forEach ((item, index) =>{
    let bookTemplate = createBookTemplate(item.volumeInfo);
    displayBookElement.appendChild(bookTemplate);
  })
}

/*********************** individual book template *******************************/
let createBookTemplate = (item) =>{
  let parentBookElement = document.createElement('div');
  parentBookElement.setAttribute('class', 'parentBook');

  let imageElement = document.createElement('img');
  imageElement.setAttribute('src', item.imageLinks.thumbnail);

  let bookInfoElement = document.createElement('div');
  bookInfoElement.setAttribute('class', 'bookInfo');

  let bookTitleElement = document.createElement('h3');
  bookTitleElement.innerHTML = item.title;
  bookTitleElement.setAttribute('class', 'title');

  let bookAuthorElement = document.createElement('P');
  bookAuthorElement.innerHTML = 'By: ' + item.authors;

  let bookPublisherElement = document.createElement('p');
  bookPublisherElement.innerHTML = 'Published By: ' + item.publisher;

  let bookInfoButton = document.createElement('button');
  bookInfoButton.innerHTML = 'See this book';
  bookInfoButton.setAttribute('click', 'viewBook()');
  bookInfoButton.setAttribute('class', 'float-right');

  bookInfoElement.appendChild(bookTitleElement);
  bookInfoElement.appendChild(bookAuthorElement);
  bookInfoElement.appendChild(bookPublisherElement);
  bookInfoElement.appendChild(bookInfoButton);
  parentBookElement.appendChild(imageElement);
  parentBookElement.appendChild(bookInfoElement);

  return parentBookElement;
}

let viewBook = () =>{
  console.log('here');
}
