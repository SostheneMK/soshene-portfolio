emailjs.init("o4DUt5Jthy7Oqd-0O");

const form = document.getElementById("contact-form");
const status = document.querySelector(".form-status");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm(
        "sosthene_portfolio",
        "template_aot7ckf",
        form
    )
    .then(() => {
        status.textContent = "Message envoyé avec succès.";
        form.reset();
    })
    .catch((error) => {
        status.textContent = "Erreur lors de l'envoi du message.";
        console.error(error);
    });
});