document.addEventListener('DOMContentLoaded', function () {
    var sections = document.querySelectorAll('.toggle-section');
    sections.forEach(function (section) {
        section.style.display = 'block';
    });
});

function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section.style.display === "block") {
        section.style.display = "none";
    } else {
        section.style.display = "block";
    }
}

function toggleMenu() {
    var navbarLinks = document.getElementById('navbar-links');
    navbarLinks.classList.toggle('active');
}