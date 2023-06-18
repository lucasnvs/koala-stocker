function card() {
    let card = document.createElement('div');
    card.className = "card";

    let btnCLose = document.createElement('button');
    btnCLose.className = "btn-close";
    btnCLose.addEventListener('click', () => {
        card.remove();
    });

    return card;
}

function cardDialog(local) {
    let cardBody = card();
}

const componentCreation = {
    name: "Carro"
}
