/*async function register() {
  const username = document.getElementById("username").value;
  const profilename = document.getElementById("profilename").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;
  const isPrivate = document.getElementById("isPrivate").checked;
  const theme = document.getElementById("darkMode").checked ? "dark" : "light";

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  const res = await fetch("https://codealpha-social-media-backend.onrender.com/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      profilename,
      password,
      isPrivate,
      theme
    })
  });

  if (res.ok) {
    window.location.href = "login.html";
  } else {
    alert("Registration failed");
  }
}*/

async function register() {
  const profilename = document.getElementById("profilename").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  // Make sure element exists
  const privateToggle = document.getElementById("isPrivate");
  const isPrivate = privateToggle ? privateToggle.checked : false;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  // Send data to backend
  const res = await fetch("https://codealpha-social-media-backend.onrender.com/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profilename, password, isPrivate })
  });

  const data = await res.json();
  if (res.ok) {
    alert("Registered successfully!");
    window.location.href = "login.html";
  } else {
    alert(data.message || "Registration failed");
  }
}


