import React from 'react';
import PropTypes from 'prop-types';

import { formatCurrency } from '../../../../utils';
import './index.css';

const TableCell = ({
    label,
    code,
    value,
    plusMinus,
    isPercentage }) => {
  const absValue = Math.abs(value);
  if (isNaN(absValue)) {
    return null;
  }
  const valueElement = [];

  if (plusMinus && value !== 0) valueElement.push(<span className="small-font green">{value > 0 ? '+' : '-'}</span>);

  if (isPercentage) {
    const percentage = formatCurrency(Math.round(absValue), '');
    valueElement.push(<span className="large-font">{percentage}</span>);
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
  plusMinus: PropTypes.bool,
};

TableCell.defaultProps = {
  isPercentage: false,
  plusMinus: true,
};

export default TableCell;
