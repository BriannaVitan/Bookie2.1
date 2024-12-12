import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Auth from "../utils/auth";
import { searchGoogleBooks } from "../utils/API";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import type { Book } from "../models/Book";
import type { GoogleAPIBook } from "../models/GoogleAPIBook";
import { SAVE_BOOK } from "../utils/mutations";
// import mascot from "/A_librarian_dressed_as_a_gambler.png";
// import video from "../assets/Library.mp4";
import "./pages.css";

const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState<Book[]>([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // set up useMutation to execute SAVE_BOOK
  const [saveBook] = useMutation(SAVE_BOOK);

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput) {
      throw new Error("Search input missing!");
    }

    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const bookData = items.map((book: GoogleAPIBook) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["No author to display"],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || "",
      }));

      setSearchedBooks(bookData);
      setSearchInput("");
      return;
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId: string) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave: Book = searchedBooks.find(
      (book) => book.bookId === bookId
    )!;

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      throw new Error("token is missing!");
    }

    try {
      // saveBook mutation takes in mutiple variables directly
      // this means that to pass the variables, must use the below syntax
      console.log(JSON.stringify(bookToSave));
      const response = await saveBook({ variables: { ...bookToSave } });

      if (!response) {
        throw new Error("something went wrong!");
      }

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
      return;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* <video src={video} muted loop autoPlay></video> */}
      {/* Video by Maksim Smirnov from Pexels: https://www.pexels.com/video/a-large-library-with-many-books-on-shelves-18969594/ */}
      <div className="overlay"></div>
      <div className="search-header">
        <Container>
          <div className="text-pic">
            <h1 className="motto">Take a gamble on your next great read!</h1>
            <img
              className="mascot"
              src="/A_librarian_dressed_as_a_gambler.png"
            ></img>
          </div>
          <div className="search-bar">
            <Form onSubmit={handleFormSubmit}>
              <Row>
                <Col xs={12} md={8}>
                  <Form.Control
                    name="searchInput"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    type="text"
                    size="lg"
                    placeholder="Search for a book"
                  />
                </Col>
                <Col xs={12} md={4}>
                  <Button
                    className="book-s-btn"
                    type="submit"
                    variant="success"
                    size="lg"
                  >
                    Submit Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </div>

      <Container>
        <h2 className="filler">
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Search for a book to begin"}
        </h2>
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some(
                          (savedBookId: string) => savedBookId === book.bookId
                        )}
                        className="btn-block btn-info"
                        onClick={() => handleSaveBook(book.bookId)}
                      >
                        {savedBookIds?.some(
                          (savedBookId: string) => savedBookId === book.bookId
                        )
                          ? "This book has already been saved!"
                          : "Save this Book!"}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;
