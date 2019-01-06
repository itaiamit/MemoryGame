var words = ["ewave", "pita", "bump", "yard", "hello", "world","guess"];
var startBtn = document.querySelector(".button");
var word;
var letterPosition = 0; // index of the expected next character.
const cardPicture = "https://i.pinimg.com/originals/10/80/a4/1080a4bd1a33cec92019fab5efb3995d.png";

startBtn.addEventListener("click", function(){
	$(this).remove();
	pickRandomWord();
	showAndHideWord();
	setTimeout(setWordChars, 2050);
});


function getRandomPosition(element)
{
	var x = document.body.offsetHeight-element.clientHeight;
	var y = document.body.offsetWidth-element.clientWidth;
	var randomX = Math.floor(Math.random()*x);
	var randomY = Math.floor(Math.random()*y);

	return [randomX,randomY];
}

function showAndHideWord()
{
	let div = document.createElement("div");
	let wrapper = document.querySelector(".wrapper");

	div.textContent = word.toUpperCase();
	$(div).addClass("showWord");
	wrapper.appendChild(div);
	setTimeout(function(){div.remove();}, 2000);
}

function pickRandomWord()
{
	let randomIndex = Math.floor(Math.random() * words.length);

	word = words[randomIndex];
	word = word.toUpperCase();
	console.log(word);
}

function setWordChars()
{
	for(let i = 0; i < word.length; i++)
	{
		var divCard = document.createElement("div");
		divCard.id = "card-" + i;
		divCard.style.position = "absolute";
		divCard.style.display = "block";
		divCard.className += word[i].toUpperCase();
		var divFrontCard = document.createElement("div");
		divFrontCard.className += "front";
		var divBackCard = document.createElement("div");
		divBackCard.className += "back";
		divBackCard.textContent = word[i].toUpperCase();
		divBackCard.style.display = "none";

		var img = document.createElement("img");
		img.setAttribute("src", cardPicture);
		img.setAttribute("width", 150);
		img.setAttribute("height", 200);
  		img.id = "img-"+ i;
  		img.alt = word[i].toUpperCase();

  		divFrontCard.appendChild(img);
  		divFrontCard.appendChild(divBackCard);
  		divCard.appendChild(divFrontCard);

		document.body.insertBefore(divCard, document.body.firstChild)
		var xy = getRandomPosition(divCard);
		divCard.style.top = xy[0] + 'px';
		divCard.style.left = xy[1] + 'px';
  		divCard.addEventListener("click", toggleAndCheckIfCorrect);
	}
}

function toggleAndCheckIfCorrect()
{
  let correctChar = word[letterPosition];

  if (this.style.display == "block" && this.className == correctChar) // if you flipped the CORRECT card
  {
  	showCardContent(this);
  	letterPosition++;

  	if(letterPosition === word.length)
  	{
  		endGame();
  	}
  }
  	
  else if (this.style.display === "block") // if you flipped the WRONG card
  {
  	showCardContent(this);
  	setTimeout(turnAllCards, 1000);
  }
}

function showCardContent(card)
{
	card.childNodes[0].childNodes[0].style.display = "none";
  	card.childNodes[0].childNodes[1].style.display = "block";
}

function turnAllCards()
{
	for(let i = 0; i < word.length; i++)
	{
		let card = document.getElementById("card-" + i);
		card.childNodes[0].childNodes[0].style.display = "block";
		card.childNodes[0].childNodes[1].style.display = "none";
	}

  	letterPosition = 0;
}

function removeCardDivsFromPage()
{
	for(let i = 0; i < word.length; i++)
	{
		let card = document.getElementById("card-" + i);
	   	$(card).remove();
	}
}

function setEndParameters()
{
	var restartBtn = document.createElement("button");
	$(restartBtn).addClass("button");
	restartBtn.innerHTML = "Play Again";

	var finalText = document.createElement("div");
	$(finalText).addClass("finalText");
	finalText.textContent = word;

	var divWrapper = document.createElement("div");
	$(divWrapper).addClass("wrapper");
	divWrapper.appendChild(restartBtn);
	divWrapper.appendChild(finalText);
	document.body.append(divWrapper);

	restartBtn.addEventListener("click", function(){
		$(this.parentNode).remove();
		pickRandomWord();	
		showAndHideWord();
		finalText.remove();
  		setTimeout(setWordChars, 2500);
	});
}

function endGame()
{
	console.log("YOU WON");
	removeCardDivsFromPage();
	setEndParameters();
	letterPosition = 0;
}