document.addEventListener("DOMContentLoaded", () => {
    const poemList = document.getElementById("poem-list");
    const searchInput = document.getElementById("search");
    const toggleBtn = document.getElementById("toggle-theme");
  
    function renderPoems(filter = "") {
      if (!Array.isArray(poems)) return;
  
      poemList.innerHTML = "";
  
      const filteredPoems = poems.filter(poem =>
        poem.title.toLowerCase().includes(filter.toLowerCase()) ||
        poem.preview.toLowerCase().includes(filter.toLowerCase())
      );
  
      if (filteredPoems.length === 0) {
        poemList.innerHTML = "<p style='grid-column: 1 / -1;'>No poems found.</p>";
        return;
      }
  
      filteredPoems.forEach(poem => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${poem.title}</h3>
          <p>${poem.preview}</p>
          <a href="poem.html?id=${poem.id}">Read more →</a>
        `;
        poemList.appendChild(card);
      });
    }
  
    // Handle theme toggle
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      toggleBtn.textContent = isDark ? "☀️" : "🌙";
    });
  
    // Apply saved theme on load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      toggleBtn.textContent = "☀️";
    } else {
      toggleBtn.textContent = "🌙";
    }
  
    // Handle search
    searchInput.addEventListener("input", (e) => {
      renderPoems(e.target.value);
    });
  
    // Initial render
    renderPoems();
  });
  