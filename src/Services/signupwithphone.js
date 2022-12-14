
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../Firebase/firebaseconfig";



export const SignUpWithPhoneHelper = async (values) => {
  const auth = getAuth();
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
  var isSuccess = false;
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, values.phoneNumber, window.recaptchaVerifier)

    console.log(confirmationResult, "confirmationResult");
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.verfiyOtp = confirmationResult;
    isSuccess = true;
  }
  catch (error) {
    // Error; SMS not sent
    console.log(error, "error");
    toast.error(error, { theme: "colored" })

    isSuccess = false;
  }
  return isSuccess;


}
export const saveUserInformation = async (res, state) => {
  var response = false;
  try {
    const { createdAt } = res.user.metadata;
    const uid = res.user.uid;
    const email = res.user.email;
    const photoURL = res.user.photoURL;
    await setDoc(doc(db, 'users', createdAt), {
      ...res.user.metadata,
      email: email,
      username: '',
      photoURL: photoURL,
      uid: uid,
      ...state
    })
      .then(() => {
        console.log('Document successfully written!')
        
        toast.success("You have successfully created your account", { theme: "colored" });
        response = true;
      }).catch((error) => {
        toast.error("Oops! Something went wrong!", { theme: "colored" });
        console.error('Error writing document: ', error)
      })
  } catch (err) {
    response = false
    toast.error("Oops! Something went wrong!", { theme: "colored" });

  }
  return response;

}
export const addUserEmail = async (email, createdAt) => {
  console.log(createdAt,"createdAt");
  var response = false;
  try {
    const user = doc(db, "users", createdAt);
    // Set the "capital" field of the city 'DC'
    await updateDoc(user, {
      email: email,
    })

      .then(() => {
        response = true;
      }).catch((error) => {
        toast.error("Oops! Something went wrong!", { theme: "colored" });
        console.error('Error writing document: ', error)
      })
  } catch (err) {
    console.log(err, "errr");
    response = false
    toast.error("Oops! Something went wrong!", { theme: "colored" });

  }
  return response;

}