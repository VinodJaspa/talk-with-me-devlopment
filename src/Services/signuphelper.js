import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../Firebase/firebaseconfig";

export const createUser = async (values) => {
    const { email, password, username } = values;
    var isSuccess = [];
    try {
        const auth = getAuth();
        let res = await createUserWithEmailAndPassword(auth, email, password)

        if (res) {
            const { createdAt } = res.user.metadata;
            const uid = res.user.uid;
            const email = res.user.email;
            const photoURL = res.user.photoURL;
            //create doc file in firestore
            //Creatse a new collection and save user info
            console.log(res, "res++++");
            if (res && res.user.emailVerified === false) {
                const user = res.user;

                await sendEmailVerification(user)
                    .then(() => {
                        // Email verification sent!
                        let msg = 'An email verification link has been sent to ' + user.email;
                        localStorage.setItem("emailForSignIn", user.email);
                        toast.success(msg, { theme: "colored" });
                        // Email verification sent!
                        // auth.signOut();
                        isSuccess = res.user;
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



                            }).catch((error) => {
                                toast.error("Oops! Something went wrong!", { theme: "colored" });
                                console.error('Error writing document: ', error)

                            })

                    })
                    .catch((error) => {
                        console.log(user, "user");
                    });




            }
            
        }
    }
    catch (e) {
        console.log(e, "errr");
        toast.error(e.message, { theme: "colored" });
        

    }
    return isSuccess;
};
//Redirect user to the link when click on email
