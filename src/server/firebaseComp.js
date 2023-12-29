// import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { collection, getFirestore, doc, getDoc } from "firebase/firestore";

// import { app } from "./firebaseInit";

// export const isAuthenticated = () => {
//     const auth = getAuth(app);

//     return new Promise((resolve, reject) => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       unsubscribe();
//       if (user) {
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     }, (error) => {
//       reject(error);
//     });
//   });

// }

// //create a new user
// export const createUser = async (username, email, password) => {
//   const auth = await getAuth(app)
//   await createUserWithEmailAndPassword(auth, email, password)

//   const user = auth.currentUser;
//   if (user !== null) {
//     return true
//   } else {
//     return false
//   }
// }

// //sign in a user
// export const signinUser = async (email, password) => {
//   const auth = await getAuth(app)
//   try {
//     await signInWithEmailAndPassword(auth, email, password)
//   } catch (error) {
//     return false
//   }

//   const user = auth.currentUser;
//   if (user !== null) {
//     return true
//   } else {
//     return false
//   }
// }

// //return default tasks
// export const getTaskSections = async (setTaskSections) => {
//   // const user = getAuth(app)
//   // console.log(user.currentUser.uid)

//   const db = getFirestore();
//   const docRef = doc(db, "Tasks", "wYGXdgUfGJoDNzg6QqOO");

//   try {
//     const docSnap = await getDoc(docRef);
//     console.log(docSnap.data());
//   } catch(error) {
//     console.log(error)
//   }
// }