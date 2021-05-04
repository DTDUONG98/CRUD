import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";

export const PaginationNav = ({ onChange, totalPage, page }) => {
  return (
    <div className="flex w-11/12 sm:w-full justify-center mt-10 mb-20">
      <Pagination
        currentPage={page}
        totalPages={totalPage}
        changeCurrentPage={onChange}
        theme="bottom-border"
      />
    </div>
  );
};