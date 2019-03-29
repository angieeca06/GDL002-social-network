let contentDiv = document.getElementById('content');

let routes = {
  '/src/index1.html': sectionLogIn,
  //'/index1.html': homepage,
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

