var feed = [];

function tweet() { 
	var tweet = document.getElementById('input'); 
	feed.push({text:tweet.value, isLike:false});
	console.log(feed);
	document.getElementById('input').value = "";
	tweet.focus(); //refocus on the textbos - UI 
	len = 0;
	updateFeed();
}

function updateFeed() {
	var html = "";
	for (var i in feed) { 
		html += `<li>${feed[i]} 
		<a href='#' onclick='retweet(${i})'>Retweet</a> 
		<a href='#' onclick='toogleLikeUnlike(${i})'>Like</a></li>`
	}
	document.getElementById('output').innerHTML = html;
}

function countCharacter(str) { 
	var len = str.length;
	document.getElementById('status').innerHTML = `${140 - len} characters remaining`;
}

function retweet(position) { 
	feed.splice(position,0,feed[position]);
	updateFeed(); //how to not call this as it will re-render everything
	console.log(feed);
}

function toogleLikeUnlike(position) { 
	console.log(feed);
}
