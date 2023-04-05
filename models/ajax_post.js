/* función para crear el objeto AJAX*/
function nuevoAjax() {
  var xhttp = false;
  try {
    // Creacion del objeto AJAX para navegadores no IE
    xhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      // Creacion del objet AJAX para IE
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xhttp = false;
    }
  }
  if (!xhttp && typeof XMLHttpRequest != "undefined") {
    xhttp = new XMLHttpRequest();
  }
  return xhttp;
}

function loadDoc(url, data, cFunction) {
  var xhttp;
  xhttp = nuevoAjax();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };
  //xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhttp.open("POST", url, true);
  xhttp.send(data);
}