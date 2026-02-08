async function login() {
  const profilename = document.getElementById("profilename").value;
  const password = document.getElementById("password").value;

  if (!profilename || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ profilename, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    // Save token (optional, for later use)
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    // Redirect to home page
    window.location.href = "home.html";

  } catch (error) {
    alert("Server error. Is backend running?");
    console.error(error);
  }
}
