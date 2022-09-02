import * as ImagePicker from "expo-image-picker";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";

const pickImage = async (props) => {
  const storage = getStorage(); //the storage itself
  const db = getFirestore(); //the firestore itself
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0,
  });

  if (!result.cancelled) {
    const storageRef = ref(storage, `${props.userUID}.jpg`); //the reference to the file
    const img = await fetch(result.uri);
    const bytes = await img.blob();
    function uploadImage() {
      const uploadTask = uploadBytesResumable(storageRef, bytes);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          props.setUploading(true);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          props.setUploading(false);
          console.log(error, "error");
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              await props.setImage(downloadURL);
              await updateProfile(props.userInfo, {
                photoURL: downloadURL,
              });
              const docRef = doc(
                db,
                `${props.firebaseUserRef}`,
                `${props.userUID}`
              );
              await updateDoc(docRef, {
                photoURL: downloadURL,
              })
                .then(() => {
                  props.setUploading(false);
                  showMessage({
                    message: "Profile picture updated",
                    type: "success",
                  });
                  console.log("Profile updated");
                })
                .catch((error) => {
                  showMessage({
                    message: "Error updating profile picture",
                    type: "danger",
                  });
                  console.log(error);
                });
            }
          );
        }
      );
    }

    return uploadImage();
  }
};

export default pickImage;
