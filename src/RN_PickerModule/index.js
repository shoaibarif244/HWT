import React, { useRef, useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import ReactNativePickerModule from "react-native-picker-module";
const RN_PickerModule = () => {
  const pickerRef = useRef(null);
  const [value, setValue] = useState("");
  const dataset_1 = ["Java", "Kotlin", "C++", "C#", "PHP"];
  return (
    <SafeAreaView>
      <Button
        title="Select a language"
        onPress={() => pickerRef.current?.show()}
      />
      <Text>Selected Item Text: {value}</Text>

      <ReactNativePickerModule
        ref={pickerRef}
        value={value}
        title={"Select a language"}
        items={dataset_1}
        titleStyle={{ color: "white" }}
        itemStyle={{ color: "white" }}
        selectedColor="#FC0021"
        confirmButtonEnabledTextStyle={{ color: "white" }}
        confirmButtonDisabledTextStyle={{ color: "grey" }}
        cancelButtonTextStyle={{ color: "white" }}
        confirmButtonStyle={{
          backgroundColor: "rgba(0,0,0,1)",
        }}
        cancelButtonStyle={{
          backgroundColor: "rgba(0,0,0,1)",
        }}
        contentContainerStyle={{
          backgroundColor: "rgba(0,0,0,1)",
        }}
        onCancel={() => {
          console.log("Cancelled");
        }}
        onValueChange={(value) => {
          console.log("value: ", value);
          setValue(value);
        }}
      />
    </SafeAreaView>
  );
};

export default RN_PickerModule;
