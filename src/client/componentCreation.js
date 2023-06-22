function card(title) {
    let cardFrame = document.createElement('div');
    cardFrame.className = "card-frame";

    let card = document.createElement('div');
    card.className = "card";

    let top_bar = document.createElement('div');
    top_bar.className = "top-bar";

    let cardTitle = document.createElement('h2');
    cardTitle.textContent = title;

    let btnClose = document.createElement('button');
    btnClose.className = "btn-close";

    btnClose.addEventListener('click', () => {
        cardFrame.remove();
    });

    top_bar.appendChild(cardTitle);
    top_bar.appendChild(btnClose);
    card.appendChild(top_bar);
    cardFrame.appendChild(card);

    return cardFrame;
}

function cardDialog(local) {
    document.body.appendChild(card("Item novo"));
}

const componentCreation = {
    cardDialog: () => cardDialog()
}
