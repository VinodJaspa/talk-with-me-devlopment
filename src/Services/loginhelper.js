import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseconfig";
import { toast } from "react-toastify";

export const getAuthentication = async (values) => {
var response =[]
    try {
        const auth = getAuth();
        let res = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
        );
        if (res) {
            const { createdAt } = res.user.metadata;
            const uid = res.user.uid;
            const email = res.user.email;
            const photoURL =res.user.photoURL;
            console.log(res, "/resss");

            //create doc file in firestore
            //Creatse a new collection and save user info


            setDoc(doc(db, 'users', createdAt), {
                ...res.user.metadata,
                email:email,
                photoURL:photoURL,
                uid: uid
            })
                .then(() => {

                    console.log('Document successfully written!')
                })
                .catch((error) => {

                    console.error('Error writing document: ', error)
                })
            //Getting current user data
             response = await getcurrentUserData(uid);
            if (response.length) {
                return response;
            } else {
                return response;
            }



        }
    }
    catch (e) {
        console.log(e, "errr");
       
        toast.error(e.message, { theme: "colored" });
        return response;

    }
};

export const getcurrentUserData = (userID) => {
    return new Promise((resolve, reject) => {
        try {
            let currrentUser = collection(db, `users`)
            onSnapshot(currrentUser, (doc) => getLoggedInUserListing(doc.docs))

            const getLoggedInUserListing = (payload) => {

                let data = payload.map((ele, i) => ({ ...ele.data() }))
                let currentUserInfo = data.filter((el) => el.uid === userID)

                resolve(currentUserInfo)
            }
        } catch (err) {
            reject(err)
        }
    })
}
