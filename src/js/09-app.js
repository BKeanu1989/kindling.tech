$('.portfolio-display').tilt({
	scale: 1.1,
	speed: 3000,
})

for (var i = 1; i <= 20; i++) {
	var e = document.getElementById('line-' + i)
	var s = new Segment(e)
	s.draw("0%", "0%", 0);
	drawLine(e, s, i * 90, i)
}

function drawLine(e, s, delay, i){
	setTimeout(function(){
		e.style.strokeWidth = 5;
		// e.style.stroke = getRandomColor();
		s.draw("0", "100%", .7, {easing: d3['easeCubicInOut']});
	}, delay)
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
