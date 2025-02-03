let min = 150, max = 200;
const count = Math.floor(Math.random() * (max - min + 1)) + min;
for (let i = 0; i < count; i++) {
  const div = document.createElement('div');
  div.classList.add('wind');
  document.getElementById('overlay').appendChild(div);
}

const elements = document.querySelectorAll('.wind');
for (let i = 0; i < elements.length; i++) {
  elements[i].style.width = 100 + Math.floor(Math.random() * 600) + 'px';
  elements[i].style.marginLeft = Math.floor(Math.random() * 2000) + 'px';
  elements[i].style.marginTop = 20 + Math.floor(Math.random() * 2000) + 'px';
  let num = Math.floor(Math.random() * 20);
  elements[i].style.animation = 'breeze ' + (2 + Math.floor(Math.random() * 3)) + 's linear infinite';
}