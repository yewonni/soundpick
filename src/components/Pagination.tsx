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
  const getPagesToShow = () => {
    const delta = 2; // 현재 페이지 앞뒤로 몇 개 페이지를 보여줄지
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // 페이지가 적으면 모두 보여주기
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      // 앞쪽 생략 필요 시
      if (currentPage - delta > 2) {
        pages.push("...");
      }

      // 현재 페이지 주변 표시
      const start = Math.max(2, currentPage - delta);
      const end = Math.min(totalPages - 1, currentPage + delta);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // 뒤쪽 생략 필요 시
      if (currentPage + delta < totalPages - 1) {
        pages.push("...");
      }

      // 마지막 페이지 항상 표시
      pages.push(totalPages);
    }

    return pages;
  };

  const pagesToShow = getPagesToShow();

  return (
    <nav className="flex justify-center mt-8 gap-2 flex-wrap">
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

      {pagesToShow.map((page, idx) =>
        typeof page === "number" ? (
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
        ) : (
          <span
            key={`ellipsis-${idx}`}
            className="px-3 py-1 text-sm text-gray-500"
          >
            {page}
          </span>
        )
      )}

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
