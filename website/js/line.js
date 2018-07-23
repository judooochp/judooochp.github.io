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
  var meas = [21.23, 19.90, 20.17, 21.00, 21.20, 21.30, 21.83, 21.77, 21.43, 22.60,
              20.60, 20.30, 21.07, 21.43, 21.07, 20.93, 21.30, 21.57, 21.23, 21.70, 
              22.07, 22.07, 22.10, 23.07, 22.67, 22.30, 22.47, 22.53, 
              20.57, 20.20, 20.17, 20.30, 21.20, 20.77, 
              -22.27, -21.57, -21.57, -21.70, -21.47, -21.83, -21.67, -21.40, 
              20.87, 22.33, 21.77, 22.23, 22.13, 22.53, 
              22.70, 23.07, 23.03, 22.80, 24.23, 23.30, 
              -23.50, -23.27, -23.30, -23.77, -23.00, -23.00, -22.77, -22.70, 
             ]
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