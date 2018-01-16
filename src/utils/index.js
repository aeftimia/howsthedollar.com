import currencyFormatter from 'currency-formatter';
import { SYMBOLS } from '../constants';

/**
 * Adds the appropriate symbol & separators to `value` based on the input `currencyCode`
 * @param {string} value
 * @param {string} currencyCode
 * @returns Formatted currency string
 */
function formatCurrency(_value, currencyCode, args) {
  let value;
  let symbol;
  if (_value * 100 < 0.5) {
    value = _value * 1000000;
    symbol = '\u00B5';
  } else {
    value = _value;
    symbol = '';
  }
  return `${currencyFormatter.format(value, { ...args })}${symbol}${SYMBOLS[currencyCode.toLowerCase()]}`;
}

function derivePrice(inversePrice) {
  return 1.0 / inversePrice;
}

// eslint-disable-next-line import/prefer-default-export
export { formatCurrency, derivePrice };
