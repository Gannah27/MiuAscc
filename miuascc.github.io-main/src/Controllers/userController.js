import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
    import {
        getAuth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut
    } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";
    import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";


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

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const database = getDatabase(app);
    var btnRegister = document.getElementById('submit');
    var login = document.getElementById('loginBtn');
    var logout =  document.getElementById('logoutShow');
    
if(login)
{
    login.addEventListener('click', function(e) {

        e.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        //sign up user


        // log in user
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...

                // save log in details into real time database
                var lgDate = new Date();
                update(ref(database, 'users/' + user.uid), {
                    last_login: lgDate,
                })
                    .then(() => {
                        // Data saved successfully!
                        alert('user logged in successfully');
                        window.location.replace("index.html");


                    })
                    .catch((error) => {
                        // The write failed...
                        alert(error);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            });


        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    });

}
    

    
  

if(btnRegister)
{
    btnRegister.addEventListener('click', function(e)
    {
        e.preventDefault();
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var confirmPassword = document.getElementById('cPassword').value;
      var teamPos = document.getElementById('teams').value;
      var username = document.getElementById('uname').value;
      var fname = document.getElementById('fullname').value;
    
      if(password == confirmPassword){
    
        createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    //...user.uid
                    set(ref(database, 'users/' + user.uid), {
                        username: username,
                        email: email,
                        password: password,
                        clubPosition: teamPos,
                        isAdmin:0,
                        fullname: fname
                    })
                        .then(() => {
                            // Data saved successfully!
                            alert('User created successfully');
                            location.replace('login.html');
            
                        })
                        .catch((error) => {
                            // The write failed...
                            alert(error);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    alert(errorMessage);
                });
    
            }
    
            else{
                alert('Password not matching');
            }
    
    });

}

var announ = document.getElementById('ann');
      
      //var firebaseRef = database().ref();
auth.onAuthStateChanged(function(user) {
    
    if (user) {
        // User is signed in.
    
        var user = auth.currentUser;
    
        if(user != null){
            var isAdminRef = ref(database, 'users/' + user.uid + '/isAdmin');
            onValue(isAdminRef, (snapshot) => {
                var data = snapshot.val();
                console.log(data);
                if(data)
                { 
                    document.getElementById('adminShow').style.display = "block";
                    document.getElementById('addPostShow').style.display = "block";

                }
              });
              document.getElementById('announShow').style.display = "block";
              document.getElementById('logoutShow').style.display = "block";
              document.getElementById('loginShow').style.display = "none";
              document.getElementById('registerShow').style.display = "none";

        }
    
      } else {
        document.getElementById('loginShow').style.display = "block";
        document.getElementById('registerShow').style.display = "block";
        
        
      }
});

if(logout){
    logout.addEventListener('click',function(e){
        e.preventDefault();
        auth.signOut();
        alert('Logged out successfully');
        window.location.replace("index.html");


    });
}
    

   
    
