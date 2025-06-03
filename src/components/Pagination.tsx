import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center mt-8 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(
          "px-3 py-1 rounded-md text-sm border",
          currentPage === 1
            ? "text-gray-300 border-gray-200 cursor-not-allowed"
            : "text-gray-600 border-gray-300 hover:bg-gray-100"
        )}
      >
        이전
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={clsx(
            "px-3 py-1 rounded-md text-sm border",
            currentPage === page
              ? "bg-primary text-white border-primary"
              : "text-gray-600 border-gray-300 hover:bg-gray-100"
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(
          "px-3 py-1 rounded-md text-sm border",
          currentPage === totalPages
            ? "text-gray-300 border-gray-200 cursor-not-allowed"
            : "text-gray-600 border-gray-300 hover:bg-gray-100"
        )}
      >
        다음
      </button>
    </nav>
  );
}
