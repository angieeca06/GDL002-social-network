window.data = {
    config: {
        apiKey: "AIzaSyBImEucNY2TK77Vvs1dmdQYYGi8jduZ4bk",
        authDomain: "parentips-93346.firebaseapp.com",
        databaseURL: "https://parentips-93346.firebaseio.com",
        projectId: "parentips-93346",
        storageBucket: "parentips-93346.appspot.com",
        messagingSenderId: "77351177292"
    },

    saveData: (uid) =>{
        let user = {
            uid: uid,
            name: nameUser.value,
            lastName: lastNameUser.value,
            email: txtEmailSignUp.value,
        }
        firebase.database().ref("users/" + uid)
        .set(user);
    },

    sendDataGoogle: (user) =>{
        const users = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
        }
        firebase.database().ref("users/" + user.uid)
        .set(users);
    }

    // firebase: (user) => {
    //     firebase.auth().onAuthStateChanged(function(user, password) {
    //         if (user) {
    //             // User is signed in
    //             var email = user.email;
    //             // ...
    //         } else {
    //             // User is not signed in
    //             // ...
    //         }
    //     });
    //     firebase.auth().signInWithEmailAndPassword(email, password);
    // }
}