export default function BookCard({ book, onClick }) {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-xl transition"
      onClick={onClick}
    >
      {book.imageLinks?.thumbnail && (
        <img
          src={book.imageLinks.thumbnail}
          alt={book.title}
          className="w-full h-48 object-cover mb-4 rounded"
        />
      )}
      <h2 className="text-lg font-semibold">{book.title}</h2>
      {book.authors && (
        <p className="text-gray-600 text-sm">{book.authors.join(", ")}</p>
      )}
    </div>
  );
}
