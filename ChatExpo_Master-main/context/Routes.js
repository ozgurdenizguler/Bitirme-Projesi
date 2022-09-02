import React, { useContext, useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthContext";
import "react-native-gesture-handler";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {
  SignupScreen,
  WelcomeScreen,
  LoginScreen,
  PatientMain,
  DoctorMain,
  TeamMain,
  PatientDetailsScreen,
  CompleteSignupScreen,
  ChatScreen,
  FAQ,
  CheckUserScreen,
} from "../screens";
import { getValidateIDs } from "../functions/getValidateIDs";

const Stack = createStackNavigator();

const Routes = () => {
  const {
    user,
    validateIDs,
    setUser,
    setData,
    data,
    firebaseUserRef,
    setFirebaseUserRef,
    loading,
    setLoading,
    setUserType,
    setValidateIDs,
  } = useContext(AuthContext);

  const auth = getAuth();
  const db = getFirestore();
  useEffect(() => {
    getValidateIDs({
      firestore: db,
      setData: setValidateIDs,
    }).then((res) => {});
  }, []);
  console.log(validateIDs);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (auth.currentUser != null) {
        const unsubscribe = async () => {
          try {
            setLoading(true);
            const docRef = await doc(db, "doctors", `${auth.currentUser.uid}`);
            const patientRef = await doc(
              db,
              "patients",
              `${auth.currentUser.uid}`
            );
            const teamRef = await doc(db, "teams", `${auth.currentUser.uid}`);

            const docSnap = await getDoc(docRef);
            const patientSnap = await getDoc(patientRef);
            const teamSnap = await getDoc(teamRef);

            if (docSnap.data()) {
              setData({
                ...docSnap.data(),
                key: docSnap.id,
              });
              setUserType(0);

              setFirebaseUserRef("doctors");
            } else if (patientSnap.data()) {
              setData({
                ...patientSnap.data(),
                key: patientSnap.id,
              });
              setUserType(1);
              setFirebaseUserRef("patients");
            } else if (teamSnap.data()) {
              setData({
                ...teamSnap.data(),
                key: teamSnap.id,
              });
              setUserType(2);
              setFirebaseUserRef("teams");
            } else {
              setFirebaseUserRef(null);
              console.log("user does not exist");
            }
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
        return unsubscribe().then(() => {
          setUser(user);
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {loading ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="CheckUserScreen"
        >
          <Stack.Screen name={"CheckUserScreen"} component={CheckUserScreen} />
        </Stack.Navigator>
      ) : auth.currentUser === null ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="WelcomeScreen"
        >
          <Stack.Screen name={"WelcomeScreen"} component={WelcomeScreen} />
          <Stack.Screen name={"LoginScreen"} component={LoginScreen} />

          <Stack.Screen name={"SignupScreen"} component={SignupScreen} />
        </Stack.Navigator>
      ) : auth.currentUser !== null && data?.name === null ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="CompleteSignupScreen"
        >
          <Stack.Screen
            name={"CompleteSignupScreen"}
            component={CompleteSignupScreen}
          />
        </Stack.Navigator>
      ) : firebaseUserRef === "doctors" ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="DoctorMain" component={DoctorMain} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      ) : firebaseUserRef === "patients" ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="PatientMain" component={PatientMain} />
          <Stack.Screen name="FAQ" component={FAQ} />

          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="TeamMain" component={TeamMain} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />

          <Stack.Screen
            name="PatientDetailsScreen"
            component={PatientDetailsScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
export default Routes;
