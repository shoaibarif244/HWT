import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const Stripe = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Stripe</Text>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }
})

export default Stripe