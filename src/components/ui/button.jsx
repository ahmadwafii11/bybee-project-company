export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl transition ${className}`}
    >
      {children}
    </button>
  );
}
