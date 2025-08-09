// model/authModel.js
import {
  auth,
  app,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
} from '../firebase/firebaseInit.js'; //  use initialized auth


// export async function checkEmailExists(email) {
//   try {
//     console.log(email);
//     const methods = await fetchSignInMethodsForEmail(auth, email);
//     console.log(methods);
//     return methods.length > 0; // True if email exists
//   } catch (error) {
//     throw error;
//   }
// }

// Log in an existing user

export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return { success: true, user: userCredential.user };
  } catch (error) {
    throw error;
  }
}

// Sign Up a new user and add displayName
export async function signupUser(name, email, password) {
  //  Create the user in firebase
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  //  Update the user's profile with their display name
  await updateProfile(userCredential.user, { displayName: name });

  // Return the user object
  return userCredential.user;
}

// Get current logged-in user
export function getCurrentUser() {
  return auth.currentUser;
}



export function observeAuthState(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}


export async function logoutUser() {
  await signOut(auth);
}
