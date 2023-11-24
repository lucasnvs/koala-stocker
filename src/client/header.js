export function buildHeader() {
    document.getElementById("header").innerHTML = 
    `
        <a href="main.php">
            <img src="./assets/icons/Logo.png" class="logo" alt="logo koala stocker">
        </a>

        <div class="user">
            <h3><span id="user-name">Usuário</span><img src="./assets/icons/caret-down.svg"></h3>
            <ul id="top-menu-options">
                <li><a id="disconnect">Desconectar</a></li>
            </ul>
        </div>
    `

    fetch("./backend/session.php").then(async res => {
        let data = await res.json();
    
        document.getElementById("user-name").innerHTML = data.user.name;
        if(data.user.role == "ADMIN" && window.location.pathname != "/admin.php") {
            document.getElementById("top-menu-options").insertAdjacentHTML("afterbegin", `<li><a href="admin.php">Admin</a></li>`);
        }
    });

    document.getElementById("disconnect").addEventListener("click", () => {
        fetch("./backend/logout.php").then(async res => {
            window.location.href = "./index.php";
        })
    });
}