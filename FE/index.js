async function loadTrails() {
  const container = document.getElementById("trails-container");

  try {
    const res = await fetch("/home/trails");
    const trails = await res.json();
    console.log(trails);

    container.innerHTML = "";

    trails.forEach((trail) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${trail.name}</h3>
        <p>מיקום: ${trail.location}</p>
        <p>אורך הממסלול בק"מ: ${trail.length_km}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading trails:", err);
  }
}

loadTrails();

document.getElementById("logoutBtn").addEventListener("click", () => {
  const confirmed = confirm("Are you sure you want to logout?");
  if (confirmed) {
    window.location.href = "/logout";
  }
});

async function showUserName() {
  const res = await fetch("/home/user");
  const data = await res.json();
  document.getElementById("welcome").textContent = "ברוך/ה הבא/ה,  " + data.user_name;
}

showUserName();