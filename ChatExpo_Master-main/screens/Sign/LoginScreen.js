import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import { backButton, inlineButton, textInput } from "../../components";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = ({ navigation: { goBack } }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const { signIn } = useContext(AuthContext);
  let navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
    },

    logo: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    input: {
      width: SIZES.width * 0.8,
      height: 50,

      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
      padding: 10,
    },
    button: {
      width: "80%",
      height: 50,
      borderRadius: 5,
      backgroundColor: "#00a680",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 20,
    },
    signupText: {
      color: "#00a680",
      fontSize: 20,
      marginTop: 10,
    },
    signupLink: {
      color: "#00a680",
      fontSize: 20,
      marginTop: 10,
      textDecorationLine: "underline",
    },
  });
  return (
    <KeyboardAvoidingView
      contentContainerStyle={{
        alignItems: "center",
      }}
      style={styles.container}
      behavior="padding"
      enabled
    >
      <View
        style={{
          width: "100%",
          height: SIZES.height * 0.2,

          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: SIZES.height * 0.02,
            left: SIZES.width * 0.05,
          }}
        >
          {backButton({
            onPress: () => goBack(),
          })}
        </View>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ ...FONTS.H1, color: COLORS.secondary }}>Giriş Yap</Text>
      </View>
      <View
        style={{
          height: SIZES.height * 0.7,
          zIndex: 999,
          width: "100%",
          borderTopLeftRadius: 45,
          backgroundColor: "white",
          justifyContent: "space-around",
          alignItems: "center",
          borderTopRightRadius: 45,
        }}
      >
        <View
          style={{
            height: SIZES.height * 0.3,
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {textInput({
            label: "Email",
            icon: "envelope",
            value: email,
            onChangeText: (text) => setEmail(text),
          })}

          {textInput({
            icon: "lock",
            label: "Şifre",
            value: password,
            onChangeText: (text) => setPassword(text),
            secureTextEntry: secureTextEntry,
            rightIcon: true,
            onPress: () => setSecureTextEntry(!secureTextEntry),
          })}
        </View>

        {inlineButton({
          text: "Giriş Yap",
          onPress: () =>
            signIn({
              email: email,
              password: password,
            }),
        })}
        <Text
          style={{
            ...FONTS.BODY2,
            color: "rgba(0,0,0,0.5)",
          }}
        >
          Hesabın yok mu?{" "}
          <Text
            style={{
              ...FONTS.BODY2,
              color: "rgba(0,0,0,0.5)",
              textDecorationLine: "underline",
            }}
            onPress={() => {
              navigation.navigate("SignupScreen");
            }}
          >
            Kayıt Ol
          </Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
