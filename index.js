document.addEventListener('DOMContentLoaded', () => {
  // Load users on page load
  loadUsersFromStorage();

  // Attach form submit event listener
  const form = document.getElementById('registration-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Read form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('acceptTerms').checked;

    // Validate email format
    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Validate DOB (age 18-55)
    if (!validateDOB(dob)) {
      alert('Age must be between 18 and 55 years.');
      return;
    }

    // Create user object
    const user = {
      name,
      email,
      password,
      dob,
      terms
    };

    // Save user to localStorage
    saveUser(user);

    // Add user to table immediately
    addUserToTable(user);

    // Reset form after successful submission
    form.reset();
  });
});

// Validate email with simple regex
function validateEmail(email) {
  const re = /^\S+@\S+\.\S+$/;
  return re.test(email);
}

// Validate DOB: age between 18 and 55
function validateDOB(dob) {
  if (!dob) return false;

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= 18 && age <= 55;
}

// Load saved users from localStorage and render the table rows
function loadUsersFromStorage() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.forEach(user => addUserToTable(user));
}

// Save a new user to localStorage
function saveUser(user) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

// Add a single user row to the table
function addUserToTable(user) {
  const tbody = document.querySelector('#userTable tbody');
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${escapeHtml(user.name)}</td>
    <td>${escapeHtml(user.email)}</td>
    <td>${escapeHtml(user.password)}</td>
    <td>${user.dob}</td>
    <td>${user.terms}</td>
  `;

  tbody.appendChild(tr);
}

// Escape text to prevent HTML injection (good practice)
function escapeHtml(text) {
  if (!text) return '';
  return text.replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
}
