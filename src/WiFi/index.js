// import { PermissionsAndroid } from "react-native";
// import { View, Text } from "react-native";
// import React, { useEffect } from "react";
// import WifiManager from "react-native-wifi-reborn";

// const Wifi = () => {
//   useEffect(() => {
//     askPermissions();
//   }, []);
//   const askPermissions = async () => {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: "Location permission is required for WiFi connections",
//         message:
//           "This app needs location permission as this is required  " +
//           "to scan for wifi networks.",
//         buttonNegative: "DENY",
//         buttonPositive: "ALLOW",
//       }
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       // You can now use react-native-wifi-reborn
//     } else {
//       // Permission denied
//     }
//   };
//   WifiManager.connectToProtectedSSID(ssid, password, isWep).then(
//     () => {
//       console.log("Connected successfully!");
//     },
//     () => {
//       console.log("Connection failed!");
//     }
//   );

//   WifiManager.getCurrentWifiSSID().then(
//     (ssid) => {
//       console.log("Your current connected wifi SSID is " + ssid);
//     },
//     () => {
//       console.log("Cannot get current SSID!");
//     }
//   );
//   return (
//     <View>
//       <Text>Wifi</Text>
//     </View>
//   );
// };

// export default Wifi;
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from "react";
import {
  PermissionsAndroid,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Text,
} from "react-native";

import { Header, Colors } from "react-native/Libraries/NewAppScreen";
import WifiManager from "react-native-wifi-reborn";

const WiFi = () => {
  const [connected, setConnected] = useState({ connected: false, ssid: "S4N" });
  const [ssid, setSsid] = useState("");
  const password = "React.One";
  const [wifiList, setWifiList] = useState([]);
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
        ssid,
        password,
        false
      );
      console.log("Connected successfully!", { data });
      setConnected({ connected: true, ssid });
      //   console.log(await WifiManager.getCurrentSignalStrength());
    } catch (error) {
      setConnected({ connected: false, error: error.message });
      console.log("Connection failed!", { error });
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
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <Header />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>ssid</Text>
          <Text style={styles.sectionDescription}>{JSON.stringify(ssid)}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            Connected : {"\n" + JSON.stringify(connected)}
          </Text>
        </View>
        <Button onPress={connectWithWifi} title="Connect" />
        <View style={styles.body}>
          <FlatList
            data={wifiList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{
                    margin: 6,
                    padding: 6,
                    borderRadius: 6,
                    backgroundColor: index % 2 == 0 ? "#C2C2C2" : "#EBEBEB",
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
        </View>
      </ScrollView>
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
});

export default WiFi;
