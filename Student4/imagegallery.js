//javascript to change font sizes 

function changeFontSize(buttonId) {
	if (buttonId === "fontbutton1") {
		document.querySelectorAll("p").forEach(function(p) {
			p.style.fontSize = "16px";
		});
	} else if (buttonId === "fontbutton2") {
		document.querySelectorAll("p").forEach(function(p) {
			p.style.fontSize = "19px";
		});
	} else if (buttonId === "fontbutton3") {
		document.querySelectorAll("p").forEach(function(p) {
			p.style.fontSize = "22px";
		});
	}
}



// javascript to change colours of webpage 

function changeFontSize(buttonId) {
	if (buttonId === "fontbutton1") {
		document.querySelectorAll("p").forEach(function(p) {
			p.style.fontSize = "16px";
		});
		document.querySelectorAll("h1").forEach(function(p) {
			p.style.fontSize = "60px";
		});
	} else if (buttonId === "fontbutton2") {
		document.querySelectorAll("p").forEach(function(p) {
			p.style.fontSize = "19px";
		});
		document.querySelectorAll("h1").forEach(function(p) {
			p.style.fontSize = "70px";
		});
	} else if (buttonId === "fontbutton3") {
		document.querySelectorAll("p").forEach(function(p) {
			p.style.fontSize = "22px";
		});
		document.querySelectorAll("h1").forEach(function(p) {
			p.style.fontSize = "80px";
		});
	}
}
function changeColors(buttonId) {
  if (buttonId === "button1") {
	document.body.style.backgroundColor = "#1B1212";
	document.querySelectorAll("p").forEach(function(p) {
	  p.style.color = "black";
	});
	document.querySelectorAll("h1").forEach(function(p) {
	  p.style.color = "#B2FFFF";
	});
	document.querySelector(".australia").style.backgroundColor = "#F8E8EE";
	document.querySelectorAll(".container").forEach(function(container) {
	  container.style.backgroundColor = "#F8E8EE";
	});
	document.querySelectorAll(".hover-content").forEach(function(container) {
	  container.style.backgroundColor = "#F8E8EE";
	});
	document.querySelectorAll(".hover-content2").forEach(function(container) {
	  container.style.backgroundColor = "#F8E8EE";
	});
  } 
  else if (buttonId === "button2") {
	document.body.style.backgroundColor = "#8fbc8f";
	document.querySelectorAll("p").forEach(function(p) {
	  p.style.color = "white";
	});
	document.querySelectorAll("h1").forEach(function(p) {
	  p.style.color = "#00308F";
	});
	document.querySelector(".australia").style.backgroundColor = "black";
	document.querySelectorAll(".container").forEach(function(container) {
	  container.style.backgroundColor = "#9BABB8";
	});
	document.querySelectorAll(".hover-content").forEach(function(container) {
	  container.style.backgroundColor = "black";
	});
	document.querySelectorAll(".hover-content2").forEach(function(container) {
	  container.style.backgroundColor = "black";
	});
  } 
  else if (buttonId === "button3") {
	document.body.style.backgroundColor = "#bc8f8f";
	document.querySelectorAll("p").forEach(function(p) {
	  p.style.color = "black";
	});
	document.querySelectorAll("h1").forEach(function(p) {
	  p.style.color = "#2FC5CC";
	});
	document.querySelector(".australia").style.backgroundColor = "#FFDEDE";
	document.querySelectorAll(".container").forEach(function(container) {
	  container.style.backgroundColor = "#FFDEDE";
	});
	document.querySelectorAll(".hover-content").forEach(function(container) {
	  container.style.backgroundColor = "#FFDEDE";
	});
	document.querySelectorAll(".hover-content2").forEach(function(container) {
	  container.style.backgroundColor = "#FFDEDE";
	});
  } 
  //Javascript to get random colours for webpage 
  
  else if (buttonId === "button4") {
  function getRandomColor() {
		  var letters = "0123456789ABCDEF";
		  var color = "#";
		  for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		  }
		  return color;
		}
	var randomColor = getRandomColor();
	document.body.style.backgroundColor = randomColor;
	
	var randomColor2 = getRandomColor();
	document.querySelectorAll("p").forEach(function(p) {
	  p.style.color = randomColor2;
	});
	document.querySelectorAll("h1").forEach(function(p) {
	  p.style.color = randomColor2;
	});
	
	
	var randomColor3 = getRandomColor();
	document.querySelector(".australia").style.backgroundColor = randomColor3;
	
	
	document.querySelectorAll(".hover-content").forEach(function(container) {
	  container.style.backgroundColor = randomColor3;
	});
	document.querySelectorAll(".hover-content2").forEach(function(container) {
	  container.style.backgroundColor = randomColor3;
	});
	var randomColor4 = getRandomColor();
	document.querySelectorAll(".container").forEach(function(container) {
	  container.style.backgroundColor = randomColor4;
	});
  }
}