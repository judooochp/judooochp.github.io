function enableOutput() {
    document.getElementById("submit").disabled = false;
    document.getElementById("submit").value = "let's get to it!";
}

function disableOutput() { 
    var i;
    var outputs = document.getElementsByClassName("output");
    document.getElementById("submit").disabled = true;
    document.getElementById("submit").value = "we're not quite ready.";
}

function parseURLParams(url) {
// This function is from https://stackoverflow.com/questions/814613/how-to-read-get-data-from-a-url-using-javascript
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

function newInput(i) {
    var newInput = document.createElement("input");
        newInput.setAttribute("type", "number");
        newInput.setAttribute("name", "meas" + i);
        newInput.setAttribute("onchange", "validateInputs();");
        newInput.setAttribute("class", "arc");
        newInput.required = true;
    return newInput;
}

function newHiddenElement(id, params) {
    /*******************
    
    THIS IS WHERE WE ARE STARTING!!!
    
    THE FUNCTION NEEDS TO ADD HIDDEN ELEMENTS THAT WILL END UP 
    AS HEADER INFORMATION OR MATHEMATICAL INFORMATION IN THE CREATION OF OUR
    CANVAS MAPS
    
    MUST GET THE INFORMATION FROM PARAMS AND PLACE IT IN THE ELEMENT WITH PROPER ATTRIBUTES, MUCH LIKE THE NEWINPUT() FUNCTION
    
    *******************/
    return newInput;
}

function populateLines() {
    var url = window.location.href;
    var params = parseURLParams(url);
    var i = 0;
    
    for (i; i < params["diagMeas"]; i++) {
        
        document.getElementById("line1").appendChild(newInput(i));
        document.getElementById("line1").appendChild(document.createElement("br"));
        document.getElementById("line2").appendChild(newInput(i));
        document.getElementById("line2").appendChild(document.createElement("br"));
        
        if (i < params["lenMeas"]) {
            document.getElementById("line3").appendChild(newInput(i));
            document.getElementById("line3").appendChild(document.createElement("br"));
            document.getElementById("line5").appendChild(newInput(i));
            document.getElementById("line5").appendChild(document.createElement("br"));
            document.getElementById("line8").appendChild(newInput(i));
            document.getElementById("line8").appendChild(document.createElement("br"));
        }
        
        if (i < params["widMeas"]) {
            document.getElementById("line4").appendChild(newInput(i));
            document.getElementById("line4").appendChild(document.createElement("br"));
            document.getElementById("line6").appendChild(newInput(i));
            document.getElementById("line6").appendChild(document.createElement("br"));
            document.getElementById("line7").appendChild(newInput(i));
            document.getElementById("line7").appendChild(document.createElement("br"));
        }
    }
    
    document.getElementById("plate").appendChild(newHiddenElement("id"), params);
    document.getElementById("plate").appendChild(newHiddenElement("mfr"), params);
    document.getElementById("plate").appendChild(newHiddenElement("sn"), params);
    document.getElementById("plate").appendChild(newHiddenElement("wid"), params);
    document.getElementById("plate").appendChild(newHiddenElement("len"), params);
    document.getElementById("plate").appendChild(newHiddenElement("grade"), params);
    document.getElementById("plate").appendChild(newHiddenElement("north"), params);
    document.getElementById("plate").appendChild(newHiddenElement("diagMeas"), params);
    document.getElementById("plate").appendChild(newHiddenElement("lenMeas"), params);
    document.getElementById("plate").appendChild(newHiddenElement("widMeas"), params);
}

function validateInputs() {
    var input = document.getElementsByTagName("input");
    var i = 0;
    var flag = false;
    
    for (i; i < input.length; i++) {
        if (input[i].value == "") flag = true;
    }
    
    if (flag == false) enableOutput();
    else disableOutput();
}