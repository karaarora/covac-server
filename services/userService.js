const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyBwj4bvOHy2YB05D7qP5EnlJIzoi-az2IU",
    authDomain: "momo-b8d32.firebaseapp.com",
    databaseURL: "https://momo-b8d32.firebaseio.com",
    projectId: "momo-b8d32",
    storageBucket: "momo-b8d32.appspot.com",
    messagingSenderId: "909686875889",
    appId: "1:909686875889:web:d40422ee706abcd35aab50",
    measurementId: "G-FPVJZRV8FL"
});
  
var db = firebase.firestore();

module.exports = {
    addUser: ({name, phone, age, pin}) => {
        return db.collection("users").add({
            name: name,
            phone: phone,
            age: age,
            pincode: pin
        })
    },
    getAllUsers: () => {
        let results = []
        return db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                results.push({
                    name: doc.data().name,
                    phone: doc.data().phone,
                    pin: doc.data().pincode,
                    age: doc.data().age
                })
            });
            return Promise.resolve(results)
        });        
    }
}