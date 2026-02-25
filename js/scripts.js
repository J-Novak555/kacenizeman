window.addEventListener('DOMContentLoaded', () => {
    const offset = 74;

    const logo = document.getElementById("customLogo");
    if(logo){
        logo.style.cursor = "pointer";
        logo.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }


    const navToggle = document.getElementById('customNavToggle');
    const navMenu = document.getElementById('customNavMenu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        navToggle.classList.toggle('active');
    });


    const navLinks = document.querySelectorAll('.custom-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-scroll');
            const target = document.getElementById(targetId);
            if(target){
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }

            if(navMenu.classList.contains('show')){
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
            }
        });
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const navBar = document.getElementById('customNavbar');
    const scrollOffset = 50;

    window.addEventListener('scroll', () => {
        if(window.scrollY > scrollOffset){
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
    });
});