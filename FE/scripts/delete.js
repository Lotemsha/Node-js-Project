// DELETE
document
  .getElementById("trails-container")
  .addEventListener("click", async (e) => {
    if (!e.target.classList.contains("deleteBtn")) return;

    const id = e.target.getAttribute("data-id");
    const confirmDelete = confirm(
      "Are you sure you want to delete this trail?",
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/trails/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + (data.error || "Something went wrong"));
        return;
      }

      alert("Trail deleted successfully!");
      loadTrails(); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Connection error. Please try again.");
    }
  });
