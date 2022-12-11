import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../Firebase/firebaseconfig";

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

            sendEmailVerification(auth.currentUser)
                .then(() => {
                    // Email verification sent!
                    toast.success("Email Verification sent! Check your mail box", { theme: "colored" });
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
                        })
                        .catch((error) => {
                            toast.error("Oops! Something went wrong!", { theme: "colored" });
                            console.error('Error writing document: ', error)
                            return isSuccess;
                        })

                  }).catch((error) => {
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
