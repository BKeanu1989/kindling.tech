$('.portfolio-display').tilt({
	scale: 1.1,
	speed: 3000,
})

for (var i = 1; i <= 21; i++) {
	var e = document.getElementById('line-' + i)
	var s = new Segment(e)
	s.draw("0%", "0%", 0);
	drawLine(e, s, i* 60)
}

function drawLine(e, s, delay){
	setTimeout(function(){
		e.style.strokeWidth = 4;
		s.draw("0", "100%", .7, {easing: d3['easeCubicInOut']});
	}, delay)
}
