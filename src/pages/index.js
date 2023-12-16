import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import * as styles from "../components/index.module.css"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm50RBrA1Rl1LjGC0CSBnrlQOVgOKWJ8A",
  authDomain: "pbbs-1a40c.firebaseapp.com",
  projectId: "pbbs-1a40c",
  storageBucket: "pbbs-1a40c.appspot.com",
  messagingSenderId: "636735452426",
  appId: "1:636735452426:web:a604271295e9d0319fb6f3",
  measurementId: "G-9KH3V5CSWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

  onAuthStateChanged(auth,(user) => {
    if (user){
      console.log('auth user',user);
      document.querySelector('#msg').textContent = user.email+' logined !';
    }
  });

  function login(){
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    const auth = getAuth();
    signInWithEmailAndPassword(auth,email,password)
      .then((user) => {
        console.log(user.email+' Sign in successfully.');
      }).catch((error) => {
        console.log(error.message);
        document.querySelector('#msg').textContent =
          'fail to login ...';
      });
  }

  function logout(){
    const auth = getAuth();
    signOut(auth);
    document.getElementById('msg').textContent = 'no login...';
  }

const IndexPage = () => {
  return(
  <div>
  <h1>Login Page</h1>
  <p id="msg">no login...</p>
  <div id="firebaseui-auth-container"></div>
  <table>
    <tr><th>Email</th>
    <td><input type="email" id="email" /></td></tr>
    <tr><th>Password</th>
    <td><input type="password" id="password" /></td></tr>
    <tr><th></th><td>
      <button onClick={()=>login()}>Loign</button>
      <button onClick={()=>logout()}>Logout</button>
    </td></tr>
  </table>
  </div>
  );
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export default IndexPage
