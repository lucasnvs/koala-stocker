const btn_signup = document.getElementById("btn_signup");
const nameSign = document.getElementById("name_signup");
const undernameSign = document.getElementById("undername_signup");
const emailSign = document.getElementById("email_signup");
const passSign = document.getElementById("pass_signup");

btn_signup.addEventListener("click", () => {
    let register = {
        name: nameSign.value,
        undername: undernameSign.value,
        email: emailSign.value,
        pass: passSign.value
    }

    if(checkEmailFormat(register.email) && checkPasswordFormat(register.pass)) {
        if(db.set('users', newObject(register))) loadingEffect(btn_signup);
    }

});
