const form = document.getElementById("registrationForm");
const entriesTable = document.getElementById("entries");

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem("userEntries") || "[]");
  entriesTable.innerHTML = "";
  entries.forEach(entry => {
    addEntryToTable(entry);
  });
}

function addEntryToTable(entry) {
  const row = entriesTable.insertRow();
  row.insertCell(0).textContent = entry.name;
  row.insertCell(1).textContent = entry.email;
  row.insertCell(2).textContent = entry.password;
  row.insertCell(3).textContent = entry.dob;
  row.insertCell(4).textContent = entry.acceptedTerms ? "Yes" : "No";
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function isValidAge(dob) {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);
  return age >= 18 && age <= 55;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  if (!isValidEmail(email)) {
    alert("Invalid email address.");
    return;
  }

  if (!isValidAge(dob)) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const newEntry = { name, email, password, dob, acceptedTerms };

  const entries = JSON.parse(localStorage.getItem("userEntries") || "[]");
  entries.push(newEntry);
  localStorage.setItem("userEntries", JSON.stringify(entries));

  addEntryToTable(newEntry);
  form.reset();
});

window.addEventListener("DOMContentLoaded", loadEntries);
