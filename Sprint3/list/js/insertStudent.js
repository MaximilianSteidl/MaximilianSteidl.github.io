var id;

window.addEventListener("load", function () {
	function ajaxLoadData() {
		if (this.readyState == 4 && this.status == 200) {
				var json_data = JSON.parse(this.responseText);
				setValues(json_data);
		}
	}

	function loadJSON(StudentenID) {
		var xhr = new XMLHttpRequest();
		var path = "http://localhost:8080/getStudent?id="+StudentenID;
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
	
	id = getUrlParam('uebergabe_id','no_id');
	
	if(id == "no_id" )
	{
		document.getElementById("btn_upd").style.display = 'none';
	}
	else
	{
		document.getElementById("btn_add").style.display = 'none';
		document.getElementById("title").innerHTML = "Student updaten";
		loadJSON(id);
	}

});

/*function getDataJson()
{
		var data_json = { 
	    'id'          : id,
		'Student_id'  : document.getElementById("id").value,
		'vorname'     : document.getElementById("firstname").value,
		"nachname"    : document.getElementById("lastname").value,
		"studiengang" : document.getElementById("course").value,
		"wohnort"     : document.getElementById("home").value,
		"semester"    : document.getElementById("semester").value,
		"birthday"    : document.getElementById("birthday").value.split("-").reverse().join(".")
		};
		
		return data_json;
}*/

function validateFields()
{
		if( document.getElementById("id")       .value === "" ||
			document.getElementById("firstname").value === "" ||
			document.getElementById("lastname") .value === "" ||
			document.getElementById("course")   .value === "" ||
			document.getElementById("home")     .value === "" ||
			document.getElementById("semester") .value === "" ||
			document.getElementById("birthday") .value === "" ||
			document.getElementById("id")       .value === null ||
			document.getElementById("firstname").value === null ||
			document.getElementById("lastname") .value === null ||
			document.getElementById("course")   .value === null ||
			document.getElementById("home")     .value === null ||
			document.getElementById("semester") .value === null ||
			document.getElementById("birthday") .value === null)
			{
				alert("bitte alle Felder richtig ausfuellen");
				return false;
			}
			else
			{
				if (document.getElementById("id")       .value.length > 30 ||
					document.getElementById("firstname").value.length > 30 ||
					document.getElementById("lastname") .value.length > 30 ||
					document.getElementById("course")   .value.length > 30 ||
					document.getElementById("home")     .value.length > 30 ||
					document.getElementById("semester") .value.length > 30 ||
					document.getElementById("birthday") .value.length > 30)
					{
						alert("Maximale Laenge: 30 Zeichen!");
					}
					else
					{
						var today = new Date();
						if(Date.parse(document.getElementById("birthday") .value) > today)
						{
							alert("Geburtsdatum kann nicht über dem heutigem Datum liegen")
						}
						else
						{
							return true;
						}
					}
			}
}

function setValues(json)
{
	for (var row in json)
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
	if (validateFields())
	{
		var data_json = { 
			'id'          : id,
			'Student_id'  : document.getElementById("id").value,
			'vorname'     : document.getElementById("firstname").value,
			"nachname"    : document.getElementById("lastname").value,
			"studiengang" : document.getElementById("course").value,
			"wohnort"     : document.getElementById("home").value,
			"semester"    : document.getElementById("semester").value,
			"birthday"    : document.getElementById("birthday").value.split("-").reverse().join(".")
			};
			
		$.ajax({
			type: 'POST',
			url: 'http://localhost:8080/updateStudent',
			data: data_json,
			success: function(){
				window.location.href = 'index.html';
			}
		});	
				
	}
}

function user_hinzufuegen()
{
	if (validateFields())
	{
		var data_json = { 
			'id'          : id,
			'Student_id'  : document.getElementById("id").value,
			'vorname'     : document.getElementById("firstname").value,
			"nachname"    : document.getElementById("lastname").value,
			"studiengang" : document.getElementById("course").value,
			"wohnort"     : document.getElementById("home").value,
			"semester"    : document.getElementById("semester").value,
			"birthday"    : document.getElementById("birthday").value.split("-").reverse().join(".")
			};
			
		$.ajax({
			type: 'POST',
			url: 'http://localhost:8080/insertStudent',
			data: data_json,
			success: function(){
				window.location.href = 'index.html';
			}
		});	
		
	}
}