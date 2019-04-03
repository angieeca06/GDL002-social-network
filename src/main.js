const txtEmailLogin = document.querySelector("#e-mailLogIn");
const txtPasswordLogin = document.querySelector("#passwordLogIn");
const btnLogin = document.querySelector("#buttonLogin");
const btnSignUp = document.querySelector("#buttonSignUp");
const btnLogOut = document.querySelector("#buttonLogOut");
const txtEmailSignUp = document.querySelector("#e-mailSignUp");
const txtPasswordSignUp = document.querySelector("#passwortSignUp");
const nameUser = document.querySelector("#nameSignUp");
const lastNameUser = document.querySelector("#lastNameSignUp");

firebase.initializeApp(window.data.config);
const db = firebase.database()
//Añadir evento al boton Sign In con correo y contraseña
btnLogin.addEventListener("click", e =>{
    const email = document.querySelector("#e-mailLogIn").value;
    const pass = document.querySelector("#passwordLogIn").value;
    //Sign in  
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then((user) => {
        db.ref("/users/" + user.uid).once("value")
        .then(function(snapshot) {
            var username = (snapshot.val() && snapshot.val().name)  || 'Anonymous';
            name = username;
            email1 = email;
            photo = "https://drogaspoliticacultura.net/wp-content/uploads/2017/09/placeholder-user.jpg";
            showProfile(name, email1, photo);
        });
       
    })
    .catch(e => {
        document.querySelector("#messageEmail").style.display = "block";
        const message = e.message;
        document.querySelector("#messageEmail").innerHTML = message;
    });
});
//Añadir evento al boton Login con correo y contraseña
btnSignUp.addEventListener("click", e=>{
    const email = txtEmailSignUp.value;
    const pass = txtPasswordSignUp.value;
    const nameComplete = nameUser.value + " " + lastNameUser.value;
    //Login 
    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(user =>{
        window.data.saveData(user.uid, nameComplete, user.email);
        name = nameComplete;
        email1 = email;
        photo = "https://drogaspoliticacultura.net/wp-content/uploads/2017/09/placeholder-user.jpg";
        post = null;
        showProfile(name, email1, photo);
    })
    .catch(e => {
        document.querySelector("#messageEmailSU").style.display = "block";
        const message = e.message;
        document.querySelector("#messageEmailSU").innerHTML = message;
    });
});
//Añadir evento al boton de Log Out
btnLogOut.addEventListener("click", e =>{
    document.querySelector("#logIn").style.display = "block";
    firebase.auth().signOut();
});
//Añadir un listener en tiempo real y guardar data en realtime
firebase.auth().onAuthStateChanged( firebaseUser =>{
    if(firebaseUser){
        btnLogOut.classList.remove("hide");
        document.querySelector("#signUp").style.display = "none";
        document.querySelector("#logIn").style.display = "none";
    }else{
        btnLogOut.classList.add("hide");
    };
});
//Limpiar y ocultar campos de Login 
const hideLogIn = () =>{
    txtEmailSignUp.value = "";
    txtPasswordSignUp.value = "";
    nameUser.value = "";
    lastNameUser.value = "";
    document.querySelector("#signUp").style.display = "block";
    document.querySelector("#logIn").style.display = "none"; 
};
document.querySelector("#linkSignUp").addEventListener("click", hideLogIn);
//Limpiar y ocultar campos de Sign Up
const hideSignOut = () =>{
    txtEmailLogin.value = "";
    txtPasswordLogin.value = "";
    document.querySelector("#signUp").style.display = "none";
    document.querySelector("#logIn").style.display = "block";
};
document.querySelector("#linkLogIn").addEventListener("click", hideSignOut);
//Login con google
document.querySelector("#loginGoogle").addEventListener("click", function(){
    firebase.auth().signInWithPopup(window.data.provider).then(function(result){
        window.data.sendDataGoogle(result.user);
        console.log(result.user);
        name = result.user.displayName;
        email = result.user.email;
        photo = result.user.photoURL;
        showProfile(name, email, photo);
    return result.user;
    });
});
//Login con Facebook
document.querySelector("#loginFacebook").addEventListener("click", function(){
    firebase.auth().signInWithPopup(window.data.providerFace).then((result) =>{
        window.data.sendDataGoogle(result.user);
        console.log(result.user);
        const name = result.user.displayName;
        const email = result.user.email;
        const photo = result.user.photoURL;
        showProfile(name, email, photo);
        return result.user;
    });
});
//Funcion para mostrar la información del perfil
const showProfile = (name, email, photo) =>{
    document.querySelector("#profile").innerHTML = ` <img  src="${photo}"> 
    ${name}
    ${email}`;
};
//mostrar modal 
const showModal =() =>{
    var modal = document.querySelector("#modal");
    modal.style.marginTop = "100px";
    modal.style.left = ((document.body.clientWidth-350) / 2) +  "px";
    modal.style.display = "block";
};
//Evento del botón de Create post 
document.querySelector("#createPost").addEventListener("click", showModal);
//Ocultar modal 
const hideModal = () =>{
    document.querySelector("#modal").style.display = "none";
};
document.querySelector("#toPost").addEventListener("click", hideModal);
//Almacenar los post en firebase 
document.querySelector("#toPost").addEventListener("click", () =>{
    let messagePost = document.querySelector("#post").value;
    window.data.createPost(messagePost);
    // messagePost = "";
    document.querySelector("#post").value = "";
});

const printPost = firebase.database().ref('posts/');
printPost.on('child_added', function(s) {
    const user = s.val();
    let section = document.createElement("section");
    let btnUpdate = document.createElement("button");
    let btnDelete = document.createElement("button");
    let spanName = document.createElement("span");
    let span = document.createElement("span")
    let text = document.createTextNode(user.contenido);
    let userName = document.createTextNode(user.autor);
    btnDelete.textContent = 'Eliminar';
    btnUpdate.textContent = 'Editar';
    spanName.appendChild(userName);
    span.appendChild(text);
    section.appendChild(spanName);
    section.appendChild(span);
    section.appendChild(btnUpdate);
    section.appendChild(btnDelete);
    document.querySelector("#postSection").appendChild(section);
});


//Función para conteo de me gusta 
// let i=0;
// document.querySelector("#heart").addEventListener("click", () => {
//     i++;
//     document.querySelector("#hearti").innerHTML = i;