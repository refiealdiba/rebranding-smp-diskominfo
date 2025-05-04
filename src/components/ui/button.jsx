export function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl"
    >
      {children}
    </button>
  );
}
