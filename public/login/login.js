$(function() {
    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
});

const form_login = document.getElementById('login-form');
const username = document.getElementById('username');
const password = document.getElementById('password');

form_login.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!username.value || !password.value){
		return
	}
	const body = {
		username: username.value,
		password: password.value
	};
	const headers = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body),
	};
	fetch("http://127.0.0.1:3000/auth", headers)
	.then(response => response.json()
		.then(response => 
			{
				sessionStorage.setItem("token", response.token)
				window.location.replace('http://127.0.0.1:3000/chat/chat_example.html');
			}
		)
		.catch(err => err)
	)
	.catch(response => response)
});

const form_register = document.getElementById('register-form');
const username2 = document.getElementById('username2');
const email = document.getElementById('email');
const password2 = document.getElementById('password2');

form_register.addEventListener("submit", (e) => {
    e.preventDefault();
    if (username2.value && password2.value && email.value) {
		const body = {
			username: username2.value,
			email: email.value,
			password: password2.value
		};
		const headers = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body),
		};
        const a = fetch("http://127.0.0.1:3000/users", headers)
		.then(
			response => response.json()
			.then(json => {
				if (response.status === 201){
					window.location.href = "http://127.0.0.1:3000/login/login_example.html"
				}
			})
			.catch(err => console.log(err))
		)
		.catch(response => response)
    }
});
