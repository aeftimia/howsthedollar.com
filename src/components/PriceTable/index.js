import React from 'react';
import PropTypes from 'prop-types';
import { scan } from 'd3-array';

import TableCell from './components/TableCell';

import './index.css';

const PriceTable = ({ currencyLabel, code, durationLabel, spotPrice, priceHistory }) => {
  const lastIndex = scan(priceHistory, (a, b) => a.time - b.time);
  const oldPrice = priceHistory[lastIndex] && priceHistory[lastIndex].price;
  const priceDifference = spotPrice - oldPrice;
  const percentageDifference = ((spotPrice / oldPrice) - 1) * 100 || 0;
  const tableCells = [];
  tableCells.push(
    <TableCell
      label={`${currencyLabel} price`}
      code={code}
      value={spotPrice}
      plusMinus={false}
    />,
  );

  if (durationLabel) {
    tableCells.push(
      <TableCell
        label={`${durationLabel} (${code})`}
        code={code}
        value={priceDifference}
      />,
    );

    tableCells.push(
      <TableCell
        label={`${durationLabel} (${code})`}
        code={code}
        value={percentageDifference}
        isPercentage
      />,
    );
  }

  return (
    <div className="PriceTable">
      {tableCells}
    </div>
  );
};

PriceTable.propTypes = {
  currencyLabel: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  durationLabel: PropTypes.string.isRequired,
  priceHistory: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number,
    time: PropTypes.date,
  })).isRequired,
  spotPrice: PropTypes.number.isRequired,
};

export default PriceTable;
