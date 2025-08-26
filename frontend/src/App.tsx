import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BooksProvider } from "./context/BooksContext";
import Home from "./pages/Home";
import BookPage from "./pages/BookPage";

export default function App() {
  return (
    <BooksProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookPage />} />
        </Routes>
      </Router>
    </BooksProvider>
  );
}
