import { createUserWithEmailAndPassword, getAuth, sendSignInLinkToEmail, } from "firebase/auth";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseconfig";
import { toast } from "react-toastify";

export const createUser = async (values) => {
    const { email, password, username } = values;
    var isSuccess = false;
    try {
        const auth = getAuth();
        let res = await createUserWithEmailAndPassword(auth, email, password)
        console.log(res, "res___");
        if (res) {
            const { createdAt } = res.user.metadata;
            const uid = res.user.uid;
            const email = res.user.email;
            const photoURL = res.user.photoURL;
            //create doc file in firestore
            //Creatse a new collection and save user info


            setDoc(doc(db, 'users', createdAt), {
                ...res.user.metadata,
                email: email,
                username: username,
                photoURL: photoURL,
                uid: uid
            })
                .then(() => {
                    console.log('Document successfully written!')
                    toast.success("You have successfully created your account", { theme: "colored" });
                    isSuccess = true;
                    sendSignInLinkToEmail(auth, email, actionCodeSettings)
                        .then(() => {
                            // The link was successfully sent. Inform the user.
                            // Save the email locally so you don't need to ask the user for it again
                            // if they open the link on the same device.
                            toast.success("An email link is sent to your email address!", { theme: "colored" });

                            window.localStorage.setItem('emailForSignIn', email);
                            isSuccess = true;
                            return isSuccess;

                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            console.log(errorCode, "errorCode");
                            const errorMessage = error.message;
                            toast.error(errorMessage, { theme: "colored" });
                            return isSuccess;


                            // ...
                        });


                })
                .catch((error) => {
                    toast.error("Oops! Something went wrong!", { theme: "colored" });

                    console.error('Error writing document: ', error)
                    return isSuccess;
                })
        }
    }
    catch (e) {
        console.log(e, "errr");
        toast.error(e.message, { theme: "colored" });
        return isSuccess;

    }
};
//Redirect user to the link when click on email

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://talk-with-me.netlify.app/',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
        bundleId: 'com.example.ios'
    },
    android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
    },
    // dynamicLinkDomain: 'https://talk-with-me.netlify.app/'
};