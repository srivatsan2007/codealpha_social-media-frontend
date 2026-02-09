const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "login.html";
}

// Load user details from backend
fetch(`https://codealpha-social-media-backend.onrender.com/api/auth/user/${user.id}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById("username").value = data.profilename;
    document.getElementById("password").value = data.password;
    document.getElementById("profilePhoto").src =
      data.profilePhoto || "assets/uploads/default.png";
  })
  .catch(err => console.error(err));

function uploadPhoto(event) {
  const img = document.getElementById("profilePhoto");
  img.src = URL.createObjectURL(event.target.files[0]);
}



  async function deleteAccount() {
    const confirmDelete = confirm(
      "Are you sure? This will permanently delete your account."
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `https://codealpha-social-media-backend.onrender.com/api/auth/delete/${user.id}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      alert("Your account has been deleted successfully");

      // Clear stored user data
      localStorage.clear();

      // Redirect to register page
      window.location.href = "register.html";

    } catch (error) {
      alert("Failed to delete account");
      console.error(error);
    }
  }

const currentUser = JSON.parse(localStorage.getItem("user"));
const viewedUserId = new URLSearchParams(window.location.search).get("id");

async function loadProfile() {
  const res = await fetch(
    `https://codealpha-social-media-backend.onrender.com/api/auth/user/${viewedUserId}`
  );
  const user = await res.json();

  document.getElementById("followersCount").innerText =
    user.followers.length;

  const followBtn = document.getElementById("followBtn");

  if (user.followers.includes(currentUser.id)) {
    followBtn.innerText = "Following";
    followBtn.classList.replace("btn-primary", "btn-secondary");
  }
}

async function toggleFollow() {
  const res = await fetch(
    `https://codealpha-social-media-backend.onrender.com/api/auth/follow/${viewedUserId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id })
    }
  );

  const data = await res.json();

  document.getElementById("followersCount").innerText = data.followers;

  const btn = document.getElementById("followBtn");
  btn.innerText = btn.innerText === "Follow" ? "Following" : "Follow";
  btn.classList.toggle("btn-secondary");
  btn.classList.toggle("btn-primary");
}

loadProfile();




