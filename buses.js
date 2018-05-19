function QueryNextBuses(el = 0){
var busStopId = document.getElementById('stopId').value;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function ReceivedCallback() {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("output").innerHTML = CreateTable(JSON.parse(this.responseText), el);
	}
};
xhttp.open("GET", "https://api.wmata.com/NextBusService.svc/json/jPredictions?StopID=" + busStopId + "&api_key=e13626d03d8e4c03ac07f95541b3091b", true);
xhttp.send();
}

function whichId(el){
	return el.getAttribute( 'id' );
}

function CreateTable(data, el){
	var tempVal = '';	
	var retVal = '';
	retVal =
		'<div class="jumbotron"> \n' +
		'<h2>' + data["StopName"] + '</h2> \n';
	var specificId = 0;
		for (var prediction in data["Predictions"]){
			retVal +=
			'<div><tr> \n' +
			'	<td><button id="' + specificId +'" class="btn btn-primary" type="submit"' +
				'onclick="QueryNextBuses(this)">' + 
				data["Predictions"][prediction]["RouteID"] + '</button></td> \n';
			specificId += 1;
		}
	if(el == 0){
		return retVal;
	}
	retVal+=
		'<table class="table table-bordered table-hover"> \n' +
		'	<thead> \n' +
		'		<tr> \n' +
		'			<th scope="col">Route ID</th> \n' +
		'			<th scope="col">Direction</th> \n' +
		'			<th scope="col">Estimated Minutes</th> \n' +
		'			<th scope="col">Vehicle ID</th> \n' +
		'		</tr> \n' +
		'	</thead> \n' +
		'	<tbody> \n';

	if(el != 0){
		var prediction = whichId(el);
		tempVal +=
		'<div><tr> \n' +
		'	<td>' + data["Predictions"][prediction]["RouteID"] + '</td> \n' +
		'	<td>' + data["Predictions"][prediction]["DirectionText"] + '</td> \n' +
		'	<td>' + data["Predictions"][prediction]["Minutes"] + '</td> \n' +
		'	<td>' + data["Predictions"][prediction]["VehicleID"] + '</td> \n' +
		'</tr></div> \n';
	}
	retVal += tempVal;
	retVal +=
		'</tbody> \n' +
		'</table> \n' +
		'</div> \n ' ;
return retVal;
}
