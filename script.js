// Contact Form Validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!name || !email || !emailPattern.test(email)) {
    alert('Please enter a valid name and email.');
    e.preventDefault();
  } else {
    alert('Thank you for contacting us!');
  }
});

// To-Do List with LocalStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => renderTask(task.text, task.completed));
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;
  renderTask(text, false);
  saveTask(text, false);
  input.value = '';
}

function renderTask(text, completed) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = '✔';
  toggleBtn.onclick = () => {
    li.classList.toggle('completed');
    updateStorage();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑';
  deleteBtn.onclick = () => {
    li.remove();
    updateStorage();
  };

  li.appendChild(toggleBtn);
  li.appendChild(deleteBtn);
  document.getElementById('taskList').appendChild(li);
}

function saveTask(text, completed) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStorage() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({ text: li.firstChild.textContent, completed: li.classList.contains('completed') });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
  document.getElementById('taskList').innerHTML = '';
  localStorage.removeItem('tasks');
}

// Image Gallery
function addImage() {
  const url = document.getElementById('imageURL').value.trim();
  if (!url) return;
  const img = document.createElement('img');
  img.src = url;
  img.alt = 'User Image';
  document.getElementById('imageContainer').appendChild(img);
  document.getElementById('imageURL').value = '';
}

// Load tasks on page load
window.onload = loadTasks;