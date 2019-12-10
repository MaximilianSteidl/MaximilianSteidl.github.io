var id;

window.addEventListener("load", function () {
	function ajaxLoadData() {
		if (this.readyState == 4 && this.status == 200) {
				json_data = JSON.parse(this.responseText);
				setValues(json_data);
		}
	}

	function loadJSON() {
		var xhr = new XMLHttpRequest();
		var path = "http://localhost:8080";
		xhr.onreadystatechange = ajaxLoadData;
		xhr.open("GET", path);
		xhr.send();
	}
	
	function getUrlVars() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}

	function getUrlParam(parameter, defaultvalue){
		var urlparameter = defaultvalue;
		if(window.location.href.indexOf(parameter) > -1){
			urlparameter = getUrlVars()[parameter];
			}
		return urlparameter;
	}
	
	id = getUrlParam('id','no_id');
	
	if(id == "no_id" )
	{
		document.getElementById("btn_upd").style.display = 'none';
	}
	else
	{
		document.getElementById("btn_add").style.display = 'none';
		document.getElementById("title").innerHTML = "Student updaten";
	}
	
	loadJSON();

});


function setValues(json)
{
	for (row in json)
	{
		if (json[row]._id == id)
		{	//console.log(json);
			document.getElementById("id")       .value = json[row].Student_id;
			document.getElementById("firstname").value = json[row].vorname;
			document.getElementById("lastname") .value = json[row].nachname;
			document.getElementById("course")   .value = json[row].studiengang;
			document.getElementById("home")     .value = json[row].wohnort;
			document.getElementById("semester") .value = json[row].semester;
			var bday = json[row].Geburtsdatum;
			document.getElementById("birthday") .value = bday.split(".").reverse().join("-");
			break;
		}
	}
}

function user_update()
{
	alert("update id:" + id);
}

function user_hinzufuegen()
{
	alert("add");
}