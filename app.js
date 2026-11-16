// NAVEGAÇÃO AUTÓNOMA ENTRE VISTAS (SPA)
function switchView(viewId) {
    // Ocultar todas as vistas
    const views = document.querySelectorAll('.view-section');
    views.forEach(v => v.classList.remove('active'));

    // Mostrar a vista pretendida
    const targetView = document.getElementById('view-' + viewId);
    if (targetView) {
        targetView.classList.add('active');
    }

    // Atualizar estado ativo no menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('data-target') === viewId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Fechar menu mobile se estiver aberto
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }

    // Rolar para o topo suavemente
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// MENU HAMBURGER MOBILE
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Iniciar contagem decrescente do próximo jogo
    startCountdown();
});

// CONTADOR DECRESCENTE DO MATCH CENTER
function startCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');

    if (!daysEl) return;

    // Simulação de tempo decrescente fixo ou dinâmico
    let totalSeconds = 3 * 24 * 3600 + 14 * 3600 + 28 * 60;

    setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            const d = Math.floor(totalSeconds / (3600 * 24));
            const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);

            daysEl.textContent = String(d).padStart(2, '0');
            hoursEl.textContent = String(h).padStart(2, '0');
            minsEl.textContent = String(m).padStart(2, '0');
        }
    }, 1000);
}

// VARIÁVEIS DE CHECKOUT
let currentItemTitle = '';
let currentItemPrice = 0;
let selectedMethod = 'mbway';

function openCheckout(title, price) {
    currentItemTitle = title;
    currentItemPrice = price;

    document.getElementById('checkoutItemTitle').textContent = title;
    document.getElementById('checkoutTotalPrice').toFixedVal ? null : document.getElementById('checkoutTotalPrice').textContent = price.toFixed(2) + ' €';
    document.getElementById('mbAmountVal').textContent = price.toFixed(2) + ' €';
    
    document.getElementById('checkoutBodyForm').style.display = 'block';
    document.getElementById('checkoutSuccessReceipt').style.display = 'none';

    document.getElementById('checkoutModal').classList.add('active');
}

function openTicketModal(title, price) {
    openCheckout(title, price);
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function selectPaymentMethod(method, element) {
    selectedMethod = method;
    
    // Atualizar classes visuais das opções
    const options = document.querySelectorAll('.pay-option');
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    element.querySelector('input').checked = true;

    // Mostrar/Ocultar campos dinâmicos correspondentes
    document.getElementById('paymentDetailsMBWay').style.display = (method === 'mbway') ? 'block' : 'none';
    document.getElementById('paymentDetailsMultibanco').style.display = (method === 'multibanco') ? 'block' : 'none';
    document.getElementById('paymentDetailsCard').style.display = (method === 'card') ? 'block' : 'none';
    document.getElementById('paymentDetailsPaypal').style.display = (method === 'paypal') ? 'block' : 'none';
}

function processPayment() {
    const name = document.getElementById('buyerName').value.trim();
    const email = document.getElementById('buyerEmail').value.trim();

    if (!name || !email) {
        alert('Por favor, preencha o seu Nome e E-mail antes de continuar.');
        return;
    }

    if (selectedMethod === 'mbway') {
        const phone = document.getElementById('mbwayPhone').value.trim();
        if (phone.length < 9) {
            alert('Por favor, insira um número de telemóvel MB WAY válido.');
            return;
        }
    }

    // Preencher dados do recibo de sucesso
    document.getElementById('receiptName').textContent = name;
    document.getElementById('receiptItem').textContent = currentItemTitle;
    document.getElementById('receiptPrice').textContent = currentItemPrice.toFixed(2) + ' €';

    // Transitar do formulário para o recibo
    document.getElementById('checkoutBodyForm').style.display = 'none';
    document.getElementById('checkoutSuccessReceipt').style.display = 'block';
}

// MODAL DE LEITURA DE NOTÍCIAS
function openNewsModal(title, content) {
    document.getElementById('newsModalTitle').textContent = title;
    document.getElementById('newsModalBody').textContent = content;
    document.getElementById('newsModal').classList.add('active');
}

function closeNewsModal() {
    document.getElementById('newsModal').classList.remove('active');
}

// Fechar modais ao clicar fora
window.addEventListener('click', (e) => {
    const checkoutModal = document.getElementById('checkoutModal');
    const newsModal = document.getElementById('newsModal');
    if (e.target === checkoutModal) closeCheckout();
    if (e.target === newsModal) closeNewsModal();
});
