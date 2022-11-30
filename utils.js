export default class Utils {
  static logText(text) {
    console.log(text);
  }

  /*
  Adds a class to an HTML element.
    Use Element.classList and DOMTokenList.add() to add the specified class to the element.
  */ 

  static addClass = (element, className) => {
    element.classList.add(className);
  };

  /*
  Joins all given URL segments together, then normalizes the resulting URL.
    Use Array.prototype.join() to combine URL segments.
    Use a series of String.prototype.replace() calls with various regular expressions to normalize the resulting URL 
    (remove double slashes, add proper slashes for protocol,
    remove slashes before parameters,
    combine parameters with '&' and normalize first parameter delimiter).
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
  Creates an array of partial sums.
    Use Array.prototype.reduce(), initialized with an empty array accumulator to iterate over nums.
    Use Array.prototype.slice() to get the previous partial sum or 0 and add the current element to it.
    Use the spread operator (...) to add the new partial sum to the accumulator array containing the previous sums.
  */
 
  static accumulate = (...nums) => nums.reduce((acc, n) => [...acc, n + (acc.slice(-1)[0] || 0)], []);

  /*
  Calculates the date of n days from the given date, returning its string representation.
    Use the Date constructor to create a Date object from the first argument.
    Use Date.prototype.getDate() and Date.prototype.setDate() to add n days to the given date.
    Use Date.prototype.toISOString() to return a string in yyyy-mm-dd format.
  */
  
  static addDaysToDate = (date, n) => {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d.toISOString().split('T')[0];
  };  

  /*
  Calculates the date of n minutes from the given date, returning its string representation.

    Use the Date constructor to create a Date object from the first argument.
    Use Date.prototype.getTime() and Date.prototype.setTime() to add n minutes to the given date.
    Use Date.prototype.toISOString(), String.prototype.split() and String.prototype.replace() to return a string in yyyy-mm-dd HH:MM:SS format.
  */

  static addMinutesToDate = (date, n) => {
    const d = new Date(date);
    d.setTime(d.getTime() + n * 60 * 1000);
    return d.toISOString().split('.')[0].replace('T', ' ');
  };

  /*
  Adds the provided styles to the given HTML element.
    Use Object.assign() and HTMLElement.style to merge the provided styles object into the style of the given element.
  */
  
  static addStyles = (el, styles) => Object.assign(el.style, styles);

  /*
  Calculates the date after adding the given number of business days.
    Use Array.from() to construct an array with length equal to the count of business days to be added.
    Use Array.prototype.reduce() to iterate over the array, starting from startDate and incrementing, using Date.prototype.getDate() and Date.prototype.setDate().
    If the current date is on a weekend, update it again by adding either one day or two days to make it a weekday.
    NOTE: Does not take official holidays into account.
  */

  static addWeekDays = (startDate, count) =>
  Array.from({ length: count }).reduce(date => {
    date = new Date(date.setDate(date.getDate() + 1));
    if (date.getDay() % 6 === 0)
      date = new Date(date.setDate(date.getDate() + (date.getDay() / 6 + 1)));
    return date;
  }, startDate);

  /*
  Checks if all elements in an array are equal.
    Use Array.prototype.every() to check if all the elements of the array are the same as the first one.
    Elements in the array are compared using the strict comparison operator, which does not account for NaN self-inequality.
  */

  static allEqual = arr => arr.every(val => val === arr[0]);
  
  /*
  Checks if all elements in an array are unique.
    Create a new Set from the mapped values to keep only unique occurrences.
    Use Array.prototype.length and Set.prototype.size to compare the length of the unique values to the original array.
  */

  static allUnique = arr => arr.length === new Set(arr).size;


}