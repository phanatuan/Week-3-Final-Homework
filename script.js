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
 
//ASK QUESTIONS HERE!
function countCharacter(str) { 
	var len = str.length;
	var status = document.getElementById('status'); //Why CANNOT declares these 2 out of this function???? 
	var tweetButton = document.getElementById('tweet'); //Why CANNOT declares these 2 out of this function???? 

	if (len>140) { 
		status.classList.add('text-danger'); //status turns red to warn people
		status.innerHTML = `Your Tweet is too long, ${len-140} characters overrun. Tweet Button is disabled.`;
		tweetButton.disabled = true; //disable button - UI
	} else {
		status.innerHTML = `${140-len} characters remaining` ;
		status.removeAttribute('class');
		tweetButton.disabled = false; //re-enable button - UI 
	}
}

function retweet(position) { 
	feed.splice(position,0,feed[position]);
	feed[position+1].isLike = false;
	//Retweet without re-render everything in the DOM
	var li = document.getElementById(`tweet-${position}`);
	li.insertAdjacentHTML('afterend',generateTweetHTML(feed[position].text,position));
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
				<p id='content-${i}'>${tweetContent}</p>
				<ul id='action' class = 'my-2 list-inline'>
					<li class='list-inline-item px-1'><a href='#' onclick='retweet(${i})'>Retweet</a></li>
					<li class='list-inline-item px-1'><a href='#' onclick='toogleLikeUnlike(${i})'>${feed[i].isLike ? "Unlike " : "Like "}</a></li>
					<li class='list-inline-item px-1'><a href='#' onclick='deleteTweet(${i})'>Delete Tweet</a></li>
					<li class='list-inline-item px-1'><a href='#' onclick='editTweet(${i})'>Edit Tweet</a></li>
				</ul>
			</div>
		</li>`
}

function editTweet(position) { 
	var content = document.getElementById(`content-${position}`);
	content.contentEditable = true; //Make the Tweet <p> editable
	content.focus(); //Focus on the Tweet so users start editting.
	content.value = feed[position].text;
	content.addEventListener('keypress', function() { //
		console.log(content.value);
	})
	content.insertAdjacentHTML('afterend',`<button onclick="reSubmit(${position})" id="button-${position}">Done Editing</button>`);
}

//ASK ABOUT THIS!!! 
 function reSubmit(position) { 	
	var content1 = document.getElementById(`content-${position}`); //Any way to re-use the one declare above? 
	content1.innerHTML = content1.value + " (Edited)"; //Edit the content, but the value remains the same
	content1.contentEditable = false;
	document.getElementById(`button-${position}`).remove();
 }


//delete the Tweet in feed[] & remove it from the parent ul without re-rendering everything.
function deleteTweet(position) { 
	feed.splice(position,1);
	var li = document.getElementById(`tweet-${position}`);
	li.parentNode.removeChild(li);
}

//clear the existing tweet, also reset the feed[]
function clearTweet() { 
	document.getElementById('output').innerHTML = '';
	feed = [];
	document.getElementById('input').value = "";
}
