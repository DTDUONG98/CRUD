import React from 'react';
import PropTypes from 'prop-types'
export const TitlePage = ({ content }) => {
    return (
      <div>
        <h1 className="font-medium sm:text-2xl text-4xl tracking-wide uppercase">{content}</h1>
        <p className="sm:hidden text-gray-600 pt-4">Show more : {content}</p>
      </div>
    );
  };

TitlePage.propTypes = {
  content: PropTypes.string.isRequired 
}  