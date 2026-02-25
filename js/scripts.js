// Po načtení celé struktury HTML
window.addEventListener('DOMContentLoaded', () => {
    const offset = 74; // posun při scrollu (např. výška pevného menu)

    // --- Logo scroll-to-top ---
    const logo = document.getElementById("customLogo");
    if (logo) {
        logo.style.cursor = "pointer"; // ukazatel myši se změní na ruku
        logo.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" }); // plynulý scroll nahoru
        });
    }

    // --- Toggle menu ---
    const navToggle = document.getElementById('customNavToggle');
    const navMenu = document.getElementById('customNavMenu');

    if(navToggle && navMenu){
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show'); // zobrazit/schovat menu
            navToggle.classList.toggle('active'); // změna vzhledu tlačítka
        });
    }

    // --- Smooth scroll na odkazy ---
    const navLinks = document.querySelectorAll('.custom-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-scroll');
            const target = document.getElementById(targetId);
            if(target){
                // spočítá pozici cíle s offsetem pro pevné menu
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }

            // Zavře menu, pokud je otevřené (pro mobilní verzi)
            if(navMenu.classList.contains('show')){
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
            }
        });
    });

    // --- Změna třídy navbar při scrollu ---
    const navBar = document.getElementById('customNavbar');
    const scrollOffset = 50; // kdy se přidá třída 'scrolled'

    if(navBar){
        window.addEventListener('scroll', () => {
            if(window.scrollY > scrollOffset){
                navBar.classList.add('scrolled'); // např. změní barvu pozadí
            } else {
                navBar.classList.remove('scrolled');
            }
        });
    }
});