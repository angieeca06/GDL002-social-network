let contentDiv = document.getElementById('content');

let routes = {
  '/src/index1.html': sectionLogIn,
  //'/index1.html': homepage,
  '/index1.html': sectionSingUp,
  //'/home': homepage,
  '/src/newsfeed': newsFeed,
  '/src/profile': profile,
  '/src/menu': menu,
};

window.onpopstate = () => {
  contentDiv.innerHTML = routes[window.location.pathname];
};

// let onNavItemClick = (pathName) => {
//   window.history.pushState({}, pathName, window.location.origin + pathName);
//   contentDiv.innerHTML = routes[pathName];
// }

contentDiv.innerHTML = routes[window.location.pathname];


// if (window.location.pathname == "/index.html" || window.location.pathname == "/") {
//   document.getElementById("btn-test").addEventListener("click",showAnother);
// }
// function showAnother (){
//   OnNavItemClick("/otro.html");
// }