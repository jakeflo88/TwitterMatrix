var search = prompt("Search anything and stream live tweets", "Enter the Matrix");
var tweetLog = [];
var columns = ["a","b","c","d","e","f","g","h","i","j","k","l"];
var colActive = 0;

var available = [true, false, false, false, false, false, false, false, false, false, false, false];

if (search != null) {
	socket.emit('enter', search);
}

socket.on('tweetStream', function(tweets) {
	tweetLog.push(tweets);

	console.log(tweetLog[0]);

	var colSelect = colActive;

	if(colSelect < 11) {
		colActive++;
	}

	else {
		colActive = 0;
	}

	if (colSelect <= 11 && available[colSelect]) {

		//the revolving doors of availability lol
		available[colSelect] = !available[colSelect];
		available[colActive] = !available[colActive];

		console.log(available);
	}
});

