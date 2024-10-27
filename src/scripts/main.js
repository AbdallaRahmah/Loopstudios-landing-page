const menuToggle = document.getElementById('menu-toggle')

const menu = document.getElementById('menu')

menuToggle.addEventListener('click', () => {
    if (menuToggle.getAttribute('aria-expanded') === null) {
        closeMenu()
    } else {
        if (menuToggle.getAttribute('aria-expanded') === 'false') {
            openMenu()
        } else {
            closeMenu()
        }
    }
})

function openMenu() {
    menuToggle.setAttribute('aria-expanded', 'true')
    menu.setAttribute('aria-hidden', 'false')
}

function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false')
    menu.setAttribute('aria-hidden', 'true')
}
