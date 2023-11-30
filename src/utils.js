const checkInclusionOne = (arr1, arr2) => {
  for (let i = 0; i < arr2.length; i++) {
    if (arr1.includes(arr2[i])) {
      return true;
    }
  }
  return false;
}

export const loadingEffect = (local, func) => {
  let loader = document.createElement('div');
  loader.style.border = "5px solid #F3F3F3";
  loader.style.borderTop = "5px solid #104a1f";
  loader.style.borderRadius = "50%";
  loader.style.width = "30px";
  loader.style.height = "30px";
  loader.style.animation = "spin 400ms linear infinite";

  let auxText = local.innerHTML || local.textContent;
  local.textContent = "";

  local.append(loader);
  setTimeout(() => {
    func();
    loader.remove();
    local.insertAdjacentHTML("beforeend", auxText);
  }, 800);
}

export function checkEmailFormat(email) { // expressão regular de formato de email: "blablabla@blablabla.com"
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function checkPasswordFormat(password) {
  let number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let finalListABC = [];
  let abcList = "abcdefghihklmnopqrstuv";
  finalListABC.push(...abcList);
  finalListABC.push(...abcList.toUpperCase());
  if (password.length < 5) return false; // password maior que 5caracteres
  let char = password.split("");
  if (!checkInclusionOne(char, finalListABC)) return false; // tem q ter caracteres
  if (!checkInclusionOne(char, number)) return false; // tem q ter numeros

  return true;
}

export function setCookie(key, value, expire = '1d') {
  let timeNumber = parseInt(expire.slice(0, -1));
  let timeUnit = expire.slice(-1);
  let unitMultiplier = { d: 24 * 60 * 60 * 1000, h: 60 * 60 * 1000, m: 60 * 1000, s: 1000 };
  let time = timeNumber * unitMultiplier[timeUnit];
  time = Date.now() + time;
  value = JSON.stringify(value);
  document.cookie = `${key}=${value}; expires=${new Date(time).toUTCString()}; path=/`;
}

export function getCookies(key) {
  const cookies = document.cookie.split('; ');
  const ckObj = {};
  console.log(cookies)
  for (let i in cookies) {
    const [k, v] = cookies[i].split('=');
    try{
      ckObj[k] = JSON.parse(v);
    } catch(e) {
      ckObj[k] = v;
    }
  }

  if (key) {
    return ckObj[key];
  }
  return ckObj;
}

export function cardOutClick() {
  let allCardFrames = document.querySelectorAll(".card-frame");
  allCardFrames.forEach(cardFrame => {
      cardFrame.addEventListener("click", e => {
          let target = e.target;
          if (target == cardFrame) {
              console.log("Clicou fora")
              cardFrame.classList.toggle("hidden")
          }
      })
  })
}