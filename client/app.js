function ready(fn) {
    if (document.readyState != "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

var getValues = function(params) {
    // grab our form values
    var name = document.querySelector("input[name=lion-name]").value;
    var pride = document.querySelector("input[name=lion-pride]").value;
    var age = document.querySelector("input[type=number]").value;
    var gender = document.querySelector("select");
    gender = gender.options[gender.selectedIndex].value;

    document.querySelector("input[name=lion-name]").value = "";
    document.querySelector("input[name=lion-pride]").value = "";
    document.querySelector("input[type=number]").value = "";

    return {
        name: name,
        pride: pride,
        age: age,
        gender: gender
    };
};

// Serves as a cache for the front-end so we don't have to make multiple trips to the back end to get data
var lions = [];

ready(function() {
    var form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault;

        var values = getValues();
        // console.log(values);

        fetch("/lions", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        })
            .then(function(res) {
                return res.json();
            })
            .then(function(createdLion) {
                lions.push(createdLion);
                // TODO update to lions list
                console.log(lions);
            });
        return false;
    });
});
