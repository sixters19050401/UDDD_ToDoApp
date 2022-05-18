import firebase from "firebase";
import '@firebase/firestore'

// async function bootstrap() {
//     await firestore().settings({
//       persistence: false, // disable offline persistence
//     });
//   }
const firebaseConfig = {
    apiKey: "AIzaSyBUImxsIP2OjCHrFiMmffmoV_HhZX2mF0Y",
    authDomain: "todoapp-87d34.firebaseapp.com",
    projectId: "todoapp-87d34",
    storageBucket: "todoapp-87d34.appspot.com",
    messagingSenderId: "887427036862",
    appId: "1:887427036862:web:e7acbf27cccb94534250ef"
  };

 
class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
           firebase.initializeApp(firebaseConfig)
          

        }
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                callback(null,user)
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch((error) => {
                        callback(error);
                    })
            }
        })
    }
    getLists(callback) {
        let ref = this.ref.orderBy("name")
        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = []
    
            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()});
            })
            callback(lists);
        })
    }
    addList(list) {
        let ref = this.ref
        ref.add(list)
    }

    updateList(list) {
        let ref = this.ref
        ref.doc(list.id).update(list)
    }
    deleteTask(id){
        let ref = this.ref
        console.log(ref.id)
        ref.doc(id).delete()
    }
    get userId() {
        return firebase.auth().currentUser.uid  
    }

    get ref () {
        return firebase
            .firestore()
            .collection('users')
            .doc(this.userId)
            .collection('lists');
    }



    detach () {
        this.unsubscribe();
    }
} 



export default Fire;