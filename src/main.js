const txtEmailLogin = document.getElementById("e-mailLogIn");
const txtPasswordLogin = document.getElementById("passwordLogIn");
const btnLogin = document.getElementById("buttonLogin");
const btnSignUp = document.getElementById("buttonSignUp");
const btnLogOut = document.getElementById("buttonLogOut");
const txtEmailSignUp = document.getElementById("e-mailSignUp");
const txtPasswordSignUp = document.getElementById("passwortSignUp");
const nameUser = document.getElementById("nameSignUp");
const lastNameUser = document.getElementById("lastNameSignUp");

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
  
    //Añnadir evento login
    btnLogin.addEventListener("click", e=>{
        //Obtener email y pass
        const email = txtEmailLogin.value;
        const pass = txtPasswordLogin.value;
        const auth = firebase.auth();
        //Sign in 
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => {
            document.getElementById("messageEmail").style.display = "block";
            const message = "Este correo no está registrado";
            document.getElementById("messageEmail").innerHTML = message;
            console.log(e.message);
        });
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
        promise.catch(e => {
            document.getElementById("messageEmailSU").style.display = "block";
            const message = "Este correo ya está registrado";
            document.getElementById("messageEmailSU").innerHTML = message;
            console.log(e.message);
        });
    });

    btnLogOut.addEventListener("click", e =>{
        document.getElementById("logIn").style.display = "block";
        firebase.auth().signOut();
    });
    //Añadir uun listener en tiempo real 
    firebase.auth().onAuthStateChanged( firebaseUser =>{
        if(firebaseUser){
            console.log(firebaseUser);
            btnLogOut.classList.remove("hide");
            document.getElementById("signUp").style.display = "none";
            document.getElementById("logIn").style.display = "none";
        }else{
            console.log("No logueado");
            btnLogOut.classList.add("hide");
        }
    });



const hideLogIn = () =>{
    txtEmailSignUp.value = "";
    txtPasswordSignUp.value = "";
    nameUser.value = "";
    lastNameUser.value = "";
    document.getElementById("signUp").style.display = "block";
    document.getElementById("logIn").style.display = "none"; 
};
document.getElementById("linkSignUp").addEventListener("click", hideLogIn);

const hideSignOut = () =>{
    txtEmailLogin.value = "";
    txtPasswordLogin.value = "";
    document.getElementById("signUp").style.display = "none";
    document.getElementById("logIn").style.display = "block";
};
document.getElementById("linkLogIn").addEventListener("click", hideSignOut);



// let i=0;
// document.getElementById("heart").addEventListener("click", () => {
//     i++;
//     document.getElementById("hearti").innerHTML = i;
// });


//Login con google

var provider = new firebase.auth.GoogleAuthProvider();
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
$("#loginGoogle").click(function(){
    firebase.auth().signInWithPopup(provider).then(function(result){
        console.log(result.user);
    });

})
