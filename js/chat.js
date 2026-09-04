// =========================================================================
//                   LÓGICA E DIÁLOGO DO CHATBOT PREMIUM
// =========================================================================

// VARIAÇÃO DE SAUDAÇÕES
const GREETINGS = [
  "Fala, tudo certo? Como posso te ajudar hoje?",
  "Olá, seja bem-vindo à Barbearia do Silvio. O que você procura hoje?",
  "E aí, beleza? Como posso te ajudar hoje?",
  "Bem-vindo! O que você procura hoje?",
  "Opa, tudo bem? Será um prazer te atender.",
  "Olá! Bem-vindo à Barbearia do Silvio. Como posso te ajudar hoje?",
  "Fala! Tudo bem por aí? Como posso te ajudar hoje?"
];

// VARIAÇÃO DE RESPOSTAS PARA AGENDAMENTO
const BOOKING_RESPONSES = [
  "Posso te ajudar a marcar um horário. Você pode agendar direto no Booksy clicando no botão da página, ou quer que eu te envie o link?",
  "Bora agendar seu corte! O link do Booksy está no site e é super rápido de marcar. Quer que eu te envie o link direto?",
  "Vou te passar as informações para reservar seu horário. É só clicar no botão 'Reservar pelo Booksy' na nossa página principal. Super prático!",
  "Temos alguns horários disponíveis esta semana. Você pode escolher seu barbeiro preferido e reservar diretamente pelo Booksy. Vamos nessa?",
  "Posso verificar o melhor horário pra você. Dê uma olhada na nossa agenda em tempo real clicando no botão de agendamento do site!"
];

// RESPOSTAS SOBRE A EXPERIÊNCIA DA BARBEARIA
const EXPERIENCE_RESPONSES = [
  "A proposta da Barbearia do Silvio é entregar mais do que um corte, mas uma experiência completa em um ambiente sofisticado e confortável.",
  "Oferecemos um atendimento totalmente personalizado, ambiente sofisticado e qualidade máxima em cada detalhe. É um ritual premium completo.",
  "Nosso espaço foi pensado para o seu conforto, unindo o estilo moderno com a clássica vibe de barbearia tradicional de alto nível. Você vai curtir muito!",
  "Aqui você encontra profissionais preparados, cerveja gelada, café premium e uma atmosfera sofisticada para relaxar enquanto cuidamos do seu visual."
];

// LOCALIZAÇÃO
const LOCATION_RESPONSES = [
  "Nosso endereço de luxo é: Av. Batatais, 263 - Jardim Itaparica, Barueri - SP, 06447-090. Fica super fácil de achar, e clicando no mapa do site você abre a rota direto no GPS!",
  "Estamos localizados na Av. Batatais, 263 - Jardim Itaparica, Barueri - SP, 06447-090. É bem tranquilo de chegar. Quer aproveitar para agendar seu horário?",
  "O endereço oficial é Av. Batatais, 263 - Jardim Itaparica, Barueri - SP, 06447-090. Clicando no nosso mapa interativo da página, você abre direto no Google Maps. Bora marcar seu corte?"
];

// HORÁRIOS
const HOURS_RESPONSES = [
  "Estamos atendendo em horários programados. Nosso funcionamento é de Terça a Sexta, das 09h às 20h, e aos Sábados, das 09h às 18h. Posso te ajudar a encontrar um bom horário?",
  "Funcionamos de Terça a Sexta das 09h às 20h, e Sábado das 09h às 18h. Que tal aproveitar para agendar seu ritual agora?",
  "Nosso horário é de Terça a Sexta (09:00 às 20:00) e Sábado (09:00 às 18:00). Posso te ajudar a reservar sua vaga no Booksy?"
];

// EQUIPE
const TEAM_RESPONSES = [
  "Nossa equipe é formada por profissionais preparados para entregar um atendimento de alto nível e um corte alinhado com o estilo de cada cliente.",
  "Contamos com um time de barbeiros altamente qualificados (como o Sílvio e a Karol), especialistas em fade, barba e cortes clássicos. Quer agendar com algum deles?",
  "Nossos profissionais são especialistas em visagismo e atendimento de elite. A Karol cuida dos detalhes de barba e o Sílvio é o nosso Master Barber. Vamos agendar?"
];

// SERVIÇOS E VALORES
const SERVICE_RESPONSES = [
  "Oferecemos cortes clássicos, fade moderno, design de barba com toalha quente e tratamentos de alto nível. Os valores começam a partir de R$ 80. Quer agendar?",
  "Nossos serviços incluem corte premium (R$ 80), barba terapêutica e combos completos (Cabelo + Barba sai por R$ 130). Que tal agendar o seu?",
  "Trabalhamos com cortes de cabelo clássicos e modernos, além de terapia de barba com toalha quente. Tudo feito com produtos de altíssima qualidade. Vamos marcar?"
];

