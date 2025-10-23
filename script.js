/* smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// contact form handler (open email app)
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const mailto = `mailto:rsdebsa@gmail.com?subject=Message from ${name}&body=${message}%0A%0AFrom: ${email}`;
    window.location.href = mailto;
});
*/
document.addEventListener("DOMContentLoaded", () => {
    const offset = 64; // navbar height
    function smoothScrollTo(targetY, duration) {
        const startY = window.scrollY || window.pageYOffset;
        const diff = targetY - startY;
        const start = performance.now();
        function step(now) {
            const t = Math.min((now - start) / duration, 1);
            const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
            window.scrollTo(0, startY + diff * ease);
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    document.querySelectorAll("[data-scroll]").forEach(a => {
        a.addEventListener("click", e => {
            e.preventDefault();
            const id = a.getAttribute("href");
            const el = document.querySelector(id);
            if (!el) return;
            const y = el.getBoundingClientRect().top + window.pageYOffset - offset + 1;
            smoothScrollTo(y, 600);
            const nav = document.querySelector(".nav-links");
            if (nav && nav.classList.contains("show")) nav.classList.remove("show");
        });
    });

    const burger = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (burger && links) {
        burger.addEventListener("click", () => links.classList.toggle("show"));
    }

    const revealEls = document.querySelectorAll(".glass, .card, .contact");
    const io = new IntersectionObserver(entries => {
        entries.forEach(ent => { if (ent.isIntersecting) ent.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    revealEls.forEach(el => io.observe(el));

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            const name = (document.getElementById("name").value || "").trim();
            const email = (document.getElementById("email").value || "").trim();
            const message = (document.getElementById("message").value || "").trim();
            const to = "rsdebsa@gmail.com";
            const subject = encodeURIComponent("Portfolio Contact — " + (name || "No name"));
            const body = encodeURIComponent(
              "Name: " + (name || "-") + "\n" +
              "Email: " + (email || "-") + "\n\n" +
              message
            );
            window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        });
    }
});
// ==== Resume Modal ====
//const resumeModal = document.getElementById("resume-modal");
//const closeResume = document.getElementById("close-resume");

// وقتی روی آیکون رزومه کلیک شد (هم تو Hero هم تو Socials)
/*document.querySelectorAll('a[title="Resume"]').forEach(el => {
   el.addEventListener("click", e => {
        e.preventDefault();
        resumeModal.style.display = "flex";
    });
});*/

// دکمه‌ی بستن
if (closeResume) {
    closeResume.addEventListener("click", () => resumeModal.style.display = "none");
}

// وقتی بیرون از باکس کلیک شد، بسته بشه
window.addEventListener("click", e => {
    if (e.target === resumeModal) resumeModal.style.display = "none";
});
