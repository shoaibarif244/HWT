
import { View, Text, SafeAreaView, StyleSheet, FlatList, RefreshControl, Image, Dimensions } from 'react-native'
import React, { useState, useEffect, Component } from 'react'

const SCREEN_WIDTH = Dimensions.get('window').width;
export default function API_Calling() {

  const [isFetching, setIsFetching] = useState(false)
  const [users, setUsers] = useState(null);

  const getUsers = async () => {
    const RandomAPI = await fetch('https://randomuser.me/api/?results=20')//It will get 20 random users DATA
    const APIValue = await RandomAPI.json();
    const APIResults = APIValue.results;
    setUsers(APIResults);
  }

  const onRefresh = () => {
    setIsFetching(true)
    getUsers().then(() => {
      setIsFetching(false);
    });
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <FlatList
        data={users}
        refreshControl={
          <RefreshControl
            colors={["#6747cd", "#C3B747"]}
            refreshing={isFetching}
            onRefresh={() => onRefresh()}
          />
        }
        renderItem={({ item }) => {
          return <RenderCard item={item} />
        }}
        keyExtractor={(item) => item.uuid}
      />

    </SafeAreaView>
  )
}


// ////////////////////////////////////////////////////////
// Reuseable Component it also can be in another file    //
// ////////////////////////////////////////////////////////

const RenderCard = ({ item }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={styles.cardContainer}>

        {/* Left Side of the Card */}
        <View style={styles.leftPortion}>
          <View style={styles.v1}>
            <Text style={styles.t1}>No. 50114</Text>
            <Text style={styles.t1}>Pros On Call</Text>
          </View>
          <View style={{ marginHorizontal: 5 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ color: '#fff' }}>
                  (34GHU5){'\n'}
                  Samantha (830223040 #253)</Text>
              </View>

            </View>
            <Text style={{ color: '#fff' }}>
              317 Lantano Ave. San Antonio Tx 78213{'\n'}
              Car Key Lost Toyota tundra 2006 -Regular{'\n'}
              Np. No. 23501</Text>
          </View>
        </View>

        {/* Right Side of the Card */}
        <View style={styles.rightPortion}>
          <View style={styles.statusView}>
            <Text style={styles.txtStatus}>Status</Text>
            <View style={styles.statusClr} />
          </View>
          <Image
            source={{ uri: item.picture.large }}
            style={styles.profile}
            resizeMode='contain'
          />
          <Text style={styles.t2}>{item.name.first} {item.name.last}</Text>
          <Text style={styles.t2}>6:10pm | 6 Dec 2021</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: { backgroundColor: '#004675', width: SCREEN_WIDTH - 20, height: 120, flexDirection: 'row', marginTop: 10, borderRadius: 10, paddingVertical: 5 },
  leftPortion: { width: '65%', borderRightWidth: 1, borderRightColor: '#fff' },
  rightPortion: { width: '35%', alignItems: 'center', justifyContent: 'center' },
  v1: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 },
  t1: { color: '#C3B747', textDecorationLine: 'underline' },
  statusView: { flexDirection: 'row', justifyContent: 'space-between', width: '70%', alignItems: 'center' },
  txtStatus: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  statusClr: { backgroundColor: 'red', height: 15, width: 15, borderRadius: 8, },
  profile: { height: '50%', width: '60%', borderRadius: 10, marginLeft: 4 },
  t2: { color: '#fff', fontWeight: 'bold' }
});