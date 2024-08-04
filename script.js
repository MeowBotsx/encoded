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

// Detectar DevTools
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

      // Adicionar evento ao botão de recarregar
      document.getElementById("reload-button").addEventListener("click", function () {
        location.reload(); // Recarregue a página
      });
    }
  };

  const showAccessDeniedOverlay = () => {
    createAccessDeniedOverlay();
    document.body.style.overflow = "hidden"; // Impedir rolagem
    document.getElementById("access-denied-overlay").style.display = "flex"; // Mostrar a sobreposição
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


//Menu Hamburguer
function toggleHam() {
  var ham = document.querySelector(".ham-expand");
  ham.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function () {
  const hamExpand = document.querySelector('.ham-expand');
  const links = document.querySelectorAll('.ham-expand .links a');

  links.forEach(link => {
    link.addEventListener('click', function () {
      hamExpand.classList.remove('active');
    });
  });
});


//Random Color NAME

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

// Meow Music Desativado
document.addEventListener('DOMContentLoaded', function() {
  const inviteButton = document.getElementById('invite-meow-giveaway');
  const inviteButtons = document.getElementById('invite-meow-giveaway2');
  const modal = document.getElementById('meow-giveaway-modal');

  inviteButtons.addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    modal.classList.add('show'); // Adiciona a classe para mostrar o modal
});
  inviteButton.addEventListener('click', function(event) {
      event.preventDefault(); // Impede o comportamento padrão do link
      modal.classList.add('show'); // Adiciona a classe para mostrar o modal
  });
});

function closeModal() {
  const modal = document.getElementById('meow-giveaway-modal');
  modal.classList.remove('show'); // Remove a classe para esconder o modal
}

// Fecha o modal se o usuário clicar fora do conteúdo
window.addEventListener('click', function(event) {
  const modal = document.getElementById('meow-giveaway-modal');
  if (event.target === modal) {
      closeModal(); // Usa a função para fechar o modal
  }
});

// Mostrar/esconder o botão de voltar ao topo
const backToTopButton = document.getElementById('back-to-top');
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
  
  // Gradualmente desaparecer o cabeçalho
  let opacity = 1 - window.scrollY / 300;
  if (opacity >= 0) {
    header.style.opacity = opacity;
    header.classList.remove('hide');
  } else {
    header.classList.add('hide');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});