const observer = new IntersectionObserver(
    ([e]) => e.target.toggleAttribute('stuck', e.intersectionRatio < 1),
    { threshold: [1] }
);

observer.observe(document.querySelector('nav'));

// document.getElementsByClassName("hamburger")[0].addEventListener('click', function() {
//     const navElements = document.getElementsByClassName("nav-elements")
//     navElements[0].style.display = "block"
//     navElements[1].style.display = "block"
    
// })