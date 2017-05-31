$(document).ready(() => {
	$('.js-register').on('click', function() {
    	sessionStorage.setItem("register", true);
	});
	var ClickedOnRegister = sessionStorage.getItem('register');
	if(ClickedOnRegister !== null){
		if(ClickedOnRegister){
			$('.js-register-tab a')[0].click();
		}
	}
});