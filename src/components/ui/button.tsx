export function Button({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={g-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 }
    >
      {children}
    </button>
  );
}
