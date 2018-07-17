function enableOutput() {
    document.getElementById("submit").disabled = false;
    document.getElementById("submit").value = "generate my maps!";
}

function disableOutput() { 
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
        newInput.setAttribute("step", "0.01");
        newInput.setAttribute("name", "meas" + i);
        newInput.setAttribute("onchange", "validateInputs();");
        newInput.setAttribute("class", "arc");
        newInput.required = true;
    return newInput;
}

function newHiddenElement(id, params) {
  
    var newInput = document.createElement("input");
        newInput.setAttribute("type", "hidden");
        newInput.setAttribute("name", id);
        newInput.setAttribute("value", params[id]);
    return newInput;
}

function populateLines() {  
    var url = window.location.href;
    var params = parseURLParams(url);
    var i = 0;
    var lineEnd = Number(params["diagMeas"]);
    for (i; i < lineEnd; i++) {   
        document.getElementById("line1").appendChild(newInput(i));
        document.getElementById("line1").appendChild(document.createElement("br"));
    }
    lineEnd += Number(params["diagMeas"]);
    for (i; i < lineEnd; i++) {
        document.getElementById("line2").appendChild(newInput(i));
        document.getElementById("line2").appendChild(document.createElement("br"));
    }
    lineEnd += Number(params["lenMeas"]);
    for (i; i < lineEnd; i++) {
        document.getElementById("line3").appendChild(newInput(i));
        document.getElementById("line3").appendChild(document.createElement("br"));
    }
    lineEnd += Number(params["widMeas"]);
    for (i; i < lineEnd; i++) {
        document.getElementById("line4").appendChild(newInput(i));
        document.getElementById("line4").appendChild(document.createElement("br"));
    }
    lineEnd += Number(params["lenMeas"]);
    for (i; i < lineEnd; i++) {
        document.getElementById("line5").appendChild(newInput(i));
        document.getElementById("line5").appendChild(document.createElement("br"));
    }
    lineEnd += Number(params["widMeas"]);
    for (i; i < lineEnd; i++) {
        document.getElementById("line6").appendChild(newInput(i));
        document.getElementById("line6").appendChild(document.createElement("br"));
    }
    lineEnd += Number(params["widMeas"]);
    for (i; i < lineEnd; i++) {
        document.getElementById("line7").appendChild(newInput(i));
        document.getElementById("line7").appendChild(document.createElement("br"));
    }
    lineEnd += Number(params["lenMeas"]);
    for (i; i < lineEnd; i++) {
        document.getElementById("line8").appendChild(newInput(i));
        document.getElementById("line8").appendChild(document.createElement("br"));
    }
    
    document.getElementById("plate").appendChild(newHiddenElement("cust", params));
    document.getElementById("plate").appendChild(newHiddenElement("id", params));
    document.getElementById("plate").appendChild(newHiddenElement("mfr", params));
    document.getElementById("plate").appendChild(newHiddenElement("sn", params));
    document.getElementById("plate").appendChild(newHiddenElement("wid", params));
    document.getElementById("plate").appendChild(newHiddenElement("len", params));
    document.getElementById("plate").appendChild(newHiddenElement("grade", params));
    document.getElementById("plate").appendChild(newHiddenElement("north", params));
    document.getElementById("plate").appendChild(newHiddenElement("diagMeas", params));
    document.getElementById("plate").appendChild(newHiddenElement("lenMeas", params));
    document.getElementById("plate").appendChild(newHiddenElement("widMeas", params));
  
  
  //  QUICK FILL-IN OF LINES FOR EASE OF PROGRAMMING
  //  REMOVE THIS "FOR" AS SOON AS YOU'RE DONE
  var inputs = document.getElementsByTagName("input");
  var meas = [1.32, 0.90, 0.10, -1.43, 0.20, 0.07, 0.13, 0.10, 1.00, 0.87,  
             2.50, 2.37, 2.50, 1.87, 3.40, 3.33, 2.77, 3.33, 3.57, 3.83, 
             4.43, 4.53, 3.83, 3.00, 3.67, 4.60, 4.50, 5.30, 
             7.80, 7.97, 7.50, 6.70, 6.77, 7.20, 
             5.73, 5.40, 5.00, 4.67, 6.07, 6.00, 6.80, 7.17, 
             -0.40, -1.47, -2.10, -1.60, -1.83, -2.00, 
             11.93, 11.40, 10.10, 9.57, 9.23, 8.23, 
             8.93, 8.47, 7.37, 6.23, 7.57, 7.60, 7.77, 8.23, ]
  for (var o = 0; o < inputs.length; o++) {
    if (inputs[o].getAttribute("type") == "number") {
      inputs[o].value = meas[o];
    }
  }
  enableOutput();
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