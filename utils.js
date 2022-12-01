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

  /*
  Converts the given array elements into <li> tags and appends them to the list of the given id.
    Use Array.prototype.map() and Document.querySelector() to create a list of html tags.\
  */

  static arrayToHTMLList = (arr, listID) =>
  document.querySelector(`#${listID}`).innerHTML += arr
    .map(item => `<li>${item}</li>`)
    .join('');

  /*
  Validates all keys in an object match the given keys.
    Use Object.keys() to get the keys of the given object, obj.
    Use Array.prototype.every() and Array.prototype.includes() to validate that each key in the object is specified in the keys array.
  */

  static assertValidKeys = (obj, keys) =>
    Object.keys(obj).every(key => keys.includes(key));

  /*
  Decodes a string of data which has been encoded using base-64 encoding.
    Create a Buffer for the given string with base-64 encoding.
    Use Buffer.prototype.toString() to return the decoded string.\
  */

  static atob = str => Buffer.from(str, 'base64').toString('binary');

  /*
  Calculates the average of two or more numbers.
    Use Array.prototype.reduce() to add each value to an accumulator, initialized with a value of 0.
    Divide the resulting array by its length.
  */

  static average = (...nums) =>
    nums.reduce((acc, val) => acc + val, 0) / nums.length;

  /*
  Returns the length of a string in bytes.
    Convert a given string to a Blob Object.
    Use Blob.size to get the length of the string in bytes.
  */

  static byteSize = str => new Blob([str]).size;

  /*
  Capitalizes the first letter of a string.
    Use array destructuring and String.prototype.toUpperCase() to capitalize the first letter of the string.
    Use Array.prototype.join() to combine the capitalized first with the ...rest of the characters.
    Omit the lowerRest argument to keep the rest of the string intact, or set it to true to convert to lowercase.
  */

  static capitalize = ([first, ...rest], lowerRest = false) =>
    first.toUpperCase() +
    (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

  /*
  Capitalizes the first letter of every word in a string.
    Use String.prototype.replace() to match the first character of each word and String.prototype.toUpperCase() to capitalize it.
  */

  static capitalizeEveryWord = str =>
    str.replace(/\b[a-z]/g, char => char.toUpperCase());  

  /*
  Converts Celsius to Fahrenheit.
    Follow the conversion formula F = 1.8 * C + 32.
  */

  static celsiusToFahrenheit = degrees => 1.8 * degrees + 32;

  /*
  Chains asynchronous functions.
    Loop through an array of functions containing asynchronous events, calling next when each asynchronous event has completed.
  */

  static chainAsync = fns => {
    let curr = 0;
    const last = fns[fns.length - 1];
    const next = () => {
      const fn = fns[curr++];
      fn === last ? fn() : fn(next);
    };
    next();
  };  

  /*
  Chunks an array into smaller arrays of a specified size.
    Use Array.from() to create a new array, that fits the number of chunks that will be produced.
    Use Array.prototype.slice() to map each element of the new array to a chunk the length of size.
    If the original array can't be split evenly, the final chunk will contain the remaining elements.
  */

  static chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );  

  /*
  Chunks an array into n smaller arrays.
    Use Math.ceil() and Array.prototype.length to get the size of each chunk.
    Use Array.from() to create a new array of size n.
    Use Array.prototype.slice() to map each element of the new array to a chunk the length of size.
    If the original array can't be split evenly, the final chunk will contain the remaining elements.
  */

  static chunkIntoN = (arr, n) => {
    const size = Math.ceil(arr.length / n);
    return Array.from({ length: n }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }  


  /*
  Chunks an iterable into smaller arrays of a specified size.
    Use a for...of loop over the given iterable, using Array.prototype.push() to add each new value to the current chunk.
    Use Array.prototype.length to check if the current chunk is of the desired size and yield the value if it is.
    Finally, use Array.prototype.length to check the final chunk and yield it if it's non-empty.
  */

  static chunkify = function* (itr, size) {
    let chunk = [];
    for (const v of itr) {
      chunk.push(v);
      if (chunk.length === size) {
        yield chunk;
        chunk = [];
      }
    }
    if (chunk.length) yield chunk;
  };  

  /*
  Clamps num within the inclusive range specified by the boundary values a and b.
    If num falls within the range, return num.
    Otherwise, return the nearest number in the range.
  */

  static clampNumber = (num, a, b) =>
    Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

  /*
  Finds the closest number from an array.
    Use Array.prototype.reduce() to scan all elements of the array.
    Use Math.abs() to compare each element's distance from the target value, storing the closest match.
  */

  static closest = (arr, n) =>
    arr.reduce((acc, num) => (Math.abs(num - n) < Math.abs(acc - n) ? num : acc));

  /*
  Finds the common keys between two objects.
    Use Object.keys() to get the keys of the first object.
    Use Object.prototype.hasOwnProperty() to check if the second object has a key that's in the first object.
    Use Array.prototype.filter() to filter out keys that aren't in both objects.
  */

  static commonKeys = (obj1, obj2) =>
    Object.keys(obj1).filter(key => obj2.hasOwnProperty(key));


  





}