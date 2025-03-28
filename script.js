window.onload = function() {
    document.getElementById("contact-form").onsubmit = function (event) {
        event.preventDefault();
    
        let form = event.target;
    
        fetch("https://formsubmit.co/andreyviniciusjodar@gmail.com", {
            method: "POST",
            body: new FormData(form)
        }).then(response => {
            if(response.ok) {
                document.getElementById("popup").style.display="flex";
                form.reset();
            } else {
                alert("Erro ao enviar mensagem por email. Tente novamente");
            }
        }).catch(error => {
            alert("Erro de conexão.");
        });
    }
}

function closePopup() {
    document.getElementById("popup").style.display="none";
}