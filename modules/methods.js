import DateTime from './dateTime.js';

const ul = document.querySelector('#book-list');
const contactSection = document.querySelector('#contact');
const form = document.querySelector('#form');
const bookSection = document.querySelector('#bookSection');
const heading = document.querySelector('.page-title');
// Define Methods Class
export default class Methods {
  // create books array to hold all books created
  static books = [];

  // get all books from the localStorage
  static getAllBooks() {
    // check if localStorage is not empty
    if (localStorage.getItem('books')) {
      this.books = JSON.parse(localStorage.getItem('books'));
      this.displayBooks();
    } else {
      ul.style.display = 'none';
    }
  }

  // display books to the browser
  static displayBooks() {
    this.books.forEach((book) => {
      this.addToBookUl(book);
    });
  }

  // create li with book properties and insert it to the ul tag
  static addToBookUl(book) {
    const li = `<li class="list-item" key="${book.id}">
   <p class="title">"${book.title}" by ${book.author}</p>
   <button class="removeBtn">Remove</button>
   </li>`;
    ul.innerHTML += li;
    ul.style.display = 'block';
  }

  // add book to array and store it in localStorage
  static addBook(book) {
    // add book to the books array
    this.books.push(book);

    // convert the books array to a string
    const strData = JSON.stringify(this.books);

    // store the converted data in the localStorage
    localStorage.setItem('books', strData);
  }

  // remove book from localStorage
  static removeBook(bookID) {
    // filter out the deleted book and return the ones left
    const result = this.books.filter(
      (book) => String(bookID) !== String(book.id),
    );

    // convert the result to a string
    const strData = JSON.stringify(result);

    // store the converted result in the localStorage
    localStorage.setItem('books', strData);

    // assign the new results to the books array
    this.books = JSON.parse(localStorage.getItem('books'));

    // check if the books array is not empty
    if (this.books.length === 0) {
      ul.style.display = 'none';
      localStorage.clear();
    } else {
      ul.style.display = 'block';
    }
  }

  static displayListOnly() {
    // remove form section
    if (!form.classList.contains('remove-section')) {
      form.classList.add('remove-section');
    }

    // remove contact section
    if (!contactSection.classList.contains('remove-section')) {
      contactSection.classList.add('remove-section');
    }

    // add list section
    if (bookSection.classList.contains('remove-section')) {
      bookSection.classList.remove('remove-section');
    }

    heading.textContent = 'All awesome books';
  }

  // Get Date format
  static getDateFormat = () => {
    const time = DateTime.toLocaleString({
      hour: 'numeric',
      minute: '2-digit',
      second: 'numeric',
    });
    const month = DateTime.toLocaleString({
      month: 'long',
    });
    const { year } = DateTime;
    const day = this.getSuffix(DateTime.day);

    return `${month} ${day} ${year}, ${time}`;
  };

  static getSuffix(date) {
    if (date > 3 && date < 21) {
      return `${date}th`;
    }
    switch (date % 10) {
      case 1:
        return `${date}st`;
      case 2:
        return `${date}nd`;
      case 3:
        return `${date}rd`;

      default:
        return `${date}th`;
    }
  }
}
