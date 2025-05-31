document.addEventListener('DOMContentLoaded', () => {
  loadUsersFromStorage();

  const form = document.getElementById('registration-form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('acceptTerms').checked;

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (!validateDOB(dob)) {
      alert('Age must be between 18 and 55 years.');
      return;
    }

    const user = { name, email, password, dob, terms };

    saveUser(user);
    addUserToTable(user);

    form.reset();
  });
});

// Validate email with a simple regex
function validateEmail(email) {
  const re = /^\S+@\S+\.\S+$/;
  return re.test(email);
}

// Validate DOB (age between 18 and 55)
function validateDOB(dob) {
  if (!dob) return false;

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 18 && age <= 55;
}

// Load users from localStorage and show them in the table
function loadUsersFromStorage() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.forEach(user => addUserToTable(user));
}

// Save new user in localStorage
function saveUser(user) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

// Add a user row in the table
function addUserToTable(user) {
  const tbody = document.querySelector('#userTable tbody');
  const row = document.createElement('tr');

  row.innerHTML = `
    <td>${escapeHtml(user.name)}</td>
    <td>${escapeHtml(user.email)}</td>
    <td>${escapeHtml(user.password)}</td>
    <td>${user.dob}</td>
    <td>${user.terms}</td>
  `;

  tbody.appendChild(row);
}

// Escape HTML to avoid injection (optional but good practice)
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
