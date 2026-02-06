document.getElementById("trails-container").addEventListener("click", (e) => {
  if (e.target.classList.contains("editBtn")) {
    const id = e.target.getAttribute("data-id");
    window.location.href = `/add`;
  }
});
