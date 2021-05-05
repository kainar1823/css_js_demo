/**
 * Array Sorting
 */

// sort()
log([...str_arr].sort(), "The sort() method sorts an array alphabetically");

// reverse()
console.log(num_arr);
log([...num_arr].reverse(), "The reverse() method reverses the elements in an array.");

// Numeric sort
/**
 * Compare function:
 *  function(a, b){return a - b}
 *
 * If the result is negative a is sorted before b.
 * If the result is positive b is sorted before a.
 * If the result is 0 no changes are done with the sort order of the two values.
 */
console.log(num_arr);
log(
    [...num_arr].sort((a, b) => {
        return a - b;
    }),
    "sorting nums by providing Compare function."
);
log(
    [...num_arr].sort((a, b) => {
        return b - a;
    }),
    "sorting nums descending by providing Compare function."
);
/**
 * Sorting in Random Order
 */
log(
    [...num_arr].sort((a, b) => {
        return 0.5 - Math.random();
    }),
    "Sorting in random order"
);
/**
 * The Fisher Yates Method
 */
copyOfarr = [...num_arr];
for (i = copyOfarr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * i);
    k = copyOfarr[i];
    copyOfarr[i] = copyOfarr[j];
    copyOfarr[j] = k;
}
log(copyOfarr, "Soring in random order by using The Fisher Yates Method.");

// Find the Highest (or Lowest) Array Value
log(
    [...num_arr].sort((a, b) => {
        return b - a;
    })[0],
    "Find the highest val by using sort() method"
);
log(Math.max.apply(null, num_arr), "Find the highest val by using Math.max.apply() method");
log(Math.max(...num_arr), "Math.max.apply(null, [1, 2, 3]) is equivalent to Math.max(1, 2, 3).");

log(Math.min.apply(null, num_arr), "Find the lowest val by using Math.min.apply() method");
log(Math.min(...num_arr), "Math.min.apply(null, [1, 2, 3]) is equivalent to Math.min(1, 2, 3).");

// Home made Min/Max method
const myArrayMax = (arr) => {
    let len = arr.length;
    let max = -Infinity;
    while (len--) {
        if (arr[len] > max) {
            max = arr[len];
        }
    }
    return max;
};
log(myArrayMax(num_arr), 'The fastest solution is to use a "home made" method. (myArrayMax)');

const myArrayMin = (arr) => {
    let len = arr.length;
    let min = Infinity;
    while (len--) {
        if (arr[len] < min) {
            min = arr[len];
        }
    }
    return min;
};
log(myArrayMin(num_arr), 'The fastest solution is to use a "home made" method. (myArrayMin)');

// Sorting Object Array
log(
    [...obj_arr].sort((a, b) => {
        return b.age - a.age;
    }),
    "Sort obj_arr by age, using sort(compare func)"
);

log(
    [...obj_arr].sort((a, b) => {
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) return -1;
        if (x > y) return 1;
        return 0;
    }),
    "Sort obj_arr by name, using sort(compare func). Comparing string properties is a little more complex"
);
