import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const Pagination = ({ page, pageSize, totalItmes, onPageChange }) => {
  const totalPages = Math.ceil(totalItmes / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <nav
        className="flex items-center gap-3 bg-white shadow-lg rounded-xl px-4 py-2 border border-gray-100"
        aria-label="Pagination"
      >
        <button
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600
           hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 group cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300
           disabled:hover:text-gray-300
           disabled:text-gray-300"
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
        >
          <FaChevronLeft />
          Previous
        </button>

        <div className="h-6 w-px bg-gray-200"></div>

        <div className="flex items-center gap-2 px-2">
          <span className="text-sm text-gray-500">Page</span>
          <span className="text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 px-3.5 py-1 rounded-lg shadow-sm">
            {page}
          </span>
          <span className="text-sm text-gray-400">/</span>
          <span className="text-sm font-medium text-gray-600">
            {totalPages}
          </span>
        </div>

        <div className="h-6 w-px bg-gray-200"></div>

        <button
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 group cursor-pointer disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300
           disabled:hover:text-gray-300
           disabled:text-gray-300"
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
          <FaChevronRight />
        </button>
      </nav>
    </section>
  );
};

export default Pagination;
