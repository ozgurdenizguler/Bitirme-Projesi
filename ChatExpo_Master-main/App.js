import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { LogBox } from "react-native";

import Providers from "./context";
import { Image, View } from "react-native";

export default function App() {
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });
  if (fontsLoaded) {
    return (
      <SafeAreaProvider>
        <Providers />
      </SafeAreaProvider>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
          }}
          source={require("./assets/splash.png")}
        />
      </View>
    );
  }
}
