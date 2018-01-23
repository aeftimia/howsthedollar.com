import { format } from 'd3-format';
import { SYMBOLS } from '../constants';

/**
 * Adds the appropriate symbol & separators to `value` based on the input `currencyCode`
 * @param {string} value
 * @param {string} currencyCode
 * @returns Formatted currency string
 */
function formatCurrency(value, currencyCode) {
  if (isNaN(value)) {
    return null;
  }
  const formattedValue = String(format(',s')(value));
  const reNumber = /[\d,]+\.[\d]{0,2}/;
  const reSymbol = /[^\d]+$/;
  const numberString = reNumber.exec(formattedValue)[0];
  let symbolString = reSymbol.exec(formattedValue);
  symbolString = symbolString === null ? '' : symbolString;
  const currencyValue = numberString + symbolString;
  const key = currencyCode.toLowerCase();
  if (key in SYMBOLS) return `${currencyValue}${SYMBOLS[key]}`;
  return `${currencyValue}${key}`;
}

function derivePrice(inversePrice) {
  return 1.0 / inversePrice;
}

// eslint-disable-next-line import/prefer-default-export
export { formatCurrency, derivePrice };
