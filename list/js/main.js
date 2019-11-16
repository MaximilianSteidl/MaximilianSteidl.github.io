var json_data = [];

window.addEventListener("load", function () {
	function ajaxLoadData() {
		if (this.readyState == 4 && this.status == 200) {
				json_data = JSON.parse(this.responseText);
				console.log("JSON:");
				console.log(this.responseText);
				console.log(json_data);
				console.log(json_data[1].vorname);
		}
	}

	function loadJSON() {
		var xhr = new XMLHttpRequest();
		var path = "https://raw.githubusercontent.com/ozwoldFH/webapp_inventory_WS2019/master/data/data.json";
		xhr.onreadystatechange = ajaxLoadData;
		xhr.open("GET", path, false);
		xhr.send();
	}

	loadJSON();
	
});