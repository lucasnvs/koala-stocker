function setLogged(user) {
  localStorage.setItem("loggedUser", JSON.stringify(user))
}

const checkInclusionOne = (arr1, arr2) => {
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.includes(arr2[i])) {
      return true;
    }
  }
  return false;
}

const loadingEffect = (local, func) => {
  let loader = document.createElement('div');
  loader.style.border = "5px solid #F3F3F3";
  loader.style.borderTop = "5px solid #104a1f";
  loader.style.borderRadius = "50%";
  loader.style.width = "30px";
  loader.style.height = "30px";
  loader.style.animation = "spin 400ms linear infinite";

  local.textContent = "";
  local.append(loader);
  setTimeout(() => {
    func();
  }, 800);
}

function checkEmailFormat(email) { // expressão regular de formato de email: "blablabla@blablabla.com"
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function checkPasswordFormat(password) {
  let number = ["0","1","2","3","4","5","6","7","8","9"];
  let finalListABC = [];
  let abcList = "abcdefghihklmnopqrstuv";
  finalListABC.push(...abcList);
  finalListABC.push(...abcList.toUpperCase());
  if(password.length < 5) return false;
  let char = password.split("");
  if(!checkInclusionOne(char, finalListABC)) return false;
  if(!checkInclusionOne(char, number)) return false;

  return true;
}