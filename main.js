/******************* handle when user presses enter key in search bar **********************/
let handleKey = () =>{
  let inputElement = document.querySelector('#query');
  inputElement.addEventListener('keypress', function(event){
    /********* remove validation only if present***************/
    if (inputElement.classList.contains('input-validation')){
      toggleHide('.blank-validation');
    }
    if (event.key === 'Enter'){
      event.preventDefault();
      searchBooks();
    }
  })
}

/******************* search for books using fetch api ********************/

let searchBooks = () =>{
  const QUERY = document.querySelector('#query').value;
  /**********handle validation***********/
  if (QUERY === '' || QUERY === 'undefined'){
    toggleHide('.blank-validation');
    return;
  }

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${QUERY}`)
    .then (res => res.json())
    .then (data => booksContainer(data.items))
    .catch(error => toggleHide('#errorModal'));
}

/******************** display books container  **********************/
let booksContainer = (items) =>{
  let displayBookElement = document.querySelector('.display-container');
  displayBookElement.classList.remove('hidden');
  items.forEach ((book, index) =>{
    let bookTemplate = createBookTemplate(book.volumeInfo);
    displayBookElement.appendChild(bookTemplate);
  })
}

/*********************** individual book template *******************************/
let createBookTemplate = (bookInfo) =>{
  let parentBookElement = document.createElement('div');
  parentBookElement.setAttribute('class', 'parentBook');

  let imageElement = document.createElement('img');
  imageElement.setAttribute('src', bookInfo.imageLinks.thumbnail);

  let bookInfoElement = document.createElement('div');
  bookInfoElement.setAttribute('class', 'bookInfo');

  let bookTitleElement = document.createElement('h3');
  bookTitleElement.innerHTML = bookInfo.title;
  bookTitleElement.setAttribute('class', 'title');

  let bookAuthorElement = document.createElement('P');
  bookAuthorElement.innerHTML = 'By: ' + bookInfo.authors;

  let bookPublisherElement = document.createElement('p');
  bookPublisherElement.innerHTML = 'Published By: ' + bookInfo.publisher;

  let bookInfoButton = document.createElement('button');
  let moreBookInfo = {title: bookInfo.title,
                      image: bookInfo.imageLinks.thumbnail,
                      author: bookInfo.authors,
                      category: bookInfo.categories,
                      pageCount: bookInfo.pageCount,
                      description: bookInfo.description};
  bookInfoButton.innerHTML = 'See this book';
  bookInfoButton.onclick = viewBook.bind(this, moreBookInfo);
  bookInfoButton.setAttribute('class', 'float-right');

  bookInfoElement.appendChild(bookTitleElement);
  bookInfoElement.appendChild(bookAuthorElement);
  bookInfoElement.appendChild(bookPublisherElement);
  bookInfoElement.appendChild(bookInfoButton);
  parentBookElement.appendChild(imageElement);
  parentBookElement.appendChild(bookInfoElement);

  return parentBookElement;
}

let viewBook = (info) =>{
  toggleHide('.book-container');
  let bookContainerElement = document.querySelector('.book-container');
  bookContainerElement.querySelector('img').setAttribute('src', info.image);
  bookContainerElement.querySelector('.book-title').innerHTML = info.title;
  bookContainerElement.querySelector('.author').innerHTML += info.author;
  bookContainerElement.querySelector('.category').innerHTML += info.category;
  bookContainerElement.querySelector('.page-count').innerHTML += info.pageCount;
  bookContainerElement.querySelector('.description').innerHTML = info.description;
}

/********************* Toggle hidden element **********************/

let toggleHide = (element) =>{
  let toggleElement = document.querySelector(element);
  if (element === '.blank-validation'){
    document.querySelector('#query').classList.toggle('input-validation');
  }
  toggleElement.classList.toggle('hidden');
}
