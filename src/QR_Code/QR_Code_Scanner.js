import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';

const QR_Code_Scanner = () => {
    const [qr, setQr] = useState('')
    const onRead = (qr) => {
        setQr(qr.data)
    }
    return (
        <SafeAreaView style={styles.container}>
            <QRCodeScanner
                onRead={onRead}
                reactivate
                showMarker
                reactivateTimeout={3000}
            />
            {qr != '' &&
                <QRCode
                    value={qr}
                />
            }
            <Text>{qr}</Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }
})

export default QR_Code_Scanner