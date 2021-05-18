import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";
import React from 'react';
import PropTypes from 'prop-types'
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

PaginationNav.propTypes = {
  onChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPage: PropTypes.number
}

PaginationNav.defaultProps = {
  totalPage: 10
}
