$('.portfolio-display').tilt({
	scale: 1.1,
	speed: 3000,
})


var l1 = document.getElementById("logo-1")
var s1 = new Segment(l1);
s1.draw("0%", "0%", 0);

var l2 = document.getElementById("logo-2")
var s2 = new Segment(l2);
s2.draw("0%", "0%", 0);

var l3 = document.getElementById("logo-3")
var s3 = new Segment(l3);
s3.draw("100%", "100%", 0);

setTimeout(function(){ s1.draw("0", "100%", .7, {easing: d3['easeCubicInOut']}); }, 100)
setTimeout(function(){ s2.draw("0", "100%", .7, {easing: d3['easeCubicInOut']}); }, 200)
setTimeout(function(){ s3.draw("0", "100%", .7, {easing: d3['easeCubicInOut']}); }, 400)
