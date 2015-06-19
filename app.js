var search = prompt("Search anything and stream live tweets", "Enter the Matrix");
var tweetLog = [];
var columns = ["a","b","c","d","e","f","g","h","i","j","k","l"];
var colActive = 0;

var available = [true, false, false, false, false, false, false, false, false, false, false, false];
var busy = [false, false, false, false, false, false, false, false, false, false, false, false];


//emit to start stream
if (search != null) {
	socket.emit('enter', search);
}

//listen for tweets
socket.on('tweetStream', function(tweets) {

	//push tweets to an array
	tweetLog.push(tweets);

	//grab the first tweet
	var grabTweet = tweetLog[0].toString();

	//if the active column is available
	if (available[colActive] && busy[colActive] === false){

		//this is the variable used for formatting the columns
		var colSelect = colActive;
	}

	//for moving the active column to the next
	if(colSelect < 11) {
		colActive++;
	}

	//if column is valid
	if (colSelect <= 11 && available[colSelect] && busy[colSelect] === false) {

		//change column to busy
		busy[colSelect] = true;	

		//check if column is even or odd
		if (colSelect % 2 == 0 && colSelect <= 10) {

			//make the next column available
			available[colActive] = true;

			//remove the current tweet from array
			tweetLog.splice(0, 1);
		
			//makeshift loop that I can control
			var i = 0;

			var timer = setInterval(function(){

				//when it comes to the last char of the tweet it stops
				if (i >= grabTweet.length) {
					clearInterval(timer);
					busy[colSelect] = false;	
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

				//loop interval time aka "animation time"
			}, 250);
		}

		//for every other column, same as above, but posts characters in reverse order
		//the idea is that every other column displays in opposite direction
		if (colSelect % 2 != 0 && colSelect <=10) {

			//make the next column available
			available[colActive] = true;
			
			//remove the current tweet from array
			tweetLog.splice(0, 1);

			//makeshift loop that I can control
			var i2 = 0;

			var timer2 = setInterval(function(){

				//when it comes to the last char of the tweet it stops
				if (i2 >= grabTweet.length) {
					clearInterval(timer2);
					busy[colSelect] = false;	
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

				//loop interval time aka "animation time"
			}, 250);
		}

		//for the last column
		if (colSelect > 10) {

			//remove the current tweet from the array
			tweetLog.splice(0, 1);

			//makeshift loop that I can control
			var i3 = 0;

			var timer3 = setInterval(function(){

				//when it comes to the last char of the tweet it stops
				if (i3 >= grabTweet.length) {
					clearInterval(timer3);
					busy[colSelect] = false;
					colActive = 0;
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

				//loop interval time aka "animation time"
			}, 250);
		}

	}
});

