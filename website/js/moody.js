function enableOutput() {
    var i;
    var outputs = document.getElementsByClassName("output");
    document.getElementById("submit").disabled = false;
    document.getElementById("submit").value = "let's get to it!";
    for (i = 0; i < outputs.length; i++) {
        outputs[i].style.display = "table-cell";
    }
}

function disableOutput() { 
    var i;
    var outputs = document.getElementsByClassName("output");
    document.getElementById("submit").disabled = true;
    document.getElementById("submit").value = "we're not quite ready.";
    document.getElementsByName("diagMeas")[0].value = "";
    document.getElementsByName("widMeas")[0].value = "";
    document.getElementsByName("lenMeas")[0].value = "";
    document.getElementById("widMargin").innerHTML = "";
    document.getElementById("lenMargin").innerHTML = "";
    document.getElementById("diagMeas").innerHTML = "";
    document.getElementById("widMeas").innerHTML = "";
    document.getElementById("lenMeas").innerHTML = "";
    for (i = 0; i < outputs.length; i++) {
        outputs[i].style.color = "#eee";
    }
}

function validateInputs() {
    var id = document.getElementsByName("id")[0].value;
    var mfr = document.getElementsByName("mfr")[0].value;
    var sn = document.getElementsByName("sn")[0].value;
    var wid = document.getElementsByName("wid")[0].value;
    var len = document.getElementsByName("len")[0].value;
    var grade = document.getElementsByName("grade")[0].value;

    var outputs = document.getElementsByClassName("output");

    if (id == "" || mfr == "" || sn == "" || wid == "" || len == "") {
        disableOutput();
    } else {
        updateMeas(wid, len, grade);
    }
}

function getRep(diag, grade) {
    if (diag <= 30) {
        switch (grade) {
            case "AA": return 35; break;
            case "A": return 60; break;
            case "B": return 110; break;
        }
    } else if (diag <= 60) {
        switch (grade) {
            case "AA": return 45; break;
            case "A": return 70; break;
            case "B": return 120; break;
        }
    } else if (diag <= 90) {
        switch (grade) {
            case "AA": return 60; break;
            case "A": return 80; break;
            case "B": return 160; break;
        }
    } else if (diag <= 120) {
        switch (grade) {
            case "AA": return 75; break;
            case "A": return 100; break;
            case "B": return 200; break;
        }
    } else if (diag <= 150) {
        switch (grade) {
            case "AA": return 90; break;
            case "A": return 120; break;
            case "B": return 240; break;
        }
    } else if (diag > 150) {
        switch (grade) {
            case "AA": return 100; break;
            case "A": return 140; break;
            case "B": return 280; break;
        }
    } else {
        return Error("You have come up with a negative diagonal. This should have been impossible. Please let the developer know.");
    }
}

// The standard ASME B89.3.7-2013 states that the dimensions of a surface plate's working surface are nominal only, and that any plate with dimensions within 5% of the nominal value are considered that nominal value. Hence, if a user attempts to enter the exact value, we are capturing that plus/minus 5% with a >= x * 0.95 and <= x * 1.05 
function fivePercent(value, nominal) {
    if (value >= nominal * 0.95 && value <= nominal * 1.05) {
        return true;
    }
    else return false;
}

