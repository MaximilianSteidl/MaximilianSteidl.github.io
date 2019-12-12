var id;

window.addEventListener("load", function () {
	function ajaxLoadData() {
		if (this.readyState == 4 && this.status == 200) {
				json_data = JSON.parse(this.responseText);
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
	var data_json = { 
	    'id'          : id,
		'Student_id'  : document.getElementById("id").value,
		'vorname'     : document.getElementById("firstname").value };
		
	//alert(data_json);
	
	$.ajax({
		type: 'POST',
		url: 'http://localhost:8080/updateStudent',
		data: data_json,
		success: function(msg){
			alert('wow' + msg);
		}
	});	
			
}

function user_hinzufuegen()
{
	alert("add");
}