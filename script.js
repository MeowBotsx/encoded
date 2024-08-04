/** @format */

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    // F12 key
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    // Ctrl + Shift + I
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    // Ctrl + Shift + C
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    // Ctrl + Shift + J
    e.preventDefault();
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    // Ctrl + U
    e.preventDefault();
    return false;
  }
};

// Monitorar o estado da tecla Ctrl
let isCtrlPressed = false;

document.addEventListener("keydown", function (e) {
  if (e.keyCode == 17) { // Tecla Ctrl
    isCtrlPressed = true;
  }
  if (isCtrlPressed && e.keyCode == "U".charCodeAt(0)) {
    e.preventDefault();
    return false;
  }
});

document.addEventListener("keyup", function (e) {
  if (e.keyCode == 17) { // Tecla Ctrl
    isCtrlPressed = false;
  }
});

// Prevenir devtools
window.addEventListener("devtoolschange", function (event) {
  if (event.detail.isOpen) {
    alert("Ferramentas de desenvolvedor abertas! Ação não permitida.");
  }
});

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  document.documentElement.style.setProperty("--color1", getRandomColor());
  document.documentElement.style.setProperty("--color2", getRandomColor());

