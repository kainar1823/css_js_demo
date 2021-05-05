let num_arr = [16, 18, 23, 58, 85, 86, 99, 66, 2080, 55, 58];
let str_arr = ["kyle", "mina", "ronnie", "michael", "mark", "john", "meryl", "dustin"];
let obj_arr = [
    {
        name: "Ronnie O'Sullivan",
        birth_day: new Date(1975, 11, 5),
        age: 45,
        titles: ["world champion", "UK champion", "the masters", "British Open", "Scottish Open"],
    },
    {
        name: "Judd Trump",
        birth_day: new Date(1989, 7, 20),
        age: 31,
        titles: ["world champion", "welsh open", "china open"],
    },
    {
        name: "Stephen Hendry",
        birth_day: new Date(1969, 0, 13),
        age: 52,
        titles: ["world champion", "UK champion", "the masters", "British Open", "Asian Open", "Scottish Open"],
    },
];

let copyOfarr;

const log = (value, caption = "array log:", as_table = false) => {
    console.log(caption);
    if (!as_table) console.log(value);
    else console.table(value);
    console.log("================================");
    console.log(" ");
};

log(num_arr, "array with numbers:");
log(str_arr, "array with strings:");
log(obj_arr, "array with objects:", true);
