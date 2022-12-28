import {
  View,
  Text,
  ToastAndroid,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import RNTextDetector from "rn-text-detector";
const OCR = () => {
  const [state, setState] = useState({
    loading: false,
    image: null,
    textRecognition: null,
    toast: {
      message: "",
      isVisible: false,
    },
  });
  const [text, setText] = useState([]);
  function onPress(type) {
    setState({ ...state, loading: true });
    type === "capture"
      ? launchCamera({ mediaType: "image" }, onImageSelect)
      : launchImageLibrary({ mediaType: "image" }, onImageSelect);
  }
  async function onImageSelect(media) {
    if (!media) {
      setState({ ...state, loading: false });
      return;
    }
    if (media && media.assets) {
      const file = media.assets[0].uri;

      const textRecognition = await RNTextDetector.detectFromUri(file);
      setText(textRecognition);
      setState({
        ...state,
        image: file,
      });
    }
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 100,
      }}
    >
      <Text>RN OCR SAMPLE</Text>

      {/* <TouchableOpacity onPress={() => onPress("capture")}>
        <Text>Take Photo</Text>
      </TouchableOpacity> */}

      <TouchableOpacity onPress={() => onPress("library")}>
        <Text>Pick a Photo</Text>
      </TouchableOpacity>
      <Image
        style={{ height: 400, width: 200 }}
        resizeMode="contain"
        source={{ uri: state.image }}
      />
      <View style={{}}>
        {text.map((item, i) => (
          <Text key={i}>{item.text}</Text>
        ))}
      </View>
    </View>
  );
};

export default OCR;
