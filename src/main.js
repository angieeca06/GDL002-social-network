(function() {
    const config = {
        apiKey: "AIzaSyBImEucNY2TK77Vvs1dmdQYYGi8jduZ4bk",
        authDomain: "parentips-93346.firebaseapp.com",
        databaseURL: "https://parentips-93346.firebaseio.com",
        projectId: "parentips-93346",
        storageBucket: "parentips-93346.appspot.com",
        messagingSenderId: "77351177292"
    };
    firebase.initializeApp(config);
    //Obtener elementos
    const txtEmailLogin = document.getElementById("e-mailLogIn");
    const txtPasswordLogin = document.getElementById("passwordLogIn");
    const btnLogin = document.getElementById("buttonLogin");
    const btnSignUp = document.getElementById("buttonSignUp");
    const btnLogOut = document.getElementById("buttonLogOut");
    const txtEmailSignUp = document.getElementById("e-mailSignUp");
    const txtPasswordSignUp = document.getElementById("passwortSignUp");
    //Añnadir evento login
    btnLogin.addEventListener("click", e=>{
        //Obtener email y pass
        const email = txtEmailLogin.value;
        const pass = txtPasswordLogin.value;
        const auth = firebase.auth();
        //Sign in 
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });
    //Añadir evento Sign Up
    btnSignUp.addEventListener("click", e=>{
        //Obtener email y pass
        //TODO: comprobar que el email sea real
        const email = txtEmailSignUp.value;
        const pass = txtPasswordSignUp.value;
        const auth = firebase.auth();
        //Sign in 
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    btnLogOut.addEventListener("click", e =>{
        firebase.auth().signOut();
    });
    //Añadir uun listener en tiempo real 
    firebase.auth().onAuthStateChanged( firebaseUser =>{
        if(firebaseUser){
            console.log(firebaseUser);
            btnLogOut.classList.remove("hide");
        }else{
            console.log("No logueado");
            btnLogOut.classList.add("hide");
        }
    });
}());


const hide = () =>{
    document.getElementById("signUp").style.display = "block";
    document.getElementById("logIn").style.display = "none";
};
document.getElementById("link").addEventListener("click", hide);

// const checkFirebase = () =>{
//     const user = document.getElementById("e-mailLogIn").value;
//     const password = document.getElementById("passwordLogIn").value;
//     console.log(user, password)
//     // window.data.(user, password);
// }
// Añadir un listener en tiempo real 

