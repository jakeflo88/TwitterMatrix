var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var twit = require('twitter'),
	twitter = new twit({
		consumer_key: 'RPFqdVUwMX8stpdBRx8BmaoVv',
		consumer_secret: 'L2zVazkwzCtTLU8oXjZxNSh7LUYi49hQI9QmJn77UQyQoSTuLF',
		access_token_key: '805173362-Wlxn87138lIK2DLXNrTwjKOZoeDesqki5oKRM3Kn',
		access_token_secret: 've79nUIkLp52jX08DdsSi1t9O1OEJ2VEWwQyNyy7WcwCp'
	});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
 
  console.log("connection");

  socket.on('enter', function(search) {

  	twitter.stream('statuses/filter', {track: search}, function(stream){

	stream.on('error', function(error){
		throw error;
	});

	stream.on('data', function(data){
		console.log(data.text);
		socket.emit('tweetStream', data.text + " *** ");
	});

});
  });

});

app.use(express.static(__dirname));

http.listen(3000, function(){
  console.log('listening on *:3000');
});
