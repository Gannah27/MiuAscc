import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js"; //Commit

    import {
        getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut
    } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
    import { getDatabase, set, ref, update, push } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";


    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    const firebaseConfig = {
        // Your configs
        apiKey: "AIzaSyBRC3Z3hwO2K5GL4GuYT6lj2uHF81HhHIE",
    authDomain: "trialsocialmedia-24fd5.firebaseapp.com",
    databaseURL: "https://trialsocialmedia-24fd5-default-rtdb.firebaseio.com",
    projectId: "trialsocialmedia-24fd5",
    storageBucket: "trialsocialmedia-24fd5.appspot.com",
    messagingSenderId: "489989876046",
    appId: "1:489989876046:web:a6ee092801e1da5b45961f",
    measurementId: "G-NK7X1BMFS1"
    };

    const app = initializeApp(firebaseConfig);
    //const auth = getAuth();
    const database = getDatabase(app);

   var makeAdminButton = document.getElementById('makeAdmin');
   if(makeAdminButton)
   {
    makeAdminButton.addEventListener('click', function(e){
        e.preventDefault();
        var uid = document.getElementById('uid').value;
        push(ref(database, 'users/' + uid), {
            
            isAdmin: 1,
        })
            .then(() => {
                // Data saved successfully!
                alert('User is now an admin successfully !');
            })
            .catch((error) => {
                // The write failed...
                alert("user not found");
            });

    });
   }
