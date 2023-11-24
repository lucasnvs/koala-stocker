<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/gif" href="./assets/icons/logo_img.png">
    <link rel="stylesheet" href="./styles/global.css">
    <link rel="stylesheet" href="./styles/index.css">
    <link rel="stylesheet" href="./styles/subclasses.css">
    <link rel="stylesheet" href="./styles/components.css">
    <title>Koala's - Acesso</title>
    <script type="module" src="./src/client/login.js" async></script>
    <script type="module" src="./src/client/signup.js" async></script>
</head>
<body>
    <div id="verde">
        <div class="logo-container">
            <img src="./assets/icons/Logo.png" alt="Koala's Stocker">
        </div>
        <h1 class="title">Seu gerenciador de estoque de comida, para você nunca mais se esquecer de suas compras.</h1>
    </div>
    <div id="branco">
            <form id="login" method="post">
                <h1 class="title">Log-in</h1>
                <div class="input-container">
                    <input type="text" required id="email_login" name="email_login">
                    <label for="email_login">Email</label>
                </div>
                <div class="input-container">
                    <input type="password" required id="pass_login" name="pass_login">
                    <label for="pass_login">Senha</label>
                </div>
                <div class="remember-me">
                    <input type="checkbox" id="remember">
                    <label for="remember">Lembrar de mim</label>
                </div>
                <input type="submit" id="btn_acess" class="btn all" value="Acessar">
                <h5><a href="#">Esqueceu a senha?</a></h5>
                <span>ou</span>
                <h5 class="regist">Sem conta? <a id="login-ref">Registre-se</a></h5>
            </form>
    </div>
</body>
</html>