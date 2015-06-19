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

	var grabTweet = tweetLog[0].toString();

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
		

		//check if column is even or odd
		if (colSelect % 2 == 0 && colSelect <= 10) {

			available[colActive] = !available[colActive];
		
			//makeshift loop that I can control
			var i = 0;

			var timer = setInterval(function(){

				//when it comes to the last char of the tweet it stops
				if (i >= grabTweet.length) {
					clearInterval(timer);	
				};

				//grab the chars one at a time from the tweet
				var charSelect = grabTweet.substring(i, (i + 1));

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
			}, 100);
		}

		//for every other column, same as above, but posts characters in reverse order
		//the idea is that every other column displays in opposite direction
		if (colSelect % 2 != 0 && colSelect <=10) {

			available[colActive] = !available[colActive];

			//makeshift loop that I can control
			var i2 = 0;

			var timer2 = setInterval(function(){

				//when it comes to the last char of the tweet it stops
				if (i2 >= grabTweet.length) {
					clearInterval(timer2);	
				};

				//grab the chars one at a time from the tweet
				var charSelect2 = grabTweet.substring(i2, (i2 + 1));

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
			}, 100);
		}

		if (colSelect > 10) {
		//makeshift loop that I can control
			var i3 = 0;

			var timer3 = setInterval(function(){

				//when it comes to the last char of the tweet it stops
				if (i3 >= grabTweet.length) {
					clearInterval(timer3);
					available[colActive] = !available[colActive];	
				};

				//grab the chars one at a time from the tweet
				var charSelect3 = grabTweet.substring(i3, (i3 + 1));

				//post it to the column
				var poster3 = document.createElement('DIV');
				var stacker3 = document.createElement('BR')

				poster3.appendChild(document.createTextNode(charSelect3));
				poster3.appendChild(stacker3);

				//stacking in opposite direction
				var columnDown = document.getElementById(columns[colSelect]);
				columnDown.insertBefore(poster3, columnDown.childNodes[0]);

				//advance the loop
				i3++;

				//autoscroll in reverse
				var tracker3 = document.getElementById(columns[colSelect]);
				tracker3.scrollTop = !tracker3.scrollHeight;

				//loop interval time
			}, 100);
		}

	}
});

