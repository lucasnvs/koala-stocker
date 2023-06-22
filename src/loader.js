// olhar em cada objeto pelo arquivo que quero e adicionar 
// os scripts com o path, para saber receber um paramentro 
// na funcao que é uma lista com os nomes e talvez o html q quero inserir

// ta engessado

const pageScripts = [
  {
    url: "index.html",
    scripts: [
      "signup.js",
      "utils.js",
      "login.js",
      "db.js",
      "testDB.js"
    ]
  },
  {
    url: "main.html",
    scripts: [
      "componentCreation.js",
      "script.js",
      "db.js"
    ]
  }
]
const items = [
  {
    "file": "db.js",
    "dir": "./src/database/db.js"
  },
  {
    "file": "testDB.js",
    "dir": "./src/database/testDB.js"
  },
  {
    "file": "data.json",
    "dir": "./src/database/data.json"
  },
  {
    "file": "login.js",
    "dir": "./src/client/login.js"
  },
  {
    "file": "signup.js",
    "dir": "./src/client/signup.js"
  },
  {
    "file": "utils.js",
    "dir": "./src/utils.js"
  },
  {
    "file": "componentCreation.js",
    "dir": "./src/client/componentCreation.js"
  },
  {
    "file": "script.js",
    "dir": "./src/client/script.js"
  }
]

function scriptHandler(url) {
  let page =  pageScripts.filter(page => page.url === url);
  if (page.length <= 0) return
  page = page[0];
  page.scripts.forEach( filename => {
    const scriptElement = document.createElement("script");
    let [path] = items.filter(value => value.file === filename);
    if(!path) return;
    scriptElement.src = url != "index.html" ? `.${path.dir}` : path.dir;
    scriptElement.async = true;
    document.head.appendChild(scriptElement);
  });
}

function findRootDirectory() {
  let loc = window.location.pathname;
  let locSplited = loc.split("/");
  if(locSplited.length > 2) {
    loc = locSplited[locSplited.length - 1];
  }
  switch (loc) {
    case "/": return "index.html";
    case "index.html": return "index.html";
    case "/index.html": return "index.html";
    case "main.html": return "main.html";
  }
}

const rootDirectory = findRootDirectory();
scriptHandler(rootDirectory);