// This function is basically a programatic reproduction of the flatness columns of Table 1 of that standard.
function getFlat(wid, len, diag, grade) {
    var base;
    if (fivePercent(wid, 12)) {
        if (fivePercent(len, 12) || fivePercent(len, 18)) base = 50;
    } else if (fivePercent(wid, 18)) {
        if (fivePercent(len, 18)) base = 50;
        else if (fivePercent(len, 24)) base = 80;
    } else if (fivePercent(wid, 24)) {
        if (fivePercent(len, 24)) base = 80;
        else if (fivePercent(len, 36)) base = 100;
        else if (fivePercent(len, 48)) base = 150;
    } else if (fivePercent(wid, 30) && fivePercent(len, 48)) base = 180;
    else if (fivePercent(wid, 36)) {
        if (fivePercent(len, 36)) base = 150;
        else if (fivePercent(len, 48)) base = 200;
        else if (fivePercent(len, 60)) base = 250;
        else if (fivePercent(len, 72)) base = 300;
    } else if (fivePercent(wid, 48)) {
        if (fivePercent(len, 48)) base = 200;
        else if (fivePercent(len, 60)) base = 300;
        else if (fivePercent(len, 72)) base = 350;
        else if (fivePercent(len, 96)) base = 500;
        else if (fivePercent(len, 120)) base = 700;
    } else if (fivePercent(wid, 60) && fivePercent(len, 120)) base = 750;
    else if (fivePercent(wid, 72)) {
        if (fivePercent(len, 72)) base = 600;
        else if (fivePercent(len, 144)) base = 1100;
    } 
    if (base == null) {
        base = diag * diag;
        base /= 25;
        base += 40;
        if (base % 25 == 0) return base;
        else if (base % 25 < 12.5) base -= base % 25;
        else if (base % 25 >= 12.5) base += 25 - (base % 25);
        base = Math.round(base);
        return base;
    }
    
    switch (grade) {
        case "AA": return base; break;
        case "A": return base * 2; break;
        case "B": return base * 4; break;
        default: return Error("Somehow, a grade option came through that was not on the list. Please let the developer know."); break;
    }
}

function getClose(flat) {
    if (flat > 400) {
        return Math.round(flat / 10);
    } else {
        return 40;
    }
}

function updateMeas(wid, len, grade) {
    if (grade == "data only") {
        document.getElementById("repeat").innerHTML= "n/a";
        document.getElementById("flatness").innerHTML= "n/a";
        document.getElementById("closure").innerHTML= "<10% of Found Flatness";
        return;
    }
    
    wid = Number(wid);
    len = Number(len);
    
    if (len < wid) {
        var hold = wid;
        wid = len;
        len = hold;
        document.getElementsByName("wid")[0].value = wid;
        document.getElementsByName("len")[0].value = len;
    }

    if (wid < 24 || len < 24) {
        disableOutput();
        alert("This procedure is only appropriate for plates 24 x 24 and larger.");
    } else {
        
        //Pythag that shit.
        var plateDiag = Math.sqrt(Math.pow(wid, 2) + Math.pow(len, 2));
        
        //Do some math
        //Figure most convenient margins
        //Figure number of measurements (must be even) along diagonal w/ 4-inch footspacing
        //Figure number of measurements (must be even) along widths and lengths
        
        var widMargin;
        var lenMargin;
        
        //If there is enough width to the plate to get at least 8 measurements along the length, go ahead and use a 4-inch margin, since the Moody Method prefers one foot-spacing-sized margins anyway.
        if ((wid - 8) / 4 > 8) {
            lenMargin = 4;
        } else {
            lenMargin = Math.ceil(wid * 0.0334);
            if (lenMargin < 1) lenMargin = 1;
        }
        
        //Same for the length for measurements along the width.
        if ((len - 8) / 4 > 8) {
            widMargin = 4;
        } else {
            widMargin = Math.ceil(len * 0.0334);
            if (widMargin < 1) widMargin = 1;
        }
    
        var newDiag = Math.floor((Math.sqrt(Math.pow(wid - lenMargin * 2.0, 2) + Math.pow(len - widMargin * 2.0, 2)) / 4.0) / 2 + 0.5 ) * 2;
        var newWid = Math.floor(((wid - lenMargin * 2.0) / 4.0) / 2.0 + 0.5) * 2;
        var newLen = Math.floor(((len - widMargin * 2.0) / 4.0) / 2.0 + 0.5) * 2;

        var rep = getRep(plateDiag, grade);
        var flat = getFlat(wid, len, plateDiag, grade);
        var close = getClose(flat);
        
        document.getElementById("widMargin").innerHTML = widMargin;
        document.getElementById("lenMargin").innerHTML = lenMargin;
        document.getElementById("diagMeas").innerHTML = newDiag;
        document.getElementById("widMeas").innerHTML = newWid;
        document.getElementById("lenMeas").innerHTML = newLen;
        document.getElementsByName("diagMeas")[0].value = newDiag;
        document.getElementsByName("widMeas")[0].value = newWid;
        document.getElementsByName("lenMeas")[0].value = newLen;
        
        document.getElementById("repeat").innerHTML= rep + " &micro;in";
        document.getElementById("flatness").innerHTML = flat + " &micro;in";
        document.getElementById("closure").innerHTML = close + " &micro;in";

        enableOutput();

    }
}
