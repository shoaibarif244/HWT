import { StyleSheet, View, Button, TextInput, Image, Dimensions } from 'react-native'
import RNQRGenerator from 'rn-qr-generator'
import React, { useState } from 'react'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const QR_Code_Generator = () => {
    const [qrCode, setQrCode] = useState(null);
    const [codeText, setCodeText] = useState('NA');
    const generateQR_Code = () => {
        RNQRGenerator.generate({
            value: codeText,
            height: SCREEN_HEIGHT * 0.6,
            width: SCREEN_WIDTH * 0.9,
            base64: true,
        }).then((response) => {
            // console.log(' response', response)
            setQrCode(response.uri)
        })
    }
    return (

        <View style={styles.container} >
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => {
                    setCodeText(text)
                }}
            />
            <Button title="Generate QR Code"
                onPress={() => { generateQR_Code() }}
            />

            {qrCode != null &&
                <Image source={{ uri: qrCode }} style={styles.qrcode} />
            }
        </View >
    )
}

const styles = StyleSheet.create({
    qrcode: { marginTop: 20, width: '90%', height: '60%' },
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    textInput: { height: 44, width: '90%', borderWidth: 1, borderRadius: 8, marginVertical: 20 }
})



export default QR_Code_Generator