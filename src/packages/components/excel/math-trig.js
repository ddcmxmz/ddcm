/**
 * 是否存在有效的公式
 * @param expression
 * @returns {boolean}
 */
export function isFormula(expression) {
  return typeof expression === 'string' && expression.length >= 2 && expression.charAt(0) === '=';
}

/**
 * 返回表达式
 * @param expression
 * @returns {string | *}
 */
export function unescapeFormula(expression) {
  return isFormula(expression) ? expression.substr(1) : expression;
}

/**
 * 转换整数
 * @param value
 * @returns {*|boolean|number}
 */
export function number(value) {
  return value && typeof value === 'string' && Number(value)
}

/**
 * 大写公式表达式。
 * @param expression
 * @returns {string}
 */
export function toUpperCase(expression) {
  const PATTERN = /(\\"|"(?:\\"|[^"])*"|(\+))|(\\'|'(?:\\'|[^'])*'|(\+))/g;
  const strings = expression.match(PATTERN) || [];
  let index = -1;
  return expression.toUpperCase().replace(PATTERN, function () {
    ++index;
    return strings[index];
  });
}

export default {
  'A': 0,
  'B': 1,
  'C': 2,
  'D': 3,
  'E': 4,
  'F': 5,
  'G': 6,
  'H': 7,
  'I': 8,
  'J': 9,
  'K': 10,
  'L': 11,
  'M': 12,
  'N': 13,
  'O': 14,
  'P': 15,
  'Q': 16,
  'R': 17,
  'S': 18,
  'T': 18,
  'U': 20,
  'V': 21,
  'W': 22,
  'X': 23,
  'Y': 24,
  'Z': 25,
}
