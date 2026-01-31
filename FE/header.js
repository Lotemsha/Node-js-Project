document.getElementById("logoutBtn").addEventListener("click", () => {
  const confirmed = confirm("Are you sure you want to logout?");
  if (confirmed) {
    window.location.href = "/logout";
  }
});

async function showUserName() {
  const res = await fetch("/user");
  const data = await res.json();
  document.getElementById("welcome").textContent =
    "ברוך/ה הבא/ה,  " + data.user_name;
}

document.addEventListener("DOMContentLoaded", showUserName);
