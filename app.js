var search = prompt("Search anything and stream live tweets", "Enter the Matrix");
var tweetLog = [];
var columns = ["a","b","c","d","e","f","g","h","i","j","k","l"];
var colActive = 0;

var busy = [true, false, false, false, false, false, false, false, false, false, false, false];

if (search != null) {
	socket.emit('enter', search);
}

socket.on('tweetStream', function(tweets) {
	tweetLog.push(tweets);

	if (tweetLog[0] != null) {
		console.log(tweetLog[0]);
		tweetLog.splice(0, 1);
	}
});

