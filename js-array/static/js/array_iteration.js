/**
 * Array Iteration
 */

// Array.forEach()
/**
 * the function takes 3 arguments:
 * The item value
 * The item index
 * The array itself
 */
let txt = "";
[...num_arr].forEach((value, index, array) => {
    txt += value * 2 + " | ";
});
log(txt, "Demo of Array.forEach()");

// Array.map()
/**
 * The map() method creates a new array by performing a function on each array element.
 * The map() method does not execute the function for array elements without values.
 * The map() method does not change the original array.
 */
log(
    num_arr.map((value, index, array) => {
        return value * 2;
    }),
    "This example multiplies each array value by 2"
);
log(num_arr, "The map() method does not change the original array");

// Array.filter()
/**
 * The filter() method creates a new array with array elements that passes a test.
 */
log(
    num_arr.filter((value, index, array) => {
        return value > 80;
    }),
    "Creates a new array from elements with a value larger than 80"
);
log(
    obj_arr.filter((item) => {
        return item.age > 35;
    }),
    "Filter obj_arr with age of the element larger than 35"
);

// Array.reduce()
/**
 * The reduce() method runs a function on each array element to produce (reduce it to) a single value.
 * The reduce() method works from left-to-right in the array. See also reduceRight().
 * The reduce() method does not reduce the original array.
 *
 * the function takes 4 arguments:
 * The total (the initial value / previously returned value)
 * The item value
 * The item index
 * The array itself
 */
log(
    num_arr.reduce((total, value, index, array) => {
        return total + value;
    }),
    "Finds the sum of all numbers in num_arr"
);
log(
    num_arr.reduce((total, value, index, array) => {
        return total + value;
    }, 1000000),
    "The reduce() method can accept an initial value"
);

// Array.reduceRight()
/**
 * Same as reduce(), but works from right-to-left in the array.
 */

// Array.every()
/**
 * The every() method check if all array values pass a test.
 */
log(
    num_arr.every((value, index, array) => {
        return value > 50;
    }),
    "Array.every(), Check if ALL array values are larger then 50"
);

// Array.some()
/**
 * The some() method check if some array values pass a test.
 */
log(
    num_arr.some((value, index, array) => {
        return value > 50;
    }),
    "Array.some(), Check if SOME array values are larger then 50"
);

// Array.indexOf()
/**
 * The indexOf() method searches an array for an element value and returns its position.
 *
 * array.indexOf(item, start)
 * item - Required. The item to search for.
 * start - Optional. Where to start the search.
 *      Negative values will start at the given position counting from the end, and search to the end.
 */
console.log(num_arr);
log(num_arr.indexOf(58), "Search num_arr for the value 58");

// Array.lastIndexOf()
/**
 * Same as Array.indexOf(), but returns the position of the last occurrence of the specified element.
 */
console.log(num_arr);
log(num_arr.lastIndexOf(58), "Array.lastIndexOf(), Search num_arr for the value 58");

// Array.find()
/**
 * The find() method returns the value of the first array element that passes a test function.
 */
log(
    num_arr.find((value, index, array) => {
        return value > 80;
    }),
    "Find the first element that is larget than 80"
);

// Array.findIndex()
/**
 * The findIndex() method returns the index of the first array element that passes a test function.
 */
log(
    num_arr.findIndex((value, index, array) => {
        return value > 80;
    }),
    "Find the index of the first element that is larget than 80"
);
