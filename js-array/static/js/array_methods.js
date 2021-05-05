/**
 * Array Methods
 */

// toString()
log(num_arr.toString(), "convert num_arr to string");
log(str_arr.toString(), "convert str_arr to string");
log(obj_arr.toString(), "convert obj_arr to string");

// join()
log(num_arr.join("|"), "join num_arr with |:");
log(str_arr.join("|"), "join str_arr with |:");
log(obj_arr.join("|"), "join obj_arr with |:");

// pop()
copyOfarr = [...num_arr];
let poped_element = copyOfarr.pop();
log(copyOfarr, "using pop() to remove last element from the arrary");
log(poped_element, "pop() returns the value that was 'popped out'");

// push()
copyOfarr = [...num_arr];
let push_new_len = copyOfarr.push(555);
log(copyOfarr, "using push() to add new element to the array (at the end)");
log(push_new_len, "push() returns the new array length");

// shift()
copyOfarr = [...num_arr];
let shifted_element = copyOfarr.shift();
log(copyOfarr, "using shift() to remove first element from the arrary");
log(shifted_element, "shift() returns the value that was 'shifted out'");

// unshift()
copyOfarr = [...num_arr];
let unshift_new_len = copyOfarr.unshift(555);
log(copyOfarr, "using unshift() to add new element to the array (at the beginning)");
log(unshift_new_len, "unshift() returns the new array length");

// delete
copyOfarr = [...num_arr];
delete copyOfarr[0];
console.log("Using delete may leave undefined holes in the array. Use pop() or shift() instead.");
log(copyOfarr, "delete arr[0], changes the first element to 'undefined'");

// splice()
copyOfarr = [...num_arr];
/**
 * param 1: the position where new elements should be added (spliced in).
 * param 2: how many elements should be removed.
 * rest of the params: the new elements to be added.
 */
let deleted_items = copyOfarr.splice(2, 3, 88888, 77777);
console.log("Original array: ", num_arr.toString());
log(copyOfarr, "Add 88888, 77777 to the array at position of 2, meanwhile remove 3 elments.");
log(deleted_items, "splice() returns the array of deleted elements");

copyOfarr = [...num_arr];
copyOfarr.splice(1, 1);
log(copyOfarr, "Using splice() to remove elements. splice(1, 1);");

// concat()
log(num_arr.concat(str_arr), "Creates a new array by merging (concatenating) existing arrays");
log(num_arr.concat(str_arr, obj_arr), "The concat() method can take any number of array arguments");
log(str_arr.concat("ABC", "DEF"), "The concat() method can also take strings as arguments");

// slice()
log(num_arr.slice(2), "The slice() method slices out a piece of an array into a NEW ARRAY. It does not remove any elements from the source array");
log(num_arr.slice(1, 3), "The slice() method can take two arguments like slice(1, 3).");
