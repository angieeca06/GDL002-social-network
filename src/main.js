const txtEmailLogin = document.getElementById("e-mailLogIn");
const txtPasswordLogin = document.getElementById("passwordLogIn");
const btnLogin = document.getElementById("buttonLogin");
const btnSignUp = document.getElementById("buttonSignUp");
const btnLogOut = document.getElementById("buttonLogOut");
const txtEmailSignUp = document.getElementById("e-mailSignUp");
const txtPasswordSignUp = document.getElementById("passwortSignUp");
const nameUser = document.getElementById("nameSignUp");
const lastNameUser = document.getElementById("lastNameSignUp");

firebase.initializeApp(window.data.config);
//Añadir evento al boton Sign In con correo y contraseña
btnLogin.addEventListener("click", e=>{
    const email = txtEmailSignUp.value;
    const pass = txtPasswordSignUp.value;
    const auth = firebase.auth();
    //Sign in  
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => {
        document.getElementById("messageEmail").style.display = "block";
        const message = e.message;
        document.getElementById("messageEmail").innerHTML = message;
    });
});
//Añadir evento al boton Login con correo y contraseña
btnSignUp.addEventListener("click", e=>{
    const email = txtEmailSignUp.value;
    const pass = txtPasswordSignUp.value;
    const auth = firebase.auth();
    //Login 
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => {
        document.getElementById("messageEmailSU").style.display = "block";
        const message = e.message;
        document.getElementById("messageEmailSU").innerHTML = message;
    });
});
//Añadir evento al boton de Log Out
btnLogOut.addEventListener("click", e =>{
    document.getElementById("logIn").style.display = "block";
    firebase.auth().signOut();
});
//Añadir un listener en tiempo real y guardar data en realtime
firebase.auth().onAuthStateChanged( firebaseUser =>{
    if(firebaseUser){
        let uid = firebaseUser.uid;
        window.data.saveData(uid);
        btnLogOut.classList.remove("hide");
        document.getElementById("signUp").style.display = "none";
        document.getElementById("logIn").style.display = "none";
    }else{
        btnLogOut.classList.add("hide");
    }
});
//Limpiar y ocultar campos de Login 
const hideLogIn = () =>{
    txtEmailSignUp.value = "";
    txtPasswordSignUp.value = "";
    nameUser.value = "";
    lastNameUser.value = "";
    document.getElementById("signUp").style.display = "block";
    document.getElementById("logIn").style.display = "none"; 
};
document.getElementById("linkSignUp").addEventListener("click", hideLogIn);
//Limpiar y ocultar campos de Sign Up
const hideSignOut = () =>{
    txtEmailLogin.value = "";
    txtPasswordLogin.value = "";
    document.getElementById("signUp").style.display = "none";
    document.getElementById("logIn").style.display = "block";
};
document.getElementById("linkLogIn").addEventListener("click", hideSignOut);
//Login con google
var provider = new firebase.auth.GoogleAuthProvider();
document.getElementById("loginGoogle").addEventListener("click", function(){
    firebase.auth().signInWithPopup(provider).then(function(result){
        window.data.sendDataGoogle(result.user);
        console.log(result.user);
        name = result.user.displayName;
        email = result.user.email;
        photo = result.user.photoURL;
        showProfile(name, email, photo);
    return result.user;
    });
});
//Funcion para mostrar la información del perfil
const showProfile = (name, email, photo) =>{
    document.getElementById("profile").innerHTML = ` <img src="${photo}"> 
    ${name}
    ${email}`
}

// var db = firebase.database(); 
// db.collection("users").add({
//     name: name,
//     email: email,
//     photo: photo,
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });

//Función para conteo de me gusta 
// let i=0;
// document.getElementById("heart").addEventListener("click", () => {
//     i++;
//     document.getElementById("hearti").innerHTML = i;
// });
