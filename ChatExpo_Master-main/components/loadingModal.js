import Modal from "react-native-modal";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { COLORS } from "../constants/theme";

const loadingModal = (props) => {
  return (
    <Modal isVisible={props.loading} backdropOpacity={0.5}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator animating size="large" color={COLORS.secondary} />
      </View>
    </Modal>
  );
};

export default loadingModal;
