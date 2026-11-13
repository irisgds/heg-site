/* ============================================================
   HEG - Serviço de Vidraçaria
   Scripts do Site
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ===== Menu Mobile =====
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.querySelector('.nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ===== Formulário de Orçamento =====
    const form = document.getElementById('orcamento-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const email = document.getElementById('email').value.trim();
            const bairro = document.getElementById('bairro').value.trim();
            const servico = document.getElementById('servico').value;
            const mensagem = document.getElementById('mensagem').value.trim();

            const whatsappNumber = '5521999242122';

            let msg = '*Orçamento - HEG Vidraçaria*%0A%0A';
            msg += '*Nome:* ' + encodeURIComponent(nome) + '%0A';
            msg += '*Telefone:* ' + encodeURIComponent(telefone) + '%0A';
            if (email) msg += '*E-mail:* ' + encodeURIComponent(email) + '%0A';
            msg += '*Bairro:* ' + encodeURIComponent(bairro) + '%0A';
            msg += '*Serviço:* ' + encodeURIComponent(servico) + '%0A';
            if (mensagem) msg += '*Mensagem:* ' + encodeURIComponent(mensagem) + '%0A%0A';
            msg += 'Gostaria de solicitar um orçamento.';

            const whatsappUrl = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(msg);

            window.open(whatsappUrl, '_blank');

            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Redirecionando para o WhatsApp...';

            const existing = form.querySelector('.form-success');
            if (existing) existing.remove();

            form.appendChild(successMsg);
            successMsg.style.display = 'block';

            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);

            form.reset();
        });
    }

    // ===== Header scroll effect =====
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = 'none';
        }
    });

    // ===== Animação ao scroll =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .campaign-card, .feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});