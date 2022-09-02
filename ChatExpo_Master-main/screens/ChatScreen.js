import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Linking, Platform, Text, TouchableOpacity, View } from "react-native";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { GiftedChat } from "react-native-gifted-chat";
import messageScreenTopBar from "../components/messageScreenTopBar";
import { useNavigation } from "@react-navigation/native";
import { giftedChat, inlineButton } from "../components";
import { AuthContext } from "../context/AuthContext";
import MapView from "react-native-maps";
import moment from "moment/min/moment-with-locales";

import * as Location from "expo-location";
import Modal from "react-native-modal";
const ChatScreen = ({ navigation: { goBack }, route }) => {
  const { firebaseUserRef } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);
  const [chatInfo, setChatInfo] = useState({});
  const auth = getAuth();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chatID, setChatID] = useState("");
  const navigation = useNavigation();
  const db = getFirestore();
  const sendLocationModal = () => {
    return (
      <View>
        <Modal
          style={{
            flex: 1,
            margin: 0,
            alignItems: "center",
            justifyContent: "space-around",
          }}
          backdropOpacity={0.85}
          onBackdropPress={() => {
            setIsVisible(false);
          }}
          isVisible={isVisible}
        >
          <View
            style={{
              height: SIZES.height * 0.25,
              width: SIZES.width * 0.8,
              justifyContent: "space-around",
              alignItems: "center",
              paddingHorizontal: 12,

              backgroundColor: COLORS.white,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                ...FONTS.BODY2,
                color: COLORS.secondary,
                textAlign: "center",
              }}
            >
              Konumunuzu göndermek istediğinize emin misiniz?
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: SIZES.width * 0.8,
                justifyContent: "space-around",
              }}
            >
              {inlineButton({
                text: "İptal",
                onPress: () => {
                  setIsVisible(false);
                },
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.red,
              })}

              {inlineButton({
                text: "Gönder",
                onPress: (messages) => onSend(messages),
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.green,
              })}
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  const [location2, setLocation2] = useState({});
  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Lütfen konum izni veriniz.");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation2(location.coords);
  };

  const chatId = auth.currentUser.uid + route.params.userID;
  const chat = {
    id: chatId,
    [auth.currentUser.uid]: true,
    [route.params.userID]: true,
    userInfos: [
      {
        id: auth?.currentUser?.uid,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      },
      {
        id: route.params.userID,
        name: route.params.name,
        avatar: route.params.photoURL,
      },
    ],
    lastMessageSender: auth.currentUser.uid,
    lastMessage: null,
    lastMessageTime: null,
  };
  const LocationView = ({ location }) => {
    const openMaps = () => {
      const linkGoogle = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
      return Linking.openURL(linkGoogle);
    };
    return (
      <TouchableOpacity
        onPress={openMaps}
        style={{ backgroundColor: "gray", width: 200, height: 200 }}
      >
        <MapView
          onPress={openMaps}
          style={{ height: 200, width: 200 }}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          annotations={[
            {
              latitude: location.latitude,
              longitude: location.longitude,
            },
          ]}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <MapView.Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        </MapView>
      </TouchableOpacity>
    );
  };
  const createChat = async () => {
    await setDoc(doc(db, `chats`, chatId), {
      ...chat,
    }).then(() => {
      setChatID(chatId);
    });
  };

  const getChats = async () => {
    const chatsRef = await collection(db, `chats`);
    const q = await query(
      chatsRef,
      where(`${auth.currentUser.uid}`, "==", true),
      where(`${route.params.userID}`, "==", true)
    );
    const chatIDs = await getDocs(q);
    chatIDs.forEach((chat) => {
      if (chat.id !== null) {
        setChatID(chat.id);
        setChatInfo(chat.data());
      } else {
        createChat();
      }
    });
  };

  useEffect(() => {
    if (route.params.userID) {
      moment.locale("tr");
      getChats().then(() => {
        setLoading(false);
      });
      getLocationAsync();
    }
  }, []);

  useLayoutEffect(() => {
    if (chatID !== "") {
      const chatRef = collection(db, `chats/${chatID}/messages`);
      const documentDataQuery = query(chatRef, orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(
        documentDataQuery,
        { includeMetadataChanges: true },
        (snapshot) => {
          console.log(snapshot.size, "w");
          setMessages(
            snapshot.docs.map((doc) => {
              return {
                ...messages,
                location: doc.data().location,
                _id: doc.id,
                text: doc?.data()?.text !== undefined ? doc.data().text : "",
                createdAt: doc.data().createdAt.toDate(),
                user: {
                  _id: doc.data().user._id,
                  avatar: doc.data().user.avatar,
                },
              };
            })
          );
        }
      );

      return () => {
        unsubscribe();
      };
    }
  }, [chatID]);

  const onSend = useCallback(
    (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );

      if (chatID) {
        const {
          _id,
          createdAt,
          text,
          user,
          location: { ...location2 },
        } = messages[0];
        const chatRef = doc(collection(db, "chats", `${chatID}/messages`));
        const messageRef = doc(db, `chats/${chatID}`);

        setDoc(
          chatRef,
          {
            _id,
            createdAt,
            text,
            user,
            location: location2 ? location2 : null,
          },
          { merge: true }
        )
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      } else {
        createChat().then(() => {
          const {
            _id,
            createdAt,
            text,

            user,
            location: location2,
          } = messages[0];
          const chatRef = doc(collection(db, "chats", `${chatId}/messages`));

          setDoc(
            chatRef,
            {
              _id,
              createdAt,
              text,
              user,
              location: location2 ? location2 : null,
            },
            { merge: true }
          )
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });
      }
    },

    [chatID]
  );
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {messageScreenTopBar({
        name: route.params.name,
        photoURL: route.params.photoURL,
        onPress: () => navigation.goBack(),
      })}

      <View
        style={{
          flex: 1,
        }}
      >
        {giftedChat({
          getLocationAsync,
          messages,
          onSend,
          auth,
          LocationView,
          location: location2,
        })}
      </View>
      {sendLocationModal()}
    </View>
  );
};

export default ChatScreen;
