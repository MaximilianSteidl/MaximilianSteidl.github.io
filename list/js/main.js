console.log( "json" );
/*
function loadJSON(path, callback) {
    console.log("path: " + path); 
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', path, false);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }


var json;
loadJSON("js/student.json", function(response) {
	json = JSON.parse(response);
	console.log('Here we go');
	console.log(json[0].Students[0].id); // Successfully shows the result
});
console.log('Here we go2');
console.log(json[0].Students[0].id); // TypeError: json is undefined
*/

var mydata = JSON.parse(student);
 alert(mydata[0].id);
 alert(mydata[0].vorname);