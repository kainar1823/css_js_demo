const form1 = document.getElementById("form1");

form1.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let fd = new FormData(evt.target);

    var object = {};
    fd.forEach((value, key) => (object[key] = value));
    let json = JSON.stringify(object);

    let h = "<h3>Submit test result:</h3>";
    h += `<p><code>${json}</code></p>`;
    document.getElementById("submit-test").innerHTML = h;
});
