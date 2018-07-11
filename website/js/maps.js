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

function getElevations() {
//  This function for the moment is returning an array of arrays, which is undefined. The url should also have the widmeas, lenmeas, diagmeas, etc, and all the info from before, so that it can all end up on the cert.
    var params = parseURLParams(window.location.href);
    var elevations;
    var i = 0;
    for (i; i < params.length; i++) {
        if (params["meas" + i]) {
            elevations.append(params["meas" + i]);
        }
    }
    alert(elevations);
    return elevations;
}