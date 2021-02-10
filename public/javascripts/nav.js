const toggleBtn = document.querySelector('#toggle');
const nav = document.querySelector('nav');

toggleBtn.addEventListener('toggle', function() {
	document.getElementsByTagName('body').style.backgroundColor = 'yellow';
});
