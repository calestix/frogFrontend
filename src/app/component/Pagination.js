import { MoveLeft, MoveRight } from "lucide-react";

export default function Pagination({
  page,
  totalPages,
  hasPrevPage,
  hasNextPage,
  onPageChange,
}) {
  const getPageNumbers = () => {
    const pages = [];

    const showLeftDots = page > 3;
    const showRightDots = page < totalPages - 2;

    if (!showLeftDots && showRightDots) {
      // 1 2 3 4 ... 20
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else if (showLeftDots && !showRightDots) {
      // 1 ... 17 18 19 20
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else if (showLeftDots && showRightDots) {
      // 1 ... 6 7 8 ... 20
      pages.push(1);
      pages.push("...");
      for (let i = page - 1; i <= page + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else {
      // 1 2 3 (if totalPages <= 5)
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!hasPrevPage}
        className="p-2 border border-black text-black rounded disabled:opacity-40"
      >
        <MoveLeft className="h-4 w-4" />
      </button>

      {getPageNumbers().map((p, idx) =>
        p === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-black">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 border-black text-black border rounded transition ${
              p === page
                ? "bg-purple-600 text-white border-purple-600"
                : "hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
        className="p-2 border-1 border-black text-black rounded disabled:opacity-40"
      >
        <MoveRight className="h-4 w-4" />
      </button>
    </div>
  );
}
