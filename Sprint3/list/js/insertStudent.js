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
	$(".pflichtfeld , #birthday").trigger("focusout");
	
	if ($(".fa").length)
	{
		alert("Bitte fuellen Sie alle Felder richtig aus! Sie koennen die Fehlermeldungen sehen indem Sie den Mauszeigen ueber das Warnungsdreieck legen");
		return false;
	}		
	else
	{
		return true;
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

//validation
$(document).ready(function(){

	$( ".pflichtfeld" )
	  .focusout(function() {
		var v_val = $(this).val();
		var color = "inherit";
	    var error_msg = "";
		var v_after = "";
  
		
		if(v_val == "" || v_val == null )
		{
			color = "orange";
			error_msg += "Bitte das Feld ausfuellen! ";
			v_after = '<i class="fa fa-exclamation-triangle" title="'+error_msg+'"></i>'
		}
		
		if(v_val.length > 30)
		{
			color = "orange";
			error_msg += "Das Feld darf nicht laenger als 30 Zeichen sein! ";
			v_after = '<i class="fa fa-exclamation-triangle" title="'+error_msg+'"></i>'
		}
		
		$(this).css("border-color", color);
		$(this).attr("title", error_msg);
		
		if(v_after == "")
		{
			//check if icon exists and remove italics
			if($(this).next().hasClass("fa"))
			{
				$(this).next().remove();
			}
		}
		else
		{
			if(!$(this).next().hasClass("fa"))
			{
				$(this).after(v_after);
			}	
		}
	  });
	  
	$( "#birthday" )
	  .focusout(function() {
		if($(this).val() != "")
		{
			var v_val = $(this).val();
			var color = "inherit";
			var error_msg = "";
			var v_after = "";
			
			var GivenDate = v_val;
			var CurrentDate = new Date();
			GivenDate = new Date(GivenDate);
			if(GivenDate > CurrentDate){
				color = "orange";
				error_msg += "Das Feld darf nicht ueber dem heutigem Datum liegen!";
				v_after = '<i class="fa fa-exclamation-triangle" title="'+error_msg+'"></i>'
			}
			
			$(this).css("border-color", color);
			$(this).attr("title", error_msg);
			
			if(v_after == "")
			{
				//check if icon exists and remove italics
				if($(this).next().hasClass("fa"))
				{
					$(this).next().remove();
				}
			}
			else
			{
				if(!$(this).next().hasClass("fa"))
				{
					$(this).after(v_after);
				}		
			}
		}
	  });

})
