import React, { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { isNonEmptyString } from "../helpers/check";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
  getDocs,
  collection,
  arrayUnion,
} from "firebase/firestore";
import { showMessage } from "react-native-flash-message";
export const AuthContext = createContext();
const firebaseConfig = {
  apiKey: "AIzaSyDU424doRMp7LCEyZIlIb1zk1ziS8wznpg",
  authDomain: "chat-app-e7efb.firebaseapp.com",
  projectId: "chat-app-e7efb",
  storageBucket: "chat-app-e7efb.appspot.com",
  messagingSenderId: "700253439085",
  appId: "1:700253439085:web:09a6734933953870d96b64",
};
initializeApp(firebaseConfig);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(0);
  const [validateIDs, setValidateIDs] = useState([]);
  const [data, setData] = useState(null);
  const [firebaseUserRef, setFirebaseUserRef] = useState(null);
  const [userData, setUserData] = useState([]);
  const auth = getAuth();
  const firestore = getFirestore();
  const signIn = async (props) => {
    if (isNonEmptyString(props.email) && isNonEmptyString(props.password)) {
      await signInWithEmailAndPassword(auth, props.email, props.password)
        .then((res) => {
          setUser(res.user);
          showMessage({
            message: "Başarılı",
            description: "Giriş yapıldı",
            type: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          showMessage({
            message: err.message.slice(10),
            type: "danger",
            duration: 3000,
          });
          console.log(err.message);
        });
    } else {
      showMessage({
        message: "Hata",
        description: "Lütfen email ve şifre giriniz",
        type: "danger",
        duration: 3000,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        setUser,
        signIn,
        firestore,
        loading,
        setLoading,
        userData,
        setUserData,
        data,
        setData,
        setFirebaseUserRef,
        firebaseUserRef,
        userType,
        setUserType,
        validateIDs,
        setValidateIDs,

        signUp: async (props) => {
          const { email, password, workPlace } = props;
          const auth = await getAuth();
          try {
            createUserWithEmailAndPassword(auth, email, password).then(
              async (res) => {
                const { userType } = props;
                const firestore = await getFirestore();
                const docRef = await doc(
                  firestore,
                  `doctors`,
                  `${res.user.uid}`
                );
                const patientRef = await doc(
                  firestore,
                  "patients",
                  `${res.user.uid}`
                );
                const teamRef = await doc(
                  firestore,
                  "teams",
                  `${res.user.uid}`
                );

                if (userType === 0) {
                  await setDoc(docRef, {
                    name: null,
                    surname: null,
                    email: res.user.email,
                    patients: [],
                    photoURL: null,
                    id: res.user.uid,
                    workplace: workPlace,
                  });
                } else if (userType === 1) {
                  await setDoc(patientRef, {
                    name: null,
                    surname: null,
                    email: res.user.email,
                    photoURL: null,
                    patients: [],
                    id: res.user.uid,
                    birthday: null,
                    vaccination: null,
                    testDate: null,
                    testResult: null,
                    resultDate: null,
                  });
                } else if (userType === 2) {
                  await setDoc(teamRef, {
                    name: null,
                    surname: null,
                    email: res.user.email,
                    patients: [],
                    photoURL: null,
                    workplace: workPlace,
                    id: res.user.uid,
                  });
                }

                const getData = await getDoc(
                  userType === 0
                    ? docRef
                    : userType === 1
                    ? patientRef
                    : teamRef
                );
                setFirebaseUserRef(
                  userType === 0
                    ? "doctors"
                    : userType === 1
                    ? "patients"
                    : "teams"
                );
                await setData({ ...getData.data(), id: getData.id });
              }
            );
          } catch (error) {
            if (error !== undefined) {
              showMessage({
                message: error.message,
                type: "danger",
              });
            }
          }
        },
        completeProfile: async (props) => {
          const {
            name,
            surname,
            userType,
            date,
            vaccination,
            photoURL,
            setUploading,
          } = props;
          setUploading(true);
          const firestore = await getFirestore();
          const docRef = await doc(
            firestore,
            `doctors`,
            `${auth.currentUser.uid}`
          );
          const patientRef = await doc(
            firestore,
            "patients",
            `${auth.currentUser.uid}`
          );
          const teamRef = await doc(
            firestore,
            "teams",
            `${auth.currentUser.uid}`
          );

          if (userType === 0) {
            await updateDoc(docRef, {
              name: name,
              surname: surname,
              photoURL: photoURL,
              id: auth.currentUser.uid,
            });
          } else if (userType === 1) {
            const docsRef = await collection(firestore, "doctors");
            const docs = await getDocs(docsRef);
            const teamsRef = await collection(firestore, "teams");
            const teams = await getDocs(teamsRef);
            docs.docs.some(async (docs) => {
              if (
                docs.data()?.patients?.length <= 2 &&
                !docs.data()?.patients?.includes(auth.currentUser.uid)
              ) {
                const docReff = await doc(firestore, `doctors/${docs.id}`);
                await updateDoc(docReff, {
                  patients: arrayUnion(auth.currentUser.uid),
                });
                await updateDoc(patientRef, {
                  name: name,
                  surname: surname,
                  photoURL: photoURL,
                  id: auth.currentUser.uid,
                  doctorID: docs.id,
                  birthday: date,
                  vaccination: vaccination,
                  testDate: null,
                  testResult: null,
                  resultDate: null,
                });

                return true;
              } else {
                return showMessage({
                  message: "Şuan sadece maksimum hasta sayısına ulaşıldı",
                  description: "Lütfen daha sonra tekrar deneyiniz",
                  type: "danger",
                });
              }
            });
            teams.docs.some(async (docs) => {
              if (
                docs.data().patients.length <= 10 &&
                !docs.data().patients.includes(auth.currentUser.uid)
              ) {
                const docReff = await doc(firestore, `teams/${docs.id}`);
                await updateDoc(docReff, {
                  patients: arrayUnion(auth.currentUser.uid),
                });
                await updateDoc(patientRef, {
                  name: name,
                  surname: surname,
                  photoURL: photoURL,
                  id: auth.currentUser.uid,
                  personalID: docs.id,
                  birthday: date,
                  vaccination: vaccination,
                  testDate: null,
                  testResult: null,
                  resultDate: null,
                });
                return true;
              } else {
                return showMessage({
                  message: "Şuan sadece maksimum hasta sayısına ulaşıldı",
                  description: "Lütfen daha sonra tekrar deneyiniz",
                  type: "danger",
                });
              }
            });
          } else if (userType === 2) {
            await updateDoc(teamRef, {
              name: name,
              surname: surname,

              photoURL: photoURL,
              id: auth.currentUser.uid,
            });
          }
          const getData = await getDoc(
            userType === 0 ? docRef : userType === 1 ? patientRef : teamRef
          );
          await setFirebaseUserRef(
            userType === 0 ? "doctors" : userType === 1 ? "patients" : "teams"
          );

          await setData({ ...getData.data(), id: getData.id });
          setUploading(false);
        },

        signOut: async () => {
          try {
            const auth = getAuth();
            const user = await auth.signOut();
            setUser(null);
            setData(null);
            return user;
          } catch (error) {
            console.log(error);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
