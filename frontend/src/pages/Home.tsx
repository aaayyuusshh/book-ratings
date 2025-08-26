import { useContext } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { BooksContext } from "../context/BooksContext";

export default function Home() {
  const context = useContext(BooksContext);
  if (!context) return null; // safety check

  const { query, setQuery, books, setBooks } = context;
  const navigate = useNavigate();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await fetch(`/books/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        console.error("Failed to fetch books:", await res.text());
        return;
      }
      const data = await res.json();
      setBooks(data.items || []);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Book Explorer</h1>

      <form className="flex justify-center mb-6" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-1/2 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book: any) => {
          const info = book.volumeInfo || {};
          return (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition"
              onClick={() => navigate(`/books/${book.id}`)}
            >
              {info.imageLinks?.thumbnail && (
                <img
                  src={info.imageLinks.thumbnail}
                  alt={info.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
              )}
              <h2 className="text-lg font-semibold">{info.title}</h2>
              {info.authors && (
                <p className="text-gray-600 text-sm">{info.authors.join(", ")}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
