import React from 'react';
import PropTypes from 'prop-types';
import { extent } from 'd3-array';
import { formatCurrency } from '../../utils';

import './index.css';


function formatAxisPrice(price, currencyCode) {
  return formatCurrency(price, currencyCode, { precision: 0 });
}

const VerticalChartAxis = ({ cryptocurrency, data, textAlign }) => {
  const [minPrice, maxPrice] = extent(data, d => d.price);
  const textAlignClass = (textAlign === 'left') ? 'left' : 'right';

  return (
    <div className={`VerticalChartAxis ${textAlignClass}`}>
      <div className="tick">{formatAxisPrice(maxPrice, cryptocurrency)}</div>
      <div className="tick">{formatAxisPrice(minPrice, cryptocurrency)}</div>
    </div>
  );
};

VerticalChartAxis.propTypes = {
  cryptocurrency: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    time: PropTypes.data,
  })).isRequired,
  textAlign: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default VerticalChartAxis;
