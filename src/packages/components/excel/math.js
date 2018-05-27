/* eslint-disable no-eval,standard/no-callback-literal */
import Index, {number} from './math-trig';

export class Math {
  static add(value, find) {
    return value.reduce((previous, current) => current + number(find(previous[0], previous[1])))
  }

  /**
   * 计算值
   * @param expression
   * @param find
   * @param callback
   * @returns {any}
   */
  static expression(expression, find, callback) {
    return eval(expression.replace(/(([A-Z])(\d+))/g, (v, str1, str2, str3) => {
      callback && callback([str3 - 1, Index[str2]]);
      return find(str3 - 1, Index[str2])
    }))
  }
}
