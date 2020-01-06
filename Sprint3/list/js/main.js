var json_data = []

window.addEventListener("load", function () {
	function ajaxLoadData() {
		if (this.readyState == 4 && this.status == 200) {
				json_data = JSON.parse(this.responseText);
				//console.log("JSON:");
				//console.log(this.responseText);
				//console.log(json_data);
				createTable(json_data, null);
		}
	}

	function loadJSON() {
		var xhr = new XMLHttpRequest();
		var path = "http://localhost:8080";
		xhr.onreadystatechange = ajaxLoadData;
		xhr.open("GET", path);
		xhr.send();
	}

	loadJSON();

});

function createTable(json, suche)
{
	var html = "";
	//table header
	html += "<tr>"
	//html += "	<th sytle='display: none;'>ID</th>"
	html += "	<th>Studenten Nummer</th>"
	html += "	<th>Vorname</th>"
	html += "	<th>Nachname</th>"
	html += "	<th>Studiengang</th>"
	html += "	<th>Wohnort</th>"
    html += "	<th>Semester</th>"
	html += "	<th>Geburtsdatum</th>"
	html += "	<th>Edit</th>"
	html += "</tr>"

	for (row in json)
	{
		if(suche != null)
		{
			var contains = false;
			for(data in json[row])
			{
				if(data != '_id')
				{
					var value = json[row][data] + ""; //convert to string
					if(value.indexOf(suche) != -1)
					{	
						//row found
						contains = true;
					}
				}
			}

			if(!contains)
			{
				//skips this line
				continue;
			}
		}

		html += "<tr>"

		for(data in json[row])
		{
			if(data != '_id' && data != '__v')
			{
				//Debugging: html +="<td>"+json[row][data]+"+Row: " +row +" Data: '" + data+ "'</td>";
				html +="<td>"+ json[row][data]+ "</td>";
			}
		}
		var id = json[row]._id;
		html += '<td><a href= "insertData.html?uebergabe_id='+id+'" title="edit"><i class="fa fa-pencil"></i></a> '
		html += '<button onclick="user_delete(\''+id+'\')" title="löschen" class="loeschen_button"><i class="fa fa-trash"></button></td>'
		html += "</tr>"
	}

	document.getElementById('student_list').innerHTML = html;
}

function suchen()
{
	var input = document.getElementById("suchfeld").value;
	createTable(json_data, input);

}

function user_delete(uebergabe_id)
{	
	if(confirm("Möchten Sie den Studenten wirklich löschen?"))
	{
		var data_json = { 
			'id'          : uebergabe_id,
		};
				
		$.ajax({
			type: 'POST',
			url: 'http://localhost:8080/deleteStudent',
			data: data_json,
			success: function(){
				window.location.href = 'index.html';
			}
		});	
	}
}
