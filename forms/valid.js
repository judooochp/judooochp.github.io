function validate() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var returnString = "The ";
  var flag = false;
  var i = 0;
  var atFlag = false;
  var dotFlag = false;
  
  if (name == "" && email == "") {
    flag = true;
    returnString += "name and email fields ";
  } else if (name == "" && email != "") {
    flag = true;
    returnString += "name field ";
  } else if (name != "" && email == "") {
    flag = true;
    returnString += "email field ";
  }
  
  if (flag == true) {
    returnString += "must be filled out."
    alert(returnString);
    return false;
  } else {
// Validate email;
    for (i; i < email.length; i++) {
      if (atFlag == true) {
        if (email[i] == ".") {
          return true;
        }
      }
      else if (email[i] == "@") {
        atFlag = true;
        continue;
      }
    }

    alert("Please enter a valid email address.")
    return false;
    
  }
  
}