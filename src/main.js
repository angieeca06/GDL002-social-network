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
const db = firebase.database()
//Añadir evento al boton Sign In con correo y contraseña
btnLogin.addEventListener("click", e =>{
    const email = txtEmailLogin.value;
    const pass = txtPasswordLogin.value;
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
        document.getElementById("messageEmail").style.display = "block";
        const message = e.message;
        document.getElementById("messageEmail").innerHTML = message;
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
        btnLogOut.classList.remove("hide");
        document.getElementById("signUp").style.display = "none";
        document.getElementById("logIn").style.display = "none";
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
document.getElementById("loginGoogle").addEventListener("click", function(){
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
document.getElementById("loginFacebook").addEventListener("click", function(){
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
    document.getElementById("profile").innerHTML = ` <img  src="${photo}"> 
    ${name}
    ${email}`;
};
//mostrar modal 
const showModal =() =>{
    var modal = document.getElementById("modal");
    modal.style.marginTop = "100px";
    modal.style.left = ((document.body.clientWidth-350) / 2) +  "px";
    modal.style.display = "block";
};
//Evento del botón de Create post 
document.getElementById("createPost").addEventListener("click", showModal);
//Ocultar modal 
const hideModal = () =>{
    document.getElementById("modal").style.display = "none";
};
document.getElementById("toPost").addEventListener("click", hideModal);
//Almacenar los post en firebase 
document.getElementById("toPost").addEventListener("click", () =>{
    const messagePost = document.getElementById("post").value;
    window.data.createPost(messagePost);
    document.getElementById("post") = "";
});

const printPost = firebase.database().ref('posts/');
printPost.on('child_added', function(s) {
    const user = s.val();
    let section = document.createElement("section");
    let text = document.createTextNode(user.contenido);
    let userName = document.createTextNode(user.autor);
    section.appendChild(userName);
    section.appendChild(text)
    document.getElementById("postSection").appendChild(section);
});

// firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//     var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
    // ...
// const printPost = () =>{
//     const post = document.getElementById("postSection");
// const userId = firebase.auth().currentUser.uid;
// const divPost = document.createElement("div"); 
// db.ref("users/" + userId).child("post").get()
// .then((querySnapshot) =>{
//     querySnapshot.forEach(doc => {
//         post.innerHTML += `

//         `
//     });
// })








// const renderPost = (doc) => {
//     let li = document.createElement('li');
//     let post = document.createElement('span');
//     let deletePost = document.createElement('button');
//     let updatePost = document.createElement('button');

//     li.setAttribute('data-id', doc.id);
//     post.textContent = doc.data().post;
//     deletePost.textContent = 'Eliminar';
//     updatePost.textContent = 'Editar';

//     li.appendChild(post);
//     li.appendChild(updatePost);
//     li.appendChild(deletePost);
//     postList.appendChild(li);

//     //deleting post
//     deletePost.addEventListener('click', (e) => {
//         e.stopPropagation();
//         let id = e.target.parentElement.getAttribute('data-id');
//         db.ref('posts').doc(id).delete();
//     })
//     //update
//     updatePost.addEventListener('click', (e) => {
//         const oldElement = post;
//         const oldText = oldElement.textContent;
//         const newElement = document.createElement('input');
//         newElement.type = 'text';
//         li.appendChild(newElement);

//         oldElement.replaceWith(newElement);
//         newElement.value = oldText;
//         const updateButton = document.createElement('button');
//         updateButton.textContent = 'Actualizar';
//         li.appendChild(updateButton);

//         updateButton.addEventListener('click', (e) => {
//             post.textContent = newElement.value;
//             newElement.replaceWith(oldElement);
//             let id = e.target.parentElement.getAttribute('data-id');
//             console.log('id', id);
//             e.stopPropagation();
//             e.preventDefault();
//             db.collection('posts').doc(id).update({
//                 post: newElement.value
//             });
//             li.removeChild(updateButton);
//         })

//     })
// }







//     var userId = firebase.auth().currentUser.uid;
// firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
//   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
//   console.log(username);
// });
// };



// const printPost = (userId) =>{
//     const writePost = firebase.database().ref('users/' + userId + '/post/' );
//     writePost.once('value', function(snapshot) {
//         // console.log(snapshot.val());
//         const posts = snapshot.val();
        // console.log(JSON.stringify(posts))
        // posts.forEach(doc => {
        //     console.log(doc)
        // });
        
        // snapshot.forEach(doc => {
        //     console.log(doc)
        //     console.log("uid post " + .data().post.uid)
        //     console.log(snapshot.val());
        // });
        
//         updateStarCount(postElement, snapshot.val());
// });
    // const post = document.getElementById("postSection");
    // db.ref("users/" + userId).child("post").get()
    // .then((querySnapshot) =>{
    //     console.log(querySnapshot);
    //     querySnapshot.forEach(doc => {
            
    //         post.innerHTML += `
    //             <div id="postCreate">
    //                 ${doc.data().name}
    //                 ${doc.data().post}
    //             </div>
    //         `
    // });
    // document.getElementById("post").value = "";
    // })
    // .catch("No entra")
// }

//Para pintar los post en pantalla
// const post = document.getElementById("postSection");
// const userId = firebase.auth().currentUser.uid;
// const divPost = document.createElement("div"); 
// db.ref("users/" + userId).child("post").get()
// .then((querySnapshot) =>{
//     querySnapshot.forEach(doc => {
//         post.innerHTML += `

//         `
//     });
// })

//Función para conteo de me gusta 
// let i=0;
// document.getElementById("heart").addEventListener("click", () => {
//     i++;
//     document.getElementById("hearti").innerHTML = i;