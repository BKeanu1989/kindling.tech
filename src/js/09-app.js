$('.portfolio-display').tilt({
	scale: 1.1,
	speed: 3000,
})

setTimeout(function(){
	for (var i = 1; i <= 20; i++) {
		var e = document.getElementById('line-' + i)
		var s = new Segment(e)
		s.draw("0%", "0%", 0);
		drawLine(e, s, i * 90, i)
	}
}, 700)

function drawLine(e, s, delay, i){
	setTimeout(function(){
		e.style.strokeWidth = 5;
		// e.style.stroke = getRandomColor();
		s.draw("0", "100%", .7, {easing: d3['easeCubicInOut']});
	}, delay)
}

setTimeout(function(){
	var arr = document.querySelectorAll('a.hidden');
	for (var i = 0; i < arr.length; i++) {
		showLink(arr[i], i*50)
	}
}, 1600)

function showLink(e, delay){
	setTimeout(function(){
		e.classList.remove('hidden')
	}, delay)
}
