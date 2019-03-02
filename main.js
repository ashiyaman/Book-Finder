/******************* search for books using fetch api ********************/

let searchBooks = () =>{
  const QUERY = document.getElementById('query').value;
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${QUERY}`)
    .then (res => res.json())
    .then (data => console.log(data.items));
}
