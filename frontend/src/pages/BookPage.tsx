import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const res = await fetch(`/books/${id}`);
        if (!res.ok) {
          console.error("Failed to fetch book:", await res.text());
          return;
        }
        const data = await res.json();
        setBook(data.book);
      } catch (err) {
        console.error("Error fetching book:", err);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
      >
        ← Back
      </button>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        {book.thumbnail && (
          <img
            src={book.thumbnail}
            alt={book.title}
            className="w-48 h-64 object-cover mb-4 rounded float-left mr-6"
          />
        )}

        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
        {book.authors && (
          <p className="text-gray-700 mb-2">
            <strong>Authors:</strong> {book.authors.join(", ")}
          </p>
        )}

        {book.publishedDate && (
          <p className="text-gray-700 mb-2">
            <strong>Published:</strong> {book.publishedDate}
          </p>
        )}

        {book.description && (
          <p
            className="text-gray-700 mt-4 clear-left"
            dangerouslySetInnerHTML={{ __html: book.description }}
          ></p>
        )}

        {book.info_link && (
          <a
            href={book.info_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            More info
          </a>
        )}
      </div>
    </div>
  );
}
