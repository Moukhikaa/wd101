const form = document.getElementById("registrationForm");
const tableBody = document.getElementById("tableBody");

// Load saved entries on page load
window.onload = function () {
  showEntries();
};

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  // Validate age
  if (!isAgeBetween18And55(dob)) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = { name, email, password, dob, acceptTerms };
  saveEntry(entry);
  showEntries();
  form.reset();
});

function isAgeBetween18And55(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  const isBeforeBirthday = m < 0 || (m === 0 && today.getDate() < birthDate.getDate());
  const actualAge = isBeforeBirthday ? age - 1 : age;
  return actualAge >= 18 && actualAge <= 55;
}

function saveEntry(entry) {
  let entries = JSON.parse(localStorage.getItem("user-entries")) || [];
  entries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(entries));
}

function showEntries() {
  const entries = JSON.parse(localStorage.getItem("user-entries")) || [];
  tableBody.innerHTML = "";

  entries.forEach(entry => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptTerms}</td>
    `;

    tableBody.appendChild(row);
  });
}
document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let dob = document.getElementById('dob').value;
    let terms = document.getElementById('acceptTerms').checked;

    if (!validateEmail(email)) {
        alert("Invalid email!");
        return;
    }

    if (!validateDOB(dob)) {
        alert("You must be between 18 and 55 years old.");
        return;
    }

    let user = { name, email, password, dob, terms };
    saveToLocalStorage(user);
    addUserToTable(user);
    this.reset(); // reset form after submission
});
