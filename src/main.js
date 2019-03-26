

`(function() {`
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
    const btnSave = document.getElementById ("buttonSave");
    const txtEmailSignUp = document.getElementById("e-mailSignUp");
    const txtPasswordSignUp = document.getElementById("passwordSignUp");
    const nameSignUp = document.getElementById("nameSignUp");
    const lastNameSignUp = document.getElementById("lastNameSignUp");

    
    //Añnadir evento login
    btnLogin.addEventListener("click", (e) =>{
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

    btnSave.addEventListener("click", e =>{
        firebase.database().ref("profile")
        .set ({
            nombre: nameSignUp.value,
            apellido: lastNameSignUp.value,
            correo: txtEmailSignUp.value,
        });
    });

    btnLogOut.addEventListener("click", e =>{
        firebase.auth().signOut();
    });
    //Añadir uun listener en tiempo real 
    firebase.auth().onAuthStateChanged( firebaseUser =>{
        if(firebaseUser){
            console.log(firebaseUser);
            btnLogOut.classList.remove("hide");
            btnSave.classList.remove("hide");
        }else{
            console.log("No logueado");
            btnLogOut.classList.add("hide");
            btnSave.classList.add("hide");
        }
    });
`});`


const hideLogIn = () =>{
    document.getElementById("signUp").style.display = "block";
    document.getElementById("logIn").style.display = "none";
};
document.getElementById("linkSignUp").addEventListener("click", hideLogIn);

const hideSignOut = () =>{
    document.getElementById("signUp").style.display = "none";
    document.getElementById("logIn").style.display = "block";
};
document.getElementById("linkLogIn").addEventListener("click", hideSignOut);