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

  /*
  Checks if the given string contains any whitespace characters.
    Use RegExp.prototype.test() with an appropriate regular expression to check if the given string contains any whitespace characters.
  */

  static containsWhitespace = str => /\s/.test(str);

  /*
  Copies a string to the clipboard. Only works as a result of user action (i.e. inside a click event listener).
    Create a new <textarea> element, fill it with the supplied data and add it to the HTML document.
    Use Selection.getRangeAt()to store the selected range (if any).
    Use Document.execCommand() to copy to the clipboard.
    Remove the <textarea> element from the HTML document.
    Finally, use Selection.addRange() to recover the original selected range (if any).
    Note: You can use the asynchronous Clipboard API in most current browsers. You can find out more about it in the copyToClipboardAsync snippet.
  */

  static copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  };  


  /*
  Copies a string to the clipboard, returning a promise that resolves when the clipboard's contents have been updated.
    Check if the Clipboard API is available. Use an if statement to ensure Navigator, Navigator.clipboard and Navigator.clipboard.writeText are truthy.
    Use Clipboard.writeText() to write the given value, str, to the clipboard.
    Return the result of Clipboard.writeText(), which is a promise that resolves when the clipboard's contents have been updated.
    In case that the Clipboard API is not available, use Promise.reject() to reject with an appropriate message.
    Note: If you need to support older browsers, you might want to use Document.execCommand() instead. You can find out more about it in the copyToClipboard snippet.
  */

  static copyToClipboardAsync = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
      return navigator.clipboard.writeText(str);
    return Promise.reject('The Clipboard API is not available.');
  };

  /*
  Counts the weekdays between two dates.
    Use Array.from() to construct an array with length equal to the number of days between startDate and endDate.
    Use Array.prototype.reduce() to iterate over the array, checking if each date is a weekday and incrementing count.
    Update startDate with the next day each loop using Date.prototype.getDate() and Date.prototype.setDate() to advance it by one day.
    NOTE: Does not take official holidays into account.
  */

  static countWeekDaysBetween = (startDate, endDate) =>
  Array
    .from({ length: (endDate - startDate) / (1000 * 3600 * 24) })
    .reduce(count => {
      if (startDate.getDay() % 6 !== 0) count++;
      startDate = new Date(startDate.setDate(startDate.getDate() + 1));
      return count;
    }, 0);


  /*
  Creates an element from a string (without appending it to the document). If the given string contains multiple elements, only the first one will be returned.
    Use Document.createElement() to create a new element.
    Use Element.innerHTML to set its inner HTML to the string supplied as the argument.
    Use Element.firstElementChild to return the element version of the string.
  */

  static createElement = str => {
    const el = document.createElement('div');
    el.innerHTML = str;
    return el.firstElementChild;
  };

  /*
  const el = createElement(
    `<div class="container">
      <p>Hello!</p>
    </div>`
  );
  console.log(el.className); // 'container'
  */

  /*
  Returns the current URL.
    Use Window.location.href to get the current URL.
  */

  static currentURL = () => window.location.href;

  /*
  Creates a generator, that generates all dates in the given range using the given step.
    Use a while loop to iterate from start to end, using yield to return each date in the range, using the Date constructor.
    Use Date.prototype.getDate() and Date.prototype.setDate() to increment by step days after returning each subsequent value.
    Omit the third argument, step, to use a default value of 1.
  */

  static dateRangeGenerator = function* (start, end, step = 1) {
    let d = start;
    while (d < end) {
      yield new Date(d);
      d.setDate(d.getDate() + step);
    }
  };  

  /*
  [...dateRangeGenerator(new Date('2021-06-01'), new Date('2021-06-04'))];
  // [ 2021-06-01, 2021-06-02, 2021-06-03 ]
  */

  /*
  Gets the name of the weekday from a Date object.
    Use Date.prototype.toLocaleDateString() with the { weekday: 'long' } option to retrieve the weekday.
    Use the optional second argument to get a language-specific name or omit it to use the default locale.\
  */

  static dayName = (date, locale) =>
    date.toLocaleDateString(locale, { weekday: 'long' });

  /*
  dayName(new Date()); // 'Saturday'
  dayName(new Date('09/23/2020'), 'de-DE'); // 'Samstag'  
  */


  /*
  Gets the day of the year (number in the range 1-366) from a Date object.
    Use the Date constructor and Date.prototype.getFullYear() to get the first day of the year as a Date object.
    Subtract the first day of the year from date and divide with the milliseconds in each day to get the result.
    Use Math.floor() to appropriately round the resulting day count to an integer.
  */

  static dayOfYear = date =>
    Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

  /* dayOfYear(new Date()); // 272 */

  /*
  Calculates the date of n days ago from today as a string representation.
    Use the Date constructor to get the current date.
    Use Math.abs() and Date.prototype.getDate() to update the date accordingly and set to the result using Date.prototype.setDate().
    Use Date.prototype.toISOString() to return a string in yyyy-mm-dd format.
  */

  static daysAgo = n => {
    let d = new Date();
    d.setDate(d.getDate() - Math.abs(n));
    return d.toISOString().split('T')[0];
  };

  /* daysAgo(20); // 2020-09-16 (if current date is 2020-10-06) */

  /*
  Calculates the date of n days from today as a string representation.
    Use the Date constructor to get the current date.
    Use Math.abs() and Date.prototype.getDate() to update the date accordingly and set to the result using Date.prototype.setDate().
    Use Date.prototype.toISOString() to return a string in yyyy-mm-dd format.
  */

  static daysFromNow = n => {
    let d = new Date();
    d.setDate(d.getDate() + Math.abs(n));
    return d.toISOString().split('T')[0];
  };

  /* daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08) */

  /*
  Gets the number of days in the given month of the specified year.
    Use the Date constructor to create a date from the given year and month.
    Set the days parameter to 0 to get the last day of the previous month, as months are zero-indexed.
    Use Date.prototype.getDate() to return the number of days in the given month.
  */

  static daysInMonth = (year, month) => new Date(year, month, 0).getDate();

  /*
  daysInMonth(2020, 12)); // 31
  daysInMonth(2024, 2)); // 29
  */

  /*
  Decapitalizes the first letter of a string.
    Use array destructuring and String.prototype.toLowerCase() to decapitalize first letter, ...rest to get array of characters after first letter and then Array.prototype.join() to make it a string again.
    Omit the upperRest argument to keep the rest of the string intact, or set it to true to convert to uppercase.
  */

  static decapitalize = ([first, ...rest], upperRest = false) =>
    first.toLowerCase() +
    (upperRest ? rest.join('').toUpperCase() : rest.join(''));

  /* 
  decapitalize('FooBar'); // 'fooBar'
  decapitalize('FooBar', true); // 'fOOBAR'
  */

  /*
  Detects whether the page is being viewed on a mobile device or a desktop.
    Use a regular expression to test the Navigator.userAgent property to figure out if the device is a mobile device or a desktop.
  */

  static detectDeviceType = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
      ? 'Mobile'
      : 'Desktop';

  /*
  Detects the preferred language of the current user.
    Use Navigator.language or the first value of Navigator.languages if available, otherwise return defaultLang.
    Omit the second argument, defaultLang, to use 'en-US' as the default language code.
  */

  static detectLanguage = (defaultLang = 'en-US') =>
    navigator.language ||
    (Array.isArray(navigator.languages) && navigator.languages[0]) ||
    defaultLang;  

  /*
  Calculates the difference between two arrays, without filtering duplicate values.
    Create a Set from b to get the unique values in b.
    Use Array.prototype.filter() on a to only keep values not contained in b, using Set.prototype.has().
  */

  static difference = (a, b) => {
    const s = new Set(b);
    return a.filter(x => !s.has(x));
  };

  /*
  Gets the target value in a nested JSON object, based on the given key.
    Use the in operator to check if target exists in obj.
    If found, return the value of obj[target].
    Otherwise use Object.values() and Array.prototype.reduce() to recursively call dig on each nested object until the first matching key/value pair is found.
  */

  static dig = (obj, target) =>
    target in obj
      ? obj[target]
      : Object.values(obj).reduce((acc, val) => {
          if (acc !== undefined) return acc;
          if (typeof val === 'object') return dig(val, target);
        }, undefined);

  /*
  Converts a number to an array of digits, removing its sign if necessary.
    Use Math.abs() to strip the number's sign.
    Convert the number to a string, using the spread operator (...) to build an array.
    Use Array.prototype.map() and parseInt() to transform each value to an integer.
  */

  static digitize = n => [...`${Math.abs(n)}`].map(i => parseInt(i));

  /*
  Creates a new array with n elements removed from the left.
    Use Array.prototype.slice() to remove the specified number of elements from the left.
    Omit the last argument, n, to use a default value of 1.
  */

  static drop = (arr, n = 1) => arr.slice(n);

  /*
  Creates a new array with n elements removed from the right.
    Use Array.prototype.slice() to remove the specified number of elements from the right.
    Omit the last argument, n, to use a default value of 1.
  */

  static dropRight = (arr, n = 1) => arr.slice(0, -n);

  /*
  Removes elements from the end of an array until the passed function returns true. Returns the remaining elements in the array.
    Loop through the array, using Array.prototype.slice() to drop the last element of the array until the value returned from func is true.
    Return the remaining elements.
  */

  static dropRightWhile = (arr, func) => {
    let rightIndex = arr.length;
    while (rightIndex-- && !func(arr[rightIndex]));
    return arr.slice(0, rightIndex + 1);
  };

  /*
  Removes elements in an array until the passed function returns true. Returns the remaining elements in the array.
    Loop through the array, using Array.prototype.slice() to drop the first element of the array until the value returned from func is true.
    Return the remaining elements.
  */

  static dropWhile = (arr, func) => {
    while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
    return arr;
  };

  /*
  Checks if the given element is focused.
    Use Document.activeElement to determine if the given element is focused.
  */

  static elementIsFocused = el => (el === document.activeElement);  

  /*
  Checks if the element specified is visible in the viewport.
    Use Element.getBoundingClientRect(), Window.innerWidth and Window.innerHeight to determine if a given element is visible in the viewport.
    Omit the second argument to determine if the element is entirely visible, or specify true to determine if it is partially visible.
  */

  static elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
      ? ((top > 0 && top < innerHeight) ||
          (bottom > 0 && bottom < innerHeight)) &&
          ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
      : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  };  

  /*
  Checks if a given string ends with a substring of another string.
    Use a for...in loop and String.prototype.slice() to get each substring of the given word, starting at the end.
    Use String.prototype.endsWith() to check the current substring against the text.
    Return the matching substring, if found. Otherwise, return undefined.
  */

  static endsWithSubstring = (text, word) => {
    for (let i in word) {
      const substr = word.slice(0, i + 1);
      if (text.endsWith(substr)) return substr;
    }
    return undefined;
  };

  /*
  Performs a deep comparison between two values to determine if they are equivalent.
    Check if the two values are identical.
    Check if both values are Date objects with the same time, using Date.prototype.getTime().
    Check if both values are non-object values with an equivalent value (strict comparison).
    Check if only one value is null or undefined or if their prototypes differ.
    If none of the above conditions are met, use Object.keys() to check if both values have the same number of keys.
    Use Array.prototype.every() to check if every key in a exists in b and if they are equivalent by calling equals() recursively.
  */

  static equals = (a, b) => {
    if (a === b) return true;
  
    if (a instanceof Date && b instanceof Date)
      return a.getTime() === b.getTime();
  
    if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
      return a === b;
  
    if (a.prototype !== b.prototype) return false;
  
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length) return false;
  
    return keys.every(k => equals(a[k], b[k]));
  };

  /*
  Escapes a string for use in HTML.
    Use String.prototype.replace() with a regexp that matches the characters that need to be escaped.
    Use the callback function to replace each character instance with its associated escaped character using a dictionary object.
  */

  static escapeHTML = str =>
    str.replace(
      /[&<>'"]/g,
      tag =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
    );

  /*
  Escapes a string to use in a regular expression.
    Use String.prototype.replace() to escape special characters.
  */

  static escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  /*
  Converts Fahrenheit to Celsius.
    Follow the conversion formula C = (F - 32) * 5 / 9.
  */

  static fahrenheitToCelsius = degrees => (degrees - 32) * 5 / 9;

  /*
  Creates an array with the non-unique values filtered out.
    Use the Set constructor and the spread operator (...) to create an array of the unique values in arr.
    Use Array.prototype.filter() to create an array containing only the unique values.
  */

  static filterNonUnique = arr =>
    [...new Set(arr)].filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

  /*
  Creates an array with the unique values filtered out.
    Use the Set constructor and the spread operator (...) to create an array of the unique values in arr.
    Use Array.prototype.filter() to create an array containing only the non-unique values.
  */

  static filterUnique = arr =>
    [...new Set(arr)].filter(i => arr.indexOf(i) !== arr.lastIndexOf(i));

  /*
  Finds the anchor node closest to the given node, if any.
    Use a for loop and Node.parentNode to traverse the node tree upwards from the given node.
    Use Node.nodeName and String.prototype.toLowerCase() to check if any given node is an anchor ('a').
    If no matching node is found, return null.
  */

  static findClosestAnchor = node => {
    for (let n = node; n.parentNode; n = n.parentNode)
      if (n.nodeName.toLowerCase() === 'a') return n;
    return null;
  };

  /*
  Finds the closest matching node starting at the given node.
    Use a for loop and Node.parentNode to traverse the node tree upwards from the given node.
    Use Element.matches() to check if any given element node matches the provided selector.
    If no matching node is found, return null.
  */

  static findClosestMatchingNode = (node, selector) => {
    for (let n = node; n.parentNode; n = n.parentNode)
      if (n.matches && n.matches(selector)) return n;
    return null;
  };

  /*
  Executes a provided function once for each array element, starting from the array's last element.
    Use Array.prototype.slice() to clone the given array and Array.prototype.reverse() to reverse it.
    Use Array.prototype.forEach() to iterate over the reversed array.
  */

  static forEachRight = (arr, callback) =>
    arr
      .slice()
      .reverse()
      .forEach(callback);

  /*
  Encodes a set of form elements as an object.
    Use the FormData constructor to convert the HTML form to FormData and Array.from() to convert to an array.
    Collect the object from the array using Array.prototype.reduce().
  */

  static formToObject = form =>
    Array.from(new FormData(form)).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value
      }),
      {}
    );

  /*
  Returns the human-readable format of the given number of milliseconds.
    Divide ms with the appropriate values to obtain the appropriate values for day, hour, minute, second and millisecond.
    Use Object.entries() with Array.prototype.filter() to keep only non-zero values.
    Use Array.prototype.map() to create the string for each value, pluralizing appropriately.
    Use Array.prototype.join() to combine the values into a string.
  */

  static formatDuration = ms => {
    if (ms < 0) ms = -ms;
    const time = {
      day: Math.floor(ms / 86400000),
      hour: Math.floor(ms / 3600000) % 24,
      minute: Math.floor(ms / 60000) % 60,
      second: Math.floor(ms / 1000) % 60,
      millisecond: Math.floor(ms) % 1000
    };
    return Object.entries(time)
      .filter(val => val[1] !== 0)
      .map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`)
      .join(', ');
  };

  /*
  Formats a number using the local number format order.
    Use Number.prototype.toLocaleString() to convert a number to using the local number format separators.
  */  

  static formatNumber = num => num.toLocaleString();

  /*  
  Returns the ISO format of the given number of seconds.
    Divide s with the appropriate values to obtain the appropriate values for hour, minute and second.
    Store the sign in a variable to prepend it to the result.
    Use Array.prototype.map() in combination with Math.floor() and String.prototype.padStart() to stringify and format each segment.
    Use Array.prototype.join() to combine the values into a string.
  */
 
  static formatSeconds = s => {
    const [hour, minute, second, sign] =
      s > 0
        ? [s / 3600, (s / 60) % 60, s % 60, '']
        : [-s / 3600, (-s / 60) % 60, -s % 60, '-'];
  
    return (
      sign +
      [hour, minute, second]
        .map(v => `${Math.floor(v)}`.padStart(2, '0'))
        .join(':')
    );
  };

  /*
  Converts a string from camelcase.
    Use String.prototype.replace() to break the string into words and add a separator between them.
    Omit the second argument to use a default separator of _.
  */

  static fromCamelCase = (str, separator = '_') =>
    str
      .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
      .toLowerCase();

  /*
  fromCamelCase('someLabelThatNeedsToBeDecamelized', '-'); //'some-label-that-needs-to-be-decamelized'
  */

  /*
  Creates a Date object from a Unix timestamp.
    Convert the timestamp to milliseconds by multiplying with 1000.
    Use the Date constructor to create a new Date object.
  */

  static fromTimestamp = timestamp => new Date(timestamp * 1000);

  /*  
  Generates an array with the given amount of items, using the given function.
    Use Array.from() to create an empty array of the specific length, calling fn with the index of each newly created element.
    The callback takes one argument - the index of each element.
  */
  
  static generateItems = (n, fn) => Array.from({ length: n }, (_, i) => fn(i));

  /*
  Gets the current URL without any parameters or fragment identifiers.
    Use String.prototype.replace() with an appropriate regular expression to remove everything after either '?' or '#', if found.
  */

  static getBaseURL = url => url.replace(/[?#].*$/, '');

  /*
  Gets the command-line arguments passed to a Node.js script.
    Use process.argv to get an array of all command-line arguments.
    Use Array.prototype.slice() to remove the first two elements (path of the Node.js executable and the file being executed).
  */

  static getCmdArgs = () => process.argv.slice(2);

  /*
  // node my-script.js --name=John --age=30
  getCmdArgs(); // ['--name=John', '--age=30']
  */

  /*
  Returns a string of the form HH:MM:SS from a Date object.
    Use Date.prototype.toTimeString() and String.prototype.slice() to get the HH:MM:SS part of a given Date object.
  */

  static getColonTimeFromDate = date => date.toTimeString().slice(0, 8);

  //getColonTimeFromDate(new Date()); // '08:38:00'

  /*
  Calculates the difference (in days) between two dates.
    Subtract the two Date objects and divide by the number of milliseconds in a day to get the difference (in days) between them.
  */

  static getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / (1000 * 3600 * 24);

  //getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9

  /*
  Returns an array of HTML elements whose width is larger than that of the viewport's.
    Use HTMLElement.offsetWidth to get the width of the Document.
    Use Array.prototype.filter() on the result of Document.querySelectorAll() to check the width of all elements in the document.
  */

  static getElementsBiggerThanViewport = () => {
    const docWidth = document.documentElement.offsetWidth;
    return [...document.querySelectorAll('*')].filter(
      el => el.offsetWidth > docWidth
    );
  };

  //getElementsBiggerThanViewport(); // <div id="ultra-wide-item" />

  /*
  Calculates the difference (in hours) between two dates.
    Subtract the two Date objects and divide by the number of milliseconds in an hour to get the difference (in hours) between them.
  */

  static getHoursDiffBetweenDates = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / (1000 * 3600);

  /*
  getHoursDiffBetweenDates(
    new Date('2021-04-24 10:25:00'),
    new Date('2021-04-25 10:25:00')
  ); // 24
  */

  /* 
  Fetches all images from within an element and puts them into an array.

    Use Element.getElementsByTagName() to get all <img> elements inside the provided element.
    Use Array.prototype.map() to map every src attribute of each <img> element.
    If includeDuplicates is false, create a new Set to eliminate duplicates and return it after spreading into an array.
    Omit the second argument, includeDuplicates, to discard duplicates by default.
  */

  static getImages = (el, includeDuplicates = false) => {
    const images = [...el.getElementsByTagName('img')].map(img =>
      img.getAttribute('src')
    );
    return includeDuplicates ? images : [...new Set(images)];
  };

  /*
  getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
  getImages(document, false); // ['image1.jpg', 'image2.png', '...']
  */

  /*
  Calculates the difference (in minutes) between two dates.
    Subtract the two Date objects and divide by the number of milliseconds in a minute to get the difference (in minutes) between them.
  */

  static getMinutesDiffBetweenDates = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / (1000 * 60);

  /*
    getMinutesDiffBetweenDates(
    new Date('2021-04-24 01:00:15'),
    new Date('2021-04-24 02:00:15')
  ); // 60
  */

  /*
  Calculates the difference (in months) between two dates.
    Use Date.prototype.getFullYear() and Date.prototype.getMonth() to calculate the difference (in months) between two Date objects.
  */
 
  static getMonthsDiffBetweenDates = (dateInitial, dateFinal) =>
    Math.max(
      (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
        dateFinal.getMonth() -
        dateInitial.getMonth(),
      0
    );

  /*
  getMonthsDiffBetweenDates(new Date('2017-12-13'), new Date('2018-04-29')); // 4
  */

  /*
  Calculates the difference (in seconds) between two dates.
    Subtract the two Date objects and divide by the number of milliseconds in a second to get the difference (in seconds) between them.
  */

  static getSecondsDiffBetweenDates = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / 1000;

  /*
    getSecondsDiffBetweenDates(
    new Date('2020-12-24 00:00:15'),
    new Date('2020-12-24 00:00:17')
  ); // 2
  */

  /*
  Returns the scroll position of the current page.
    Use Window.pageXOffset and Window.pageYOffset if they are defined, otherwise Element.scrollLeft and Element.scrollTop.
    Omit the single argument, el, to use the global Window object.
  */

  static getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
  });

  /*
  getScrollPosition(); // {x: 0, y: 200}
  */

  /*
  Calculates the width of the window's vertical scrollbar.
    Use Window.innerWidth to get the interior width of the window.
    Use Element.clientWidth to get the inner width of the Document element.
    Subtract the two values to get the width of the vertical scrollbar.
  */

  static getScrollbarWidth = () =>
    window.innerWidth - document.documentElement.clientWidth;

  /*
  getScrollbarWidth(); // 15
  */

  /*
  Gets the currently selected text.
    Use Window.getSelection() and Selection.toString() to get the currently selected text.
  */

  static getSelectedText = () => window.getSelection().toString();

  /*
  getSelectedText(); // 'Lorem ipsum'
  */

  /*
  Retrieves the value of a CSS rule for the specified element.
    Use Window.getComputedStyle() to get the value of the CSS rule for the specified element.
  */

  static getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

  /*
  getStyle(document.querySelector('p'), 'font-size'); // '16px'
  */

  /*
  Gets the Unix timestamp from a Date object.
    Use Date.prototype.getTime() to get the timestamp in milliseconds and divide by 1000 to get the timestamp in seconds.
    Use Math.floor() to appropriately round the resulting timestamp to an integer.
    Omit the argument, date, to use the current date.
  */

  static getTimestamp = (date = new Date()) => Math.floor(date.getTime() / 1000);

  /*
  getTimestamp(); // 1602162242
  */

  /*
  Returns the native type of a value.
    Return 'undefined' or 'null' if the value is undefined or null.
    Otherwise, use Object.prototype.constructor and Function.prototype.name to get the name of the constructor.
  */

  static getType = v =>
    (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);

  /*
  getType(new Set([1, 2, 3])); // 'Set'
  */

  /*
  Creates an object containing the parameters of the current URL.
    Use String.prototype.match() with an appropriate regular expression to get all key-value pairs.
    Use Array.prototype.reduce() to map and combine them into a single object.
    Pass location.search as the argument to apply to the current url.
  */

  static getURLParameters = url =>
    (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
      (a, v) => (
        (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
      ),
      {}
    );

  /*  
  getURLParameters('google.com'); // {}
  getURLParameters('http://url.com/page?name=Adam&surname=Smith');
  // {name: 'Adam', surname: 'Smith'}
  */

  /*
  Finds the distance from a given element to the top of the document.
    Use a while loop and HTMLElement.offsetParent to move up the offset parents of the given element.
    Add HTMLElement.offsetTop for each element and return the result.
  */

  static getVerticalOffset = el => {
    let offset = el.offsetTop,
      _el = el;
    while (_el.offsetParent) {
      _el = _el.offsetParent;
      offset += _el.offsetTop;
    }
    return offset;
  };

  /*
  getVerticalOffset('.my-element'); // 120
  */

  /*
  Checks if the given element has the specified class.
    Use Element.classList and DOMTokenList.contains() to check if the element has the specified class.
  */

  static hasClass = (el, className) => el.classList.contains(className);

  /*
  hasClass(document.querySelector('p.special'), 'special'); // true
  */

  /*
  Checks if a number has any decimals digits
    Use the modulo (%) operator to check if the number is divisible by 1 and return the result.
  */

  static hasDecimals = num => num % 1 !== 0;

  /*    
  hasDecimals(1); // false
  hasDecimals(1.001); // true
  */

  /*
  Checks if there are duplicate values in a flat array.
    Use Set to get the unique values in the array.
    Use Set.prototype.size and Array.prototype.length to check if the count of the unique values is the same as elements in the original array.
  */

  static hasDuplicates = arr => new Set(arr).size !== arr.length;

  /*
  hasDuplicates([0, 1, 1, 2]); // true
  hasDuplicates([0, 1, 2, 3]); // false
  */

  /*
  Hides all the elements specified.
    Use the spread operator (...) and Array.prototype.forEach() to apply display: none to each element specified.
  */

  static hide = (...el) => [...el].forEach(e => (e.style.display = 'none'));

  /*
  hide(...document.querySelectorAll('img')); // Hides all <img> elements on the page
  */

  /*
  Redirects the page to HTTPS if it's currently in HTTP.
    Use location.protocol to get the protocol currently being used.
    If it's not HTTPS, use location.replace() to replace the existing page with the HTTPS version of the page.
    Use location.href to get the full address, split it with String.prototype.split() and remove the protocol part of the URL.
    Note that pressing the back button doesn't take it back to the HTTP page as its replaced in the history.
  */

  static httpsRedirect = () => {
    if (location.protocol !== 'https:')
      location.replace('https://' + location.href.split('//')[1]);
  };

  /*  
  httpsRedirect();
  // If you are on http://mydomain.com, you are redirected to https://mydomain.com
  */

  /*
  Checks if all the elements in values are included in arr.
    Use Array.prototype.every() and Array.prototype.includes() to check if all elements of values are included in arr.
  */

  static includesAll = (arr, values) => values.every(v => arr.includes(v));

  /*
  includesAll([1, 2, 3, 4], [1, 4]); // true
  includesAll([1, 2, 3, 4], [1, 5]); // false
  */

  /*
  Checks if at least one element of values is included in arr.
    Use Array.prototype.some() and Array.prototype.includes() to check if at least one element of values is included in arr.
  */  

  static includesAny = (arr, values) => values.some(v => arr.includes(v));

  /*
  includesAny([1, 2, 3, 4], [2, 9]); // true
  includesAny([1, 2, 3, 4], [8, 9]); // false
  */

  /*
  Checks if a string contains a substring, case-insensitive.
    Use the RegExp constructor with the 'i' flag to create a regular expression, that matches the given searchString, ignoring the case.
    Use RegExp.prototype.test() to check if the string contains the substring.
  */

  static includesCaseInsensitive = (str, searchString) =>
    new RegExp(searchString, 'i').test(str);

  /*
  includesCaseInsensitive('Blue Whale', 'blue'); // true
  */

  /*
  Injects the given CSS code into the current document
    Use Document.createElement() to create a new style element and set its type to text/css.
    Use Element.innerText to set the value to the given CSS string.
    Use Document.head and Element.appendChild() to append the new element to the document head.
    Return the newly created style element.
  */

  static injectCSS = css => {
    let el = document.createElement('style');
    el.type = 'text/css';
    el.innerText = css;
    document.head.appendChild(el);
    return el;
  };

  /*
  injectCSS('body { background-color: #000 }');
  // '<style type="text/css">body { background-color: #000 }</style>'
  */

  /*
  Inserts an HTML string after the end of the specified element.
    Use Element.insertAdjacentHTML() with a position of 'afterend' to parse htmlString and insert it after the end of el.
  */

  static insertAfter = (el, htmlString) =>
    el.insertAdjacentHTML('afterend', htmlString);

  /*
  insertAfter(document.getElementById('myId'), '<p>after</p>');
  // <div id="myId">...</div> <p>after</p>
  */

  /*
  Inserts an HTML string before the start of the specified element.
    Use Element.insertAdjacentHTML() with a position of 'beforebegin' to parse htmlString and insert it before the start of el.
  */

  static insertBefore = (el, htmlString) =>
    el.insertAdjacentHTML('beforebegin', htmlString);

  /*
  insertBefore(document.getElementById('myId'), '<p>before</p>');
  // <p>before</p> <div id="myId">...</div>
  */

  /*
  Checks if a date is after another date.
    Use the greater than operator (>) to check if the first date comes after the second one.
  */

  static isAfterDate = (dateA, dateB) => dateA > dateB;

  //isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)); // true


  /*
  Checks if the given string is an absolute URL.
      Use RegExp.prototype.test() to test if the string is an absolute URL.
  */

  static isAbsoluteURL = str => /^[a-z][a-z0-9+.-]*:/.test(str);

  /*
  isAbsoluteURL('https://google.com'); // true
  isAbsoluteURL('ftp://www.myserver.net'); // true
  isAbsoluteURL('/foo/bar'); // false
  */

  /*
  Checks if a string contains only alpha characters.
    Use RegExp.prototype.test() to check if the given string matches against the alphabetic regexp pattern.
  */

  static isAlpha = str => /^[a-zA-Z]*$/.test(str);

  /*
  isAlpha('sampleInput'); // true
  isAlpha('this Will fail'); // false
  isAlpha('123'); // false
  */

  /*
  Checks if a string contains only alphanumeric characters.
    Use RegExp.prototype.test() to check if the input string matches against the alphanumeric regexp pattern.
  */

  static isAlphaNumeric = str => /^[a-z0-9]+$/gi.test(str);

  /*
  isAlphaNumeric('hello123'); // true
  isAlphaNumeric('123'); // true
  isAlphaNumeric('hello 123'); // false (space character is not alphanumeric)
  isAlphaNumeric('#$hello'); // false
  */

  /*
  Checks if a string is an anagram of another string (case-insensitive, ignores spaces, punctuation and special characters).
    Use String.prototype.toLowerCase() and String.prototype.replace() with an appropriate regular expression to remove unnecessary characters.
    Use String.prototype.split(), Array.prototype.sort() and Array.prototype.join() on both strings to normalize them, then check if their normalized forms are equal.
  */

  static isAnagram = (str1, str2) => {
    const normalize = str =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, '')
        .split('')
        .sort()
        .join('');
    return normalize(str1) === normalize(str2);
  };

  //isAnagram('iceman', 'cinema'); // true

  /*
  Checks if the given argument is an async function.
    Use Object.prototype.toString() and Function.prototype.call() and check if the result is '[object AsyncFunction]'.
  */

  static isAsyncFunction = val =>
    Object.prototype.toString.call(val) === '[object AsyncFunction]';

  /*
  isAsyncFunction(function() {}); // false
  isAsyncFunction(async function() {}); // true
  */

  /*
  Checks if a date is before another date.
    Use the less than operator (<) to check if the first date comes before the second one.
  */  

  static isBeforeDate = (dateA, dateB) => dateA < dateB;

  //isBeforeDate(new Date(2010, 10, 20), new Date(2010, 10, 21)); // true

  /*
  Checks if a date is between two other dates.
    Use the greater than (>) and less than (<) operators to check if date is between dateStart and dateEnd.
  */

  static isBetweenDates = (dateStart, dateEnd, date) =>
    date > dateStart && date < dateEnd;

  /*
  isBetweenDates(
    new Date(2010, 11, 20),
    new Date(2010, 11, 30),
    new Date(2010, 11, 19)
  ); // false
  isBetweenDates(
    new Date(2010, 11, 20),
    new Date(2010, 11, 30),
    new Date(2010, 11, 25)
  ); // true
  */

  /*
  Checks if the browser tab of the page is focused.
    Use the Document.hidden property, introduced by the Page Visibility API to check if the browser tab of the page is visible or hidden.
  */

  static isBrowserTabFocused = () => !document.hidden;

  //isBrowserTabFocused(); // true

  /*
  Checks if a valid date object can be created from the given values.
    Use the spread operator (...) to pass the array of arguments to the Date constructor.
    Use Date.prototype.valueOf() and Number.isNaN() to check if a valid Date object can be created from the given values.
  */

  static isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

  /*
  isDateValid('December 17, 1995 03:24:00'); // true
  isDateValid('1995-12-17T03:24:00'); // true
  isDateValid('1995-12-17 T03:24:00'); // false
  isDateValid('Duck'); // false
  isDateValid(1995, 11, 17); // true
  isDateValid(1995, 11, 17, 'Duck'); // false
  isDateValid({}); // false
  */

  /*
  Checks if the given string is valid in the simplified extended ISO format (ISO 8601).
    Use the Date constructor to create a Date object from the given string.
    Use Date.prototype.valueOf() and Number.isNaN() to check if the produced date object is valid.
    Use Date.prototype.toISOString() to compare the ISO formatted string representation of the date with the original string.
  */

  static isISOString = val => {
    const d = new Date(val);
    return !Number.isNaN(d.valueOf()) && d.toISOString() === val;
  };

  /*
  isISOString('2020-10-12T10:10:10.000Z'); // true
  isISOString('2020-10-12'); // false
  */

  /*
  Checks if the given year is a leap year.
    Use the Date constructor, setting the date to February 29th of the given year.
    Use Date.prototype.getMonth() to check if the month is equal to 1.
    */

  static isLeapYear = year => new Date(year, 1, 29).getMonth() === 1;

  /*
  isLeapYear(2019); // false
  isLeapYear(2020); // true
  */

  /*
  Checks if localStorage is enabled.
    Use a try...catch block to return true if all operations complete successfully, false otherwise.
    Use Storage.setItem() and Storage.removeItem() to test storing and deleting a value in Window.localStorage.
  */

  static isLocalStorageEnabled = () => {
    try {
      const key = `__storage__test`;
      window.localStorage.setItem(key, null);
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  };

  //isLocalStorageEnabled(); // true, if localStorage is accessible

  /*
  Checks if a string is lower case.
    Convert the given string to lower case, using String.prototype.toLowerCase() and compare it to the original.
  */

  static isLowerCase = str => str === str.toLowerCase();

  /*
  isLowerCase('abc'); // true
  isLowerCase('a3@$'); // true
  isLowerCase('Ab4'); // false
  */

  /*
  Checks if the specified value is null or undefined.
    Use the strict equality operator to check if the value of val is equal to null or undefined.
  */

  static isNil = val => val === undefined || val === null;

  /*
  isNil(null); // true
  isNil(undefined); // true
  isNil(''); // false
  */

  /*
  Checks if the specified value is null.
    Use the strict equality operator to check if the value of val is equal to null.
  */

  static isNull = val => val === null;

  //isNull(null); // true

  /*
  Checks if the given argument is a number.
    Use typeof to check if a value is classified as a number primitive.
    To safeguard against NaN, check if val === val (as NaN has a typeof equal to number and is the only value not equal to itself).
  */

  static isNumber = val => typeof val === 'number' && val === val;

  /*
  isNumber(1); // true
  isNumber('1'); // false
  isNumber(NaN); // false
  */

  /*
  Checks if the passed value is an object or not.
    Uses the Object constructor to create an object wrapper for the given value.
    If the value is null or undefined, create and return an empty object.
    Otherwise, return an object of a type that corresponds to the given value.
  */

  static isObject = obj => obj === Object(obj);

  /*
  isObject([1, 2, 3, 4]); // true
  isObject([]); // true
  isObject(['Hello!']); // true
  isObject({ a: 1 }); // true
  isObject({}); // true
  isObject(true); // false
  */



}