import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import CountDown from "react-native-countdown-component";
import {
  outlineButton,
  mainScreenTopBar,
  accordion,
  drListForPatientComponent,
} from "../../components";
import moment from "moment";
import SECTIONS from "../../data/sssData";

const PatientMain = ({ navigation: { goBack } }) => {
  const { signOut, data } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [totalDuration, setTotalDuration] = useState(0);
  const [doctors, setDoctors] = useState(null);
  const [activeSections, setActiveSections] = useState([]);
  const [team, setTeam] = useState(null);
  console.log(data);
  useEffect(() => {
    if (data?.testResult && data?.testDate && data?.resultDate) {
      var date = moment().utcOffset("+03:00").format("YYYY-MM-DD hh:mm:ss");

      var expirydate = moment(new Date(data?.testDate.toDate()))
        .add(15, "days")
        .format("YYYY-MM-DD hh:mm:ss"); //You can set your own date-time

      var diffr = moment.duration(moment(expirydate).diff(moment(date)));

      var hours = parseInt(diffr.asHours());
      var minutes = parseInt(diffr.minutes());
      var seconds = parseInt(diffr.seconds());
      var d = hours * 60 * 60 + minutes * 60 + seconds;

      setTotalDuration(d);
    }
  }, []);
  const firestore = getFirestore();
  const getUserDoctor = async () => {
    const ref = await collection(firestore, "doctors");
    const q = await query(ref, where("patients", "array-contains", data?.id));
    const datas = await getDocs(q);
    datas.forEach((doc) => {
      setDoctors([doc.data()]);
    });
  };
  const getUserTeam = async () => {
    const ref = await collection(firestore, "teams");
    const q = await query(ref, where("patients", "array-contains", data?.id));
    const datas = await getDocs(q);
    datas.forEach((doc) => {
      setTeam([doc.data()]);
    });
  };

  useEffect(() => {
    Promise.all([getUserDoctor(), getUserTeam()]).then(() => {
      setLoading(false);
    });
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },
    resultContainer: {
      flex: 0.15,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: SIZES.base,

      borderWidth: 2,
      borderColor: COLORS.secondary,
      marginBottom: SIZES.base * 1.5,
      zIndex: 999,
      backgroundColor: COLORS.white,
      borderRadius: SIZES.base,
    },
    resultTextContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      paddingVertical: SIZES.base,
    },
  });
  const navigation = useNavigation();
  const { container, resultContainer, resultTextContainer } = styles;
  console.log(totalDuration);
  return (
    <View style={container}>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={COLORS.secondary} />
        </View>
      ) : (
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            alignItems: "center",

            backgroundColor: "#fff",
          }}
        >
          {mainScreenTopBar({
            onPress: () => signOut(),
            title: `${data?.name}`,
            image: data?.photoURL?.length > 0 ? data?.photoURL : "",
          })}

          <Text
            style={{
              ...FONTS.BODY2,
              paddingVertical: SIZES.base,
              color: COLORS.secondary,
            }}
          >
            {doctors[0]?.workplace} Nolu Aile Sağlığı Merkezi
          </Text>

          <View
            style={{
              alignItems: "center",
              width: SIZES.width * 0.95,
              justifyContent: "space-around",
            }}
          >
            {drListForPatientComponent({
              title: "Filyasyon",
              text: `${team[0]?.name}`,
              onPress: () =>
                navigation.navigate("ChatScreen", {
                  userID: team[0].id,
                  name: team[0]?.name,
                  photoURL: team[0]?.photoURL,
                }),
            })}

            {drListForPatientComponent({
              title: "Doktorunuz",
              text: `${doctors[0]?.name}`,
              onPress: () =>
                navigation.navigate("ChatScreen", {
                  userID: doctors[0].id,
                  name: doctors[0]?.name,
                  photoURL: doctors[0]?.photoURL,
                }),
            })}
          </View>
          <View style={resultContainer}>
            {data?.testDate ? (
              <View>
                <View style={resultTextContainer}>
                  <Text
                    style={{
                      ...FONTS.H4,
                    }}
                  >
                    Test Tarihi:{" "}
                  </Text>
                  <Text
                    style={{
                      ...FONTS.H4,
                    }}
                  >
                    {moment(new Date(data?.testDate?.toDate())).format(
                      "hh:mm YYYY/MM/DD"
                    )}
                  </Text>
                </View>
                {data?.testResult !== 2 && data?.testResult !== null ? (
                  <View>
                    <View style={resultTextContainer}>
                      <Text
                        style={{
                          ...FONTS.H4,
                        }}
                      >
                        Sonuç Tarihi:
                      </Text>
                      <Text
                        style={{
                          ...FONTS.H4,
                        }}
                      >
                        {" "}
                        {moment(new Date(data?.resultDate?.toDate())).format(
                          "hh:mm YYYY/MM/DD"
                        )}
                      </Text>
                    </View>
                    <View
                      style={[
                        {
                          ...resultTextContainer,
                          borderBottomWidth: 0,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          ...FONTS.H4,
                        }}
                      >
                        Test Sonucu:
                      </Text>
                      <Text
                        style={{
                          ...FONTS.H4,
                        }}
                      >
                        {data?.testResult === 1 ? "Pozitif" : "Negatif"}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </View>
            ) : (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    ...FONTS.BODY1,
                    color: COLORS.secondary,
                  }}
                >
                  Henüz test yapılmamış
                </Text>
              </View>
            )}
          </View>
          {data?.testResult !== null && data?.testResult !== 2 ? (
            <View
              style={{
                alignItems: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  ...FONTS.H3,
                  color: COLORS.secondary,
                  marginBottom: SIZES.base * 2,
                }}
              >
                Karantina Sayacı
              </Text>
              <CountDown
                until={totalDuration}
                //duration of countdown in seconds
                timetoShow={("H", "M", "S")}
                digitStyle={{
                  backgroundColor: COLORS.secondary,
                  width: SIZES.width * 0.15,
                  height: SIZES.width * 0.15,
                }}
                digitTxtStyle={{
                  color: COLORS.white,
                }}
                //formate to show
                onFinish={() => alert("finished")}
                //on Finish call
                onPress={() => alert("hello")}
                //on Press call
                size={20}
                timeLabels={{
                  d: "Gün",
                  h: "Saat",
                  m: "Dakika",
                  s: "Saniye",
                }}
                timeLabelStyle={{
                  ...FONTS.BODY3,
                  fontSize: SIZES.width * 0.0375,
                  color: COLORS.black,
                }}
              />
            </View>
          ) : null}

          <View
            style={{
              alignItems: "center",
              backfaceVisibility: "visible",
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                width: SIZES.width * 0.9,
                justifyContent: "space-between",
                paddingVertical: SIZES.base * 2,
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  ...FONTS.H4,
                }}
              >
                Sık Sorulan Sorular
              </Text>
              {outlineButton({
                text: "Tümünü Gör",
                onPress: () => navigation.navigate("FAQ"),
                width: SIZES.width * 0.35,
                height: SIZES.height * 0.05,
              })}
            </View>
            {accordion({
              setActiveSections,
              activeSections,
              SECTIONS: SECTIONS.slice(0, 3),
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default PatientMain;