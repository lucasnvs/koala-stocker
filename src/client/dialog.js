const errMSG = (paramText = "Erro!") => {
    let container = document.createElement("div");
    container.className = "container-msg";
    
    let msg = document.createElement("div");
    msg.className = "msg err appear";

    let symbol = document.createElement("svg");
    msg.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9.5" stroke="#C41F1F"/>
    <path d="M5 5L15 15" stroke="#C41F1F" stroke-linecap="round"/>
    <path d="M5 15L15 5" stroke="#C41F1F" stroke-linecap="round"/>
    </svg>`;

    let text = document.createElement("p");
    text.textContent = paramText;

    msg.appendChild(symbol);
    msg.appendChild(text);
    container.appendChild(msg)

    document.body.appendChild(container);
    setTimeout(() => {
        container.remove();
    }, 2000)
}

const sucessMSG = (paramText = "Sucesso!") => {
    let container = document.createElement("div");
    container.className = "container-msg";

    let msg = document.createElement("div");
    msg.className = "msg sucess appear";

    let symbol = document.createElement("svg");
    msg.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9.5" stroke="#0FC00B"/>
    <path d="M2.99999 11.3552L7.3178 15.5214L16.3444 6.16612" stroke="#0FC00B" stroke-linecap="round"/>
    </svg>`;

    let text = document.createElement("p");
    text.textContent = paramText;

    msg.appendChild(symbol);
    msg.appendChild(text);
    container.appendChild(msg)

    document.body.appendChild(container);
    setTimeout(() => {
        container.remove();
    }, 2000)
}

export const toastMessage = (message, type = "success") => {
    if(type == "error") {
        errMSG(message);
    }
    if(type == "success") {
        sucessMSG(message);
    }
};