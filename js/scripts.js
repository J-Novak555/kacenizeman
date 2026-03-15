// Po načtení celé struktury HTML
window.addEventListener('DOMContentLoaded', () => {
    const offset = 74; // posun při scrollu (např. výška pevného menu)

    // --- Logo scroll-to-top ---
    const logo = document.getElementById("customLogo");
    if (logo) {
        logo.style.cursor = "pointer";
        logo.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // --- Toggle menu ---
    const navToggle = document.getElementById('customNavToggle');
    const navMenu = document.getElementById('customNavMenu');

    if(navToggle && navMenu){
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            navToggle.classList.toggle('active');
        });
    }

    // --- Smooth scroll na odkazy ---
    const navLinks = document.querySelectorAll('.custom-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.scroll;
            const target = document.getElementById(targetId);
            if(target){
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
                history.replaceState(null, null, window.location.pathname); // URL zůstane čistá
            }

            if(navMenu.classList.contains('show')){
                navMenu.classList.remove('show');
                navToggle.classList.remove('active');
            }
        });
    });

    // --- Změna třídy navbar při scrollu ---
    const navBar = document.getElementById('customNavbar');
    const scrollOffset = 50;
    if(navBar){
        window.addEventListener('scroll', () => {
            if(window.scrollY > scrollOffset){
                navBar.classList.add('scrolled');
            } else {
                navBar.classList.remove('scrolled');
            }
        });
    }

    // --- Vanilla JS lightbox ---
    const overlay = document.getElementById("lightbox-overlay");
    const overlayImg = document.getElementById("lightbox-img");
    const overlayCaption = document.getElementById("lightbox-caption");

    document.querySelectorAll(".lightbox").forEach(img => {
        img.addEventListener("click", () => {
            overlayImg.src = img.src;
            overlayCaption.textContent = img.dataset.caption || "";

            overlay.style.display = "flex";
            requestAnimationFrame(() => overlay.classList.add("show"));

            overlayImg.onload = () => {
                overlayCaption.style.width = overlayImg.getBoundingClientRect().width + "px";
            };
        });
    });

    overlay.addEventListener("click", () => {
        overlay.classList.remove("show");
        setTimeout(() => overlay.style.display = "none", 250);
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            overlay.classList.remove("show");
            setTimeout(() => overlay.style.display = "none", 250);
        }
    });

    // --- Lazy-load masthead video ---
    const video = document.querySelector(".masthead-video");
    if(video){
        // Odstraníme všechny existující source (pokud jsou)
        video.querySelectorAll("source").forEach(s => s.remove());

        const srcWebm = video.dataset.srcWebm;
        const srcMp4 = video.dataset.srcMp4;

        if(srcWebm){
            const sourceWebm = document.createElement("source");
            sourceWebm.src = srcWebm;
            sourceWebm.type = "video/webm";
            video.appendChild(sourceWebm);
        }
        if(srcMp4){
            const sourceMp4 = document.createElement("source");
            sourceMp4.src = srcMp4;
            sourceMp4.type = "video/mp4";
            video.appendChild(sourceMp4);
        }

        // Načtení videa až po DOM
        video.load();
    }

});