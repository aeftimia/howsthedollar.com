import React from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from '../../../../utils';
import './index.css';

const PLUS_CHAR = '+';
const MINUS_CHAR = '\u2212';

const TableCell = ({
    label,
    code,
    value,
    isPercentage }) => {
  const absValue = Math.abs(value);
  const valueElement = [];
  if (value !== 0) {
    valueElement.push(<span className="small-font green">{(value > 0) ? PLUS_CHAR : MINUS_CHAR}</span>);
  }

  if (isPercentage) {
    const percentageValue = Number(absValue).toFixed(2);
    valueElement.push(<span className="large-font">{percentageValue}</span>);
    valueElement.push(<span className="small-font">%</span>);
  } else {
    const currencyValue = formatCurrency(absValue, String(code));
    const decimalPoint = currencyValue.indexOf('.');
    valueElement.push(<span className="large-font">{currencyValue.slice(0, decimalPoint)}</span>);
    valueElement.push(<span className="small-font">{currencyValue.slice(decimalPoint)}</span>);
  }

  return (
    <div className="TableCell">
      <div className="value">
        {valueElement}
      </div>
      <div className="label">{label}</div>
    </div>
  );
};

TableCell.propTypes = {
  label: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  isPercentage: PropTypes.bool,
};

TableCell.defaultProps = {
  isPercentage: false,
};

export default TableCell;
