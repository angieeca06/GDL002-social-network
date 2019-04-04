let contentDiv = document.querySelector("#content");

let routes = {
  '/src/': sectionLogIn,
  '/src/#signUp': signUpTemplate,
  // '/src/templates/': profile,
  //'/home': homepage,
  // '/src/newsfeed': newsFeed,
  // '/src/profile': profile,
  // '/src/menu': menu,
};



window.onpopstate = () => {
  contentDiv.innerHTML = routes[window.location.pathname];
};

let onNavItemClick = (pathName) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  contentDiv.innerHTML = routes[pathName];
};

contentDiv.innerHTML = routes[window.location.pathname];

document.querySelector("#linkSignUp").addEventListener("click", (e) => {
  e.preventDefault();
  console.log('hola');
  onNavItemClick('/src/#TimeLine');
});
// if (window.location.pathname == "/index.html" || window.location.pathname == "/") {
//   document.getElementById("btn-test").addEventListener("click",showAnother);
// }
// function showAnother (){
//   OnNavItemClick("/otro.html");
// }

function addEventListeners(){
const btnList = document.querySelectorAll(".js");

for (let i = 0; i < btnList.length; i++) {
  if (window.location.pathname == '/' ) {
    btnList[i].addEventListener("click", function(event){
      socialNetwork[event.target.dataset.next](documentgetElementById(event.target.attributes.dataFirst.value).value,
      document.getElementById(event.target.attributes.dataSecond.value).value);
    });
  }else if (window.location.pathname == '/src/templates/singup.js') {
    btnList[i].addEventListener("click", function(event){
      socialNetwork[event.target.dataset.next](
        document.getElementById(event.target.attributes.dataEmail.value).value,
        document.getElementById(event.target.attributes.dataPass.value).value,
        document.getElementById(event.target.attributes.dataName.value).value,
        document.getElementById(event.target.attributes.dataLast.value).value
      );
    });
  } else{
    btnList[i].addEventListener("click", function(event){
      socialNetwork[event.target.dataset.next]();
        });
     }
  }
};