document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.onkeydown = function (e) {
  if (e.keyCode === 123 || // F12 key
      (e.ctrlKey && e.shiftKey && e.keyCode === "I".charCodeAt(0)) || // Ctrl + Shift + I
      (e.ctrlKey && e.shiftKey && e.keyCode === "C".charCodeAt(0)) || // Ctrl + Shift + C
      (e.ctrlKey && e.shiftKey && e.keyCode === "J".charCodeAt(0)) || // Ctrl + Shift + J
      (e.ctrlKey && e.keyCode === "U".charCodeAt(0))) { // Ctrl + U
    e.preventDefault();
    return false;
  }
};

// Detect DevTools
(function () {
  const threshold = 160;
  let devToolsOpen = false;

  const createAccessDeniedOverlay = () => {
    let overlay = document.getElementById("access-denied-overlay");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "access-denied-overlay";
      overlay.innerHTML = `
        <div class="overlay-content">
          <h1>Acesso Negado</h1>
          <p>As ferramentas de desenvolvedor estão abertas. Por favor, feche-as e recarregue a página.</p>
          <button id="reload-button">Recarregar</button>
        </div>
      `;
      document.body.appendChild(overlay);

      // Add event listener to the reload button
      document.getElementById("reload-button").addEventListener("click", function () {
        location.reload(); // Reload the page
      });
    }
  };

  const showAccessDeniedOverlay = () => {
    createAccessDeniedOverlay();
    document.body.style.overflow = "hidden"; // Prevent scrolling
    document.getElementById("access-denied-overlay").style.display = "flex"; // Show the overlay
    // Change background color of the whole page to black
    document.body.style.backgroundColor = "#000";
  };

  const check = () => {
    const isOpen = window.outerWidth - window.innerWidth > threshold || window.outerHeight - window.innerHeight > threshold;
    if (isOpen) {
      if (!devToolsOpen) {
        devToolsOpen = true;
        showAccessDeniedOverlay();
      }
    }
  };

  setInterval(check, 1000);
  window.addEventListener("resize", check);
})();
