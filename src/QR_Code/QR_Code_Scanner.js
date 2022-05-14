import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
import QRCode from 'react-native-qrcode-svg';

const QR_Code_Scanner = () => {
    const [qr, setQr] = useState('')
    const onRead = (qr) => {
        setQr(qr.data)
    }
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
            <QRCodeScanner
                onRead={onRead}
                reactivate
                showMarker
                reactivateTimeout={3000}
            // flashMode={RNCamera.Constants.FlashMode.auto}
            // topContent={
            //     <Text style={styles.centerText}>
            //         Go to 
            //         <Text style={styles.textBold}>
            //             wikipedia.org/wiki/QR_code
            //         </Text>
            //          on your computer and scan the QR code.
            //     </Text>
            // }
            // bottomContent={
            //     <TouchableOpacity style={styles.buttonTouchable}>
            //         <Text style={styles.buttonText}>OK. Got it!</Text>
            //     </TouchableOpacity>
            // }
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
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
    },
    textBold: {
        fontWeight: '500',
        color: '#000'
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 16
    }
})

export default QR_Code_Scanner