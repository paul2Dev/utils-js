export default class Utils {
  static logText(text) {
    console.log(text);
  }

  /*
  * Adds a class to an HTML element.
  * Use Element.classList and DOMTokenList.add() to add the specified class to the element.
  */ 

  static addClass = (element, className) => {
    element.classList.add(className);
  };

  /*
  * Joins all given URL segments together, then normalizes the resulting URL.
  * Use Array.prototype.join() to combine URL segments.
  * Use a series of String.prototype.replace() calls with various regular expressions to normalize the resulting URL 
  * (remove double slashes, add proper slashes for protocol,
  *  remove slashes before parameters,
  *  combine parameters with '&' and normalize first parameter delimiter).
  */ 

  static urlJoin = (...args) =>
                  args
                    .join('/')
                    .replace(/[\/]+/g, '/')
                    .replace(/^(.+):\//, '$1://')
                    .replace(/^file:/, 'file:/')
                    .replace(/\/(\?|&|#[^!])/g, '$1')
                    .replace(/\?/g, '&')
                    .replace('&', '?');

  /*
  * Creates an array of partial sums.
  * Use Array.prototype.reduce(), initialized with an empty array accumulator to iterate over nums.
  * Use Array.prototype.slice() to get the previous partial sum or 0 and add the current element to it.
  * Use the spread operator (...) to add the new partial sum to the accumulator array containing the previous sums.
  */
 
  static accumulate = (...nums) => nums.reduce((acc, n) => [...acc, n + (acc.slice(-1)[0] || 0)], []);

  /*
  * Calculates the date of n days from the given date, returning its string representation.
  * Use the Date constructor to create a Date object from the first argument.
  * Use Date.prototype.getDate() and Date.prototype.setDate() to add n days to the given date.
  * Use Date.prototype.toISOString() to return a string in yyyy-mm-dd format.
  */
  
  static addDaysToDate = (date, n) => {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d.toISOString().split('T')[0];
  };  


}