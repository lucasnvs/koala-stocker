function criaSignupCard() {
    var divSignup = document.createElement('div');
    divSignup.id = 'signup';

    // Criação do elemento <h1> com a classe "title" e texto "Sign-up"
    var h1Title = document.createElement('h1');
    h1Title.className = 'title';
    h1Title.textContent = 'Sign-up';
    divSignup.appendChild(h1Title);

    // Criação do elemento <div> com a classe "side"
    var divSide = document.createElement('div');
    divSide.className = 'side';

    // Criação dos campos de entrada de nome e sobrenome
    var divNameContainer = document.createElement('div');
    divNameContainer.className = 'input-container';

    var inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.required = true;
    inputName.id = 'name_signup';
    inputName.name = 'name_signup';
    divNameContainer.appendChild(inputName);

    var labelName = document.createElement('label');
    labelName.htmlFor = 'name_signup';
    labelName.textContent = 'Nome';
    divNameContainer.appendChild(labelName);

    divSide.appendChild(divNameContainer);

    var divUndernameContainer = document.createElement('div');
    divUndernameContainer.className = 'input-container';

    var inputUndername = document.createElement('input');
    inputUndername.type = 'text';
    inputUndername.required = true;
    inputUndername.id = 'undername_signup';
    inputUndername.name = 'undername_signup';
    divUndernameContainer.appendChild(inputUndername);

    var labelUndername = document.createElement('label');
    labelUndername.htmlFor = 'undername_signup';
    labelUndername.textContent = 'Sobrenome';
    divUndernameContainer.appendChild(labelUndername);

    divSide.appendChild(divUndernameContainer);

    divSignup.appendChild(divSide);

    // Criação dos campos de entrada de email e senha
    var divEmailContainer = document.createElement('div');
    divEmailContainer.className = 'input-container';

    var inputEmail = document.createElement('input');
    inputEmail.type = 'text';
    inputEmail.required = true;
    inputEmail.id = 'email_signup';
    inputEmail.name = 'email_signup';
    divEmailContainer.appendChild(inputEmail);

    var labelEmail = document.createElement('label');
    labelEmail.htmlFor = 'email_signup';
    labelEmail.textContent = 'Email';
    divEmailContainer.appendChild(labelEmail);

    divSignup.appendChild(divEmailContainer);

    var divPassContainer = document.createElement('div');
    divPassContainer.className = 'input-container';

    var inputPass = document.createElement('input');
    inputPass.type = 'password';
    inputPass.required = true;
    inputPass.id = 'pass_signup';
    inputPass.name = 'pass_signup';
    divPassContainer.appendChild(inputPass);

    var labelPass = document.createElement('label');
    labelPass.htmlFor = 'pass_signup';
    labelPass.textContent = 'Senha';
    divPassContainer.appendChild(labelPass);

    divSignup.appendChild(divPassContainer);

    // Criação do botão "Começar"
    var btnSignup = document.createElement('button');
    btnSignup.id = 'btn_signup';
    btnSignup.className = 'btn all';
    btnSignup.textContent = 'Começar';
    divSignup.appendChild(btnSignup);

    // Criação do elemento <span> com o texto "ou"
    var spanOr = document.createElement('span');
    spanOr.textContent = 'ou';
    divSignup.appendChild(spanOr);

    // Criação do elemento <h5> com a classe "regist" e texto "Já tem conta? Entre agora"
    var h5Regist = document.createElement('h5');
    h5Regist.className = 'regist';
    h5Regist.textContent = 'Já tem conta? ';

    var aSignupRef = document.createElement('a');
    aSignupRef.id = 'signup-ref';
    aSignupRef.textContent = "Entre agora";
    aSignupRef.addEventListener("click", () => {
        divSignup.remove();
        white_side.appendChild(loginCard);
    });

    h5Regist.appendChild(aSignupRef);
    divSignup.appendChild(h5Regist);
    
    btnSignup.addEventListener("click", () => {
        let register = {
            name: inputName.value,
            undername: inputUndername.value,
            email: inputEmail.value,
            pass: inputPass.value
        }
    
        if(checkEmailFormat(register.email) && checkPasswordFormat(register.pass)) {
            if(localStorage.set('users', newObject(register))) {
                loadingEffect(btn_signup, () => {
                    divSignup.remove();
                    white_side.appendChild(loginCard);
                });
            }
        }
    });

    return divSignup;
}
