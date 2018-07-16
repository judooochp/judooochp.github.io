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

function subFirst(line) {
  var return_line = [];
  var sub = line[0];
  for (var i = 0; i < line.length; i++) {
    return_line.push(Number(line[i] - sub));
  }
  return return_line;
}

function addRows(line) {
  var return_line = [];
  var last = 0;
  for (var i = 0; i < line.length; i++) {
    last = last + line[i];
    return_line.push(last);
  }
  return_line.unshift(0);
  return return_line;
}

function processDiag(line) {
  var last = line.length - 1;
  var corr = line[last] / last;
  var middle = Math.round(last / 2);
  var return_line = [];
  
  for (var i = 0; i < line.length; i++) {
    return_line.push(i);
  }
  return_line[middle] = -line[middle];
  
  var count = 1;
  while(count <= middle) {
    return_line[middle - count] = return_line[middle - (count - 1)] + corr;
    count += 1;
  }
  
  count = 1;
  while(count <= middle) {
    return_line[middle + count] = return_line[middle + (count - 1)] - corr;
    count += 1;
  }
  
  count = 0;
  for (count; count < return_line.length; count++) {
    return_line[count] += line[count];
  }
  
  return return_line;
}

function processLine(line, corner1, corner2) {
  var last = line.length - 1;
  var return_line = [];
  for (var i = 0; i < line.length; i++) {
    return_line.push(i);
  }
  return_line[last] = corner2 - line[last];
  var corr = (return_line[last] - corner1) / last;
  var count = -2;
  while (-count <= line.length) {
    return_line[return_line.length + count] = return_line[return_line.length + count + 1] - corr;
    count -= 1;
  }
  count = 0;
  while (count < line.length) {
    return_line[count] += line[count];
    count += 1;
  }
  return return_line;
}

function getMid(line) {
  return line[Math.round(line.length / 2 - 0.5)];
}

function getElevations() {
  var elevations = [];
//  This function for the moment is returning an array of arrays, which are currently angles from the measuring device. It needs to perform the math as well to turn them into elevations, even though that's what the variable is named... Reference Moody.py
  var params = parseURLParams(window.location.href);
  var line1 = [];
  var line2 = [];
  var line3 = [];
  var line4 = [];
  var line5 = [];
  var line6 = [];
  var line7 = [];
  var line8 = [];
  var i = 0;
  var lineEnd = Number(params["diagMeas"]);
  
  var corner1, corner2;

  for (i; i < lineEnd; i++) {
    if (("meas" + i) in params) {
      line1.push(Number(params["meas" + i]));
    }
  }

  line1 = subFirst(line1);
  line1 = addRows(line1);
  line1 = processDiag(line1);
  
  corner2 = line1[0];
  
  elevations.push(line1);

  lineEnd += Number(params["diagMeas"]);

  for (i; i < lineEnd; i++) {
    if (params["meas" + i]) {
      line2.push(Number(params["meas" + i]));
    }
  }

  line2 = subFirst(line2);
  line2 = addRows(line2);
  line2 = processDiag(line2);
  
  corner1 = line2[0];

  elevations.push(line2);

  lineEnd += Number(params["lenMeas"]);

  for (i; i < lineEnd; i++) {
    if (params["meas" + i]) {
      line3.push(Number(params["meas" + i]));
    }
  }

  line3 = subFirst(line3);
  line3 = addRows(line3);
  line3 = processLine(line3, corner1, corner2);

  elevations.push(line3);

  lineEnd += Number(params["widMeas"]);

  for (i; i < lineEnd; i++) {
    if (params["meas" + i]) {
      line4.push(Number(params["meas" + i]));
    }
  }

  line4 = subFirst(line4);
  line4 = addRows(line4);
  line4 = processLine(line4, corner2, corner1);

  elevations.push(line4);

  lineEnd += Number(params["lenMeas"]);

  for (i; i < lineEnd; i++) {
    if (params["meas" + i]) {
      line5.push(Number(params["meas" + i]));
    }
  }

  line5 = subFirst(line5);
  line5 = addRows(line5);
  line5 = processLine(line5, corner1, corner2);

  elevations.push(line5);

  lineEnd += Number(params["widMeas"]);

  for (i; i < lineEnd; i++) {
    if (params["meas" + i]) {
      line6.push(Number(params["meas" + i]));
    }
  }

  line6 = subFirst(line6);
  line6 = addRows(line6);
  line6 = processLine(line6, corner2, corner1);

  corner1 = getMid(line3);
  corner2 = getMid(line5);
  
  elevations.push(line6);

  lineEnd += Number(params["widMeas"]);

  for (i; i < lineEnd; i++) {
    if (params["meas" + i]) {
      line7.push(Number(params["meas" + i]));
    }
  }

  line7 = subFirst(line7);
  line7 = addRows(line7);
  line7 = processLine(line7, corner1, corner2);

  corner1 = getMid(line4);
  corner2 = getMid(line6);

  elevations.push(line7);

  lineEnd += Number(params["lenMeas"]);

  for (i; i < lineEnd; i++) {
    if (params["meas" + i]) {
      line8.push(Number(params["meas" + i]));
    }
  }

  line8 = subFirst(line8);
  line8 = addRows(line8);
  line8 = processLine(line8, corner1, corner2);

  elevations.push(line8);
  
  return elevations;
}

function getMin(elev) {
  var min = elev[0][0];
  for (var i = 0; i < elev.length; i++) {
    for (var o = 0; o < elev[i].length; o++) {
      if (elev[i][o] < min) min = elev[i][o];
    }
  }
  return min;
}

function getMax(elev) {
  var min = elev[0][0];
  for (var i = 0; i < elev.length; i++) {
    for (var o = 0; o < elev[i].length; o++) {
      if (elev[i][o] > min) min = elev[i][o];
    }
  }
  return min;
}

function doRound(meas) {
  for (var i = 0; i < meas.length; i++) {
    meas[i] = Math.round(meas[i] * 20);
  }
  return meas;
}