// QUANDO NÃO SOUBER RESPONDER (FALLBACKS)
const FALLBACK_RESPONSES = [
  "Posso te ajudar melhor pelo atendimento direto na recepção ou pelo agendamento. Que tal darmos uma olhada no Booksy?",
  "Essa informação posso confirmar melhor para você diretamente no nosso atendimento. Me chama no agendamento que te ajudo!",
  "Me chama no agendamento que te ajudo melhor com isso, ou dê uma olhadinha nas opções da nossa agenda!"
];

export function initChatbot() {
  const chatToggle = document.getElementById('chatToggle');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const chatMessages = document.getElementById('chatMessages');

  let isTyping = false;
  let firstOpen = true;

  // Toggle Window
  chatToggle.addEventListener('click', () => {
    chatWindow.classList.add('open');
    chatInput.focus();
    
    // Inicializa com saudação aleatória no primeiro clique
    if (firstOpen) {
      setInitialGreeting();
      firstOpen = false;
    }
  });

  chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });

  // Define a saudação inicial aleatória
  function setInitialGreeting() {
    chatMessages.innerHTML = '';
    const randomGreeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    addMessage(randomGreeting, 'bot');
  }

  // Função para adicionar mensagem no chat
  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    isTyping = false;
    const typingDiv = document.getElementById('typingIndicator');
    if (typingDiv) {
      typingDiv.remove();
    }
  }

  // Lógica de resposta baseada nas regras de diálogo humanas
  function handleBotResponse(userText) {
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      
      const text = userText.toLowerCase();
      let response = "";

      // Prioridade 1: Localização
      if (text.includes('endereço') || text.includes('endereco') || text.includes('localização') || text.includes('localizacao') || text.includes('onde fica') || text.includes('rua') || text.includes('avenida') || text.includes('av') || text.includes('mapa') || text.includes('local')) {
        response = LOCATION_RESPONSES[Math.floor(Math.random() * LOCATION_RESPONSES.length)];
      }
      // Prioridade 2: Agendamento / Reservar
      else if (text.includes('agendar') || text.includes('marcar') || text.includes('reserva') || text.includes('agenda') || text.includes('booksy') || text.includes('vaga') || text.includes('marca')) {
        response = BOOKING_RESPONSES[Math.floor(Math.random() * BOOKING_RESPONSES.length)];
      }
      // Prioridade 3: Funcionamento / Horário
      else if (text.includes('horário') || text.includes('horario') || text.includes('funciona') || text.includes('funcionamento') || text.includes('horas') || text.includes('aberto') || text.includes('abre') || text.includes('fecha')) {
        response = HOURS_RESPONSES[Math.floor(Math.random() * HOURS_RESPONSES.length)];
      }
      // Prioridade 4: Equipe / Barbeiros
      else if (text.includes('barbeiro') || text.includes('equipe') || text.includes('profissionais') || text.includes('silvio') || text.includes('sílvio') || text.includes('karol') || text.includes('time')) {
        response = TEAM_RESPONSES[Math.floor(Math.random() * TEAM_RESPONSES.length)];
      }
      // Prioridade 5: Preço / Valores / Serviços
      else if (text.includes('preço') || text.includes('preco') || text.includes('valor') || text.includes('valores') || text.includes('serviço') || text.includes('servicos') || text.includes('cabelo') || text.includes('barba') || text.includes('corte') || text.includes('fade') || text.includes('combo')) {
        response = SERVICE_RESPONSES[Math.floor(Math.random() * SERVICE_RESPONSES.length)];
      }
      // Prioridade 6: Sobre a barbearia / Diferencial / Experiência
      else if (text.includes('experiência') || text.includes('experiencia') || text.includes('ambiente') || text.includes('diferencial') || text.includes('conforto') || text.includes('estilo')) {
        response = EXPERIENCE_RESPONSES[Math.floor(Math.random() * EXPERIENCE_RESPONSES.length)];
      }
      // Prioridade 7: Saudações básicas
      else if (text.includes('oi') || text.includes('olá') || text.includes('ola') || text.includes('bom dia') || text.includes('boa tarde') || text.includes('boa noite') || text.includes('opa') || text.includes('tudo bem') || text.includes('beleza') || text.includes('fala')) {
        response = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
      }
      // Fallback
      else {
        response = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
      }

      addMessage(response, 'bot');
    }, 1200); // 1.2s para parecer mais responsivo e natural
  }

  // Evento de Envio de Mensagem do Usuário
  function sendMessage() {
    const text = chatInput.value.trim();
    if (text === '' || isTyping) return;

    addMessage(text, 'user');
    chatInput.value = '';
    
    handleBotResponse(text);
  }

  chatSend.addEventListener('click', sendMessage);

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}
