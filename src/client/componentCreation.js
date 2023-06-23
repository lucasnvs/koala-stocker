const card = (title, child = "") => {
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
    card.appendChild(child);
    cardFrame.appendChild(card);

    return cardFrame;
}

function cardDialog() {
    let body = document.createElement("div");
    body.className = "product-register";

    let input = document.createElement("input");
    input.type = "text";

    let texth4 = document.createElement("h4");
    texth4.textContent = "Qual medida você deseja usar para este alimento?"

    let radioUnit = document.createElement("input");
    radioUnit.type = "radio";
    radioUnit.id = "radioUnit";
    radioUnit.value = "unit";
    radioUnit.name = "radio-range";
    let radioKg = document.createElement("input");
    radioKg.type = "radio";
    radioKg.id = "radioKg";
    radioKg.value = "kg";
    radioKg.name = "radio-range";

    let imageInput = document.createElement("input");
    imageInput.type = "file";

    let btnSubmit = document.createElement("button");
    btnSubmit.textContent = "Cadastrar";

    btnSubmit.addEventListener("click", () => {
        var product;
        let unit = radioUnit.checked;
        let kg = radioKg.checked;

        let measureChosen;
        if(unit) measureChosen = "UNIT";
        if(kg) measureChosen = "KG";

        let file = imageInput.files[0];
        var reader = new FileReader();
        
        reader.onload = function(event) {
            var imageContent = event.target.result;

            product = {
                name: "Leite",
                measure: measureChosen,
                image: imageContent,
                quantRange: { min: 0, max: 10}
            }

            console.log(product);
            let im = document.createElement("img");
            im.src = product.image;
            document.body.appendChild(im);
        }

        reader.readAsDataURL(file);
    })

    body.appendChild(input);
    body.appendChild(texth4);
    body.appendChild(radioUnit);
    body.appendChild(radioKg);
    body.appendChild(imageInput);
    body.appendChild(btnSubmit);

    let c = card("Cadastrar alimento", body);
    document.body.appendChild(c);
}

const componentCreation = {
    cardDialog: () => cardDialog()
}
