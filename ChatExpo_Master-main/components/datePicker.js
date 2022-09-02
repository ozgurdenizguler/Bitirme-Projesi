import RNDateTimePicker from "@react-native-community/datetimepicker";
import { SIZES } from "../constants/theme";
import React from "react";

const datePicker = (props) => {
  const { date, setDate } = props;
  return (
    <RNDateTimePicker
      style={{
        height: SIZES.height * 0.05,
        width: SIZES.width * 0.35,
      }}
      onChange={(event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
      }}
      display={"calendar"}
      mode="date"
      value={date}
    />
  );
};

export default datePicker;
