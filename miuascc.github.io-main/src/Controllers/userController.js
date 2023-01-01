import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { doc, getDocs, setDoc, getFirestore, collection, Timestamp, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"
import { getStorage, uploadBytes, ref as ref_storage, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js"


//Database
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
const fs = getFirestore(app);
const st = getStorage(app);

var btnRegister = document.getElementById('submit');
var login = document.getElementById('loginBtn');
var logout = document.getElementById('logoutShow');


// The following is the Login code logic
if (login) {
    login.addEventListener('click', function (e) {

        e.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        // log in user
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

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





if (btnRegister) {
    btnRegister.addEventListener('click', function (e) {
        e.preventDefault();
        // Get values written in the registeration forms
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('cPassword').value;
        var teamPos = document.getElementById('teams').value;
        var username = document.getElementById('uname').value;
        var fname = document.getElementById('fullname').value;

        if (password == confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    //...Push the user data to the firebase
                    set(ref(database, 'users/' + user.uid), {
                        username: username,
                        email: email,
                        password: password,
                        clubPosition: teamPos,
                        isAdmin: 0,
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
                    // ..Display the error in the console
                    alert(errorMessage);
                });
        }
        else {
            alert('Password not matching');
        }
    });

}

var announ = document.getElementById('ann');
var userID;

//var firebaseRef = database().ref();
auth.onAuthStateChanged(function (user) {
    let userFullname;

    if (user) {
        // User is signed in.

        var user = auth.currentUser;
        if (user != null) {
            //check whether the logged in user is an admin
            var isAdminRef = ref(database, 'users/' + user.uid + '/isAdmin');
            onValue(isAdminRef, (snapshot) => {
                var data = snapshot.val();
                userID = user.uid;
                console.log(data);
                console.log(user.uid);
                //show specefic buttons
                if (data) {
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
    const date = new Date();
    console.log(user.uid);
    if (user != null) {
        var userFullnameRef = ref(database, 'users/' + user.uid + '/fullname');
        onValue(userFullnameRef, (snapshot) => {
            userFullname = snapshot.val();
            console.log(userFullname);

            if (addPostbtn) {
                addPostbtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    let minute = date.getMinutes();
                    let hour = date.getHours();
                    let day = date.getDate();
                    let month = date.getMonth() + 1;
                    let year = date.getFullYear();
                    let currentDate = `${day}-${month}-${year}`;
                    let currentTime = `${hour}:${minute}`

                    const docData = {
                        author: userFullname,
                        date: "Posted at: " + currentTime + " " + currentDate,
                        createdAt: Timestamp.fromDate(new Date()),
                        imageUrl: imageURL,
                        formLink: document.getElementById("formLink").value,
                        postContent: document.getElementById("postDetails").value,
                        postName: document.getElementById("postTitle").value
                    };
                    var docRef = doc(collection(fs, "posts"));
                    setDoc(docRef, docData).then(() => {
                        console.log("post created");

                    })
                        .catch((error) => {
                            // The write failed...
                            alert(error);
                        });

                });
            }
        });

    }

});

if (logout) {
    logout.addEventListener('click', function (e) {
        e.preventDefault();
        auth.signOut();
        alert('Logged out successfully');
        window.location.replace("index.html");


    });
}


let fileUpload = document.getElementById("fileIn");
let imageURL = " ";
let addPostbtn = document.getElementById("addpost");


let random_name_int = Math.floor(100000000 + Math.random() * 900000000);
let random_name = random_name_int.toString();
var storageRef = ref_storage(st, random_name);
if (fileUpload) {
    fileUpload.addEventListener('change', function (evt) {
        let firstFile = evt.target.files[0]; // upload the first file only
        let uploadTask = uploadBytes(storageRef, firstFile).then(function (snapshot) {

            console.log('success! your image has been uploaded!');
            getDownloadURL(storageRef).then(function (downloadURL) {
                imageURL = downloadURL;
                console.log('imageURL:', imageURL);
            });
        });
    })
};







