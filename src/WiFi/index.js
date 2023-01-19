import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  PermissionsAndroid,
  Button,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { Header, Colors } from "react-native/Libraries/NewAppScreen";
import WifiManager from "react-native-wifi-reborn";

const WiFi = () => {
  const [connected, setConnected] = useState({ connected: false, ssid: "S4N" });
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("React.One");
  const [wifiList, setWifiList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNetwork, setselectedNetwork] = useState(null);
  const initWifi = async () => {
    try {
      const ssid = await WifiManager.getCurrentWifiSSID();
      setSsid(ssid);
      console.log("Your current connected wifi SSID is " + ssid);
    } catch (error) {
      setSsid("Cannot get current SSID!" + error.message);
      console.log("Cannot get current SSID!", { error });
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "React Native Wifi Reborn App Permission",
          message:
            "Location permission is required to connect with or scan for Wifi networks. ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        initWifi();
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const connectWithWifi = async () => {
    try {
      const data = await WifiManager.connectToProtectedSSID(
        selectedNetwork?.SSID,
        password,
        false
      );
      console.log("Connected successfully!", { data });
      setConnected({ connected: true, ssid: selectedNetwork?.SSID });
      //   console.log(await WifiManager.getCurrentSignalStrength());
      setModalVisible(!modalVisible);
    } catch (error) {
      setConnected({ connected: false, error: error.message });
      console.log("Connection failed!", { error });
      setModalVisible(!modalVisible);
    }
  };

  const scanExample = async () => {
    try {
      const data = await WifiManager.reScanAndLoadWifiList();
      console.log(
        "WifiManager.reScanAndLoadWifiList()=> ",
        JSON.stringify(data, 2, 4)
      );
      setWifiList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestLocationPermission();
    scanExample();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {modalVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Selected Network: {selectedNetwork?.SSID}
              </Text>
              <TextInput
                placeholder="Password"
                style={{
                  width: 150,
                  borderRadius: 6,
                  height: 44,
                  borderWidth: 1,
                }}
                // value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  connectWithWifi();
                }}
              >
                <Text style={styles.textStyle}>Connect</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      {/* <Header /> */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Current Network '{ssid}'</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          Connection Details : {"\n" + JSON.stringify(connected)}
        </Text>
      </View>
      {/* <Button onPress={connectWithWifi} title="Connect" /> */}
      {/* <View style={styles.body}> */}
      <FlatList
        data={wifiList}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                margin: 6,
                padding: 6,
                borderRadius: 6,
                backgroundColor: index % 2 == 0 ? "#C2C2C2" : "#EBEBEB",
              }}
              onPress={() => {
                setModalVisible(true);
                setselectedNetwork(item);
                // alert(JSON.stringify(item, 2, 4))
              }}
            >
              <Text>SSID: {item?.SSID}</Text>
              <Text>BSSID: {item?.BSSID}</Text>
              <Text>timestamp: {item?.timestamp}</Text>
              <Text>frequency: {item?.frequency} MHz</Text>
              {/* <Text>capabilities: {item?.capabilities}</Text> */}
            </TouchableOpacity>
          );
        }}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000070",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default WiFi;
