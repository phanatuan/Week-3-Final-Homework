var feed = [];


function tweet() { 
	var tweetContent = document.getElementById('input'); 
	
	//Check if the user has not typed anything! 
	if (tweetContent.value == "") {
		alert ("Type something bro!");
	} else {
		feed.push({text:tweetContent.value, isLike:false});
		//console.log(feed);
		document.getElementById('input').value = "";
		document.getElementById('status').innerHTML = "140 characters remaining";
		tweetContent.focus(); //refocus on the textboxt - UI 
		len = 0;
		updateFeed();
	}
}

function updateFeed() {
	var html = "";
	for (var i in feed) { 
		html += generateTweetHTML(feed[i].text,i);
	}
	document.getElementById('output').innerHTML = html;
}

function countCharacter(str) { 
	var len = str.length;
	var status = document.getElementById('status');
	var tweetButton = document.getElementById('tweet');

	if (len>140) { 
		status.classList.add('text-danger'); //status turns red to warn people
		status.innerHTML = `Your Tweet is too long, ${len-140} characters overrun. Tweet Button is disabled.`;
		tweetButton.disabled = true; //disable button
	} else {
		status.innerHTML = `${140-len} characters remaining` ;
		status.removeAttribute('class');
		tweetButton.disabled = false;
	}
}

function retweet(position) { 
	feed.splice(position,0,feed[position]);
	feed[position+1].isLike = false;
	//Retweet without re-render everything in the DOM
	var ul = document.getElementById(`tweet-${position}`);
	ul.insertAdjacentHTML('afterend',generateTweetHTML(feed[position].text,position));
}

function toogleLikeUnlike(position) { 
	feed[position].isLike = !feed[position].isLike;
	updateFeed(); 
}

function generateTweetHTML(tweetContent,i) { 
	return `
		<li class="media my-4 py-4 px-4 bg-light text-dark" id='tweet-${i}'>
			<img class="mr-3" src="https://placehold.it/35x35" alt="Generic placeholder image">
			<div class="media-body">
				${tweetContent}</br>
				<a href='#' onclick='retweet(${i})'>Retweet</a>
				<a href='#' onclick='toogleLikeUnlike(${i})'>${feed[i].isLike ? "Unlike" : "Like"}</a>
			</div>
		</li>`
}

function clearTweet() { 
	document.getElementById('output').innerHTML = '';
	feed = [];
}
