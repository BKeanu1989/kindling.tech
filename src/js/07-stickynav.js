var isNavSticky = false;
document.addEventListener('scroll', function(){
	var nav = document.getElementById('nav')
	if(isNavSticky){
		if(document.getElementById('header').getBoundingClientRect().bottom - nav.clientHeight - 30 >= 0){
			isNavSticky = false
			nav.style.position = 'absolute';
			nav.style.top = 'auto';
			nav.style.bottom = '30px';
			nav.style.background = 'none';
		}
	} else {
		if(nav.getBoundingClientRect().y <= 0){
			isNavSticky = true
			nav.style.position = 'fixed';
			nav.style.top = 0;
			nav.style.bottom = 'auto';
			nav.style.background = 'rgba(0,0,0,.7)';
		}
	}
})
