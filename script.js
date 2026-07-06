/* ==========================================================
   SCROLL FADE ANIMATION
========================================================== */

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15,
    }
);

document.querySelectorAll(".fade").forEach((section) => {
    observer.observe(section);
});

/* ==========================================================
   NAVBAR ACTIVE LINK
========================================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

/* ==========================================================
   SMOOTH SCROLL
========================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

/* ==========================================================
   FLOATING CARDS PARALLAX
========================================================== */

const floatingCards = document.querySelectorAll(".floating");

document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    floatingCards.forEach((card, index) => {

        const speed = (index + 1) * 0.3;

        card.style.transform =
            `translate(${x * speed}px, ${y * speed}px)`;

    });

});

/* ==========================================================
   HERO TYPING EFFECT (OPTIONAL)
========================================================== */

const heading = document.querySelector(".hero h1");

if (heading) {

    heading.style.opacity = "0";

    window.addEventListener("load", () => {

        heading.animate(
            [
                { opacity: 0, transform: "translateY(30px)" },
                { opacity: 1, transform: "translateY(0px)" }
            ],
            {
                duration: 900,
                easing: "ease-out",
                fill: "forwards"
            }
        );

    });

}
