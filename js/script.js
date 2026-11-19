// 1. Controle do Menu Mobile
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// 2. Carrossel Infinito de Projetos
const track = document.getElementById('carousel-track');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
let currentIndex = 0;

function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
}

const totalCards = track.children.length;

function updateCarousel() {
    const cardsPerView = getCardsPerView();
    const maxIndex = totalCards - cardsPerView;
    
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;
    
    const percentage = currentIndex * (100 / cardsPerView);
    track.style.transform = `translateX(-${percentage}%)`;
}

nextBtn.addEventListener('click', () => {
    const cardsPerView = getCardsPerView();
    currentIndex = (currentIndex + 1) > (totalCards - cardsPerView) ? 0 : currentIndex + 1;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    const cardsPerView = getCardsPerView();
    currentIndex = (currentIndex - 1) < 0 ? (totalCards - cardsPerView) : currentIndex - 1;
    updateCarousel();
});

// Rotação automática a cada 4.5 segundos
let autoPlay = setInterval(() => {
    const cardsPerView = getCardsPerView();
    currentIndex = (currentIndex + 1) > (totalCards - cardsPerView) ? 0 : currentIndex + 1;
    updateCarousel();
}, 4500);

// Pausar carrossel quando o rato estiver em cima
track.addEventListener('mouseenter', () => clearInterval(autoPlay));
track.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
        const cardsPerView = getCardsPerView();
        currentIndex = (currentIndex + 1) > (totalCards - cardsPerView) ? 0 : currentIndex + 1;
        updateCarousel();
    }, 4500);
});

// Ajustar o carrossel caso a tela mude de tamanho (celular/tablet/PC)
window.addEventListener('resize', updateCarousel);

// 3. Envio do Formulário de Contato para o WhatsApp
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const servico = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value;

    const textoWp = `Olá Lucas! Meu nome é *${nome}* (${email}). Tenho interesse em: *${servico}*.\n\nMensagem: ${mensagem}`;
    const urlWp = `https://wa.me/5511999999999?text=${encodeURIComponent(textoWp)}`;
    
    window.open(urlWp, '_blank');
});