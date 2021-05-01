const firebase = require("firebase");
const config = require("../firebase.config")
require("firebase/firestore");

firebase.initializeApp(config);
  
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
    },
    deleteUser: (email) => {
        return db.collection("users").where('phone', '==', email).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete()
            })
        });       
    }

}