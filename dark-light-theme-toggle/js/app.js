const html = document.querySelector('html');
const sw = document.querySelector('.switch input[type=checkbox]');

sw.addEventListener('change', (e) => {
	console.log(e.target.checked);
	var theme = e.target.checked ? 'dark' : '';
	html.setAttribute('data-theme', theme);
});
