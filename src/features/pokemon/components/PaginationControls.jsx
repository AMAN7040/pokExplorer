import { usePagination } from "../context/PaginationContext";
import { usePokemon } from "../hooks/usePokemonList";

const PaginationControls = () => {
  const { currentPage, setPage, itemsPerPage, setItemsPerPage } =
    usePagination();
  const { data: allPokemons = [] } = usePokemon();

  const totalPages = Math.ceil(allPokemons.length / itemsPerPage);

  const handlePrev = () => setPage(Math.max(1, currentPage - 1));
  const handleNext = () => setPage(Math.min(totalPages, currentPage + 1));

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 py-4 px-6  mt-6 bg-white shadow-sm border-t border-gray-200">
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
        >
          Prev
        </button>

        <span className="text-sm sm:text-base font-medium text-gray-700">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
        >
          Next
        </button>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm sm:text-base font-medium text-gray-700">
          Items per page:
        </label>
        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
        >
          {[10, 20, 30, 50].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PaginationControls;
