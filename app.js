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

	var getTweet = tweetLog[0].toString();
	tweetLog.splice(0, 1);

	//keep track of which column is active
	var colSelect = colActive;

	if (colSelect <= 11 && available[colSelect]) {

		available[colSelect] = !available[colSelect];
		console.log(available);

		//check if column is even or odd
		if (colSelect % 2 == 0) {
		
			//makeshift loop that I can control
			var i = 0;

			var timer = setInterval(function(){

				//when it comes to the last char of the tweet it stops
				if (i >= getTweet.length) {
					clearInterval(timer);
				};

				//grab the chars one at a time from the tweet
				var charSelect = getTweet.substring(i, (i + 1));

				//post it to the column
				var poster = document.createElement('DIV');
				var stacker = document.createElement('BR')

				poster.appendChild(document.createTextNode(charSelect));
				poster.appendChild(stacker);

				var columnUp = document.getElementById(columns[colSelect]).appendChild(poster);

				//advance the loop
				i++;

				//autoscroll
				var tracker = document.getElementById(columns[colSelect]);
				tracker.scrollTop = tracker.scrollHeight;

				//loop interval time
			}, 250);
		}

		//for every other column, same as above, but posts characters in reverse order
		//the idea is that every other column displays in opposite direction
		else {
			//makeshift loop that I can control
			var i2 = 0;

			var timer2 = setInterval(function(){

				//when it comes to the last char of the tweet it stops
				if (i2 >= getTweet.length) {
					clearInterval(timer);
				};

				//grab the chars one at a time from the tweet
				var charSelect2 = getTweet.substring(i2, (i2 + 1));

				//post it to the column
				var poster2 = document.createElement('DIV');
				var stacker2 = document.createElement('BR')

				poster2.appendChild(document.createTextNode(charSelect2));
				poster2.appendChild(stacker2);

				//stacking in opposite direction
				var columnDown = document.getElementById(columns[colSelect]);
				columnDown.insertBefore(poster2, columnDown.childNodes[0]);

				//advance the loop
				i2++;

				//autoscroll in reverse
				var tracker2 = document.getElementById(columns[colSelect]);
				tracker2.scrollTop = !tracker2.scrollHeight;

				//loop interval time
			}, 250);
		}

		//advance the column to next
		if (colActive < 11 && available[colSelect]) {
			colActive++;
			available[colActive] = !available[colActive];
		}

		//when it gets to the last column, jump back to the first
		if (colActive >= 11 && available[colSelect]) {
			colActive = 0;
			available[colActive] = !available[colActive];
		}
	}
});

