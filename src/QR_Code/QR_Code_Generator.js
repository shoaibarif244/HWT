import { StyleSheet, View, Button, TextInput, Image } from 'react-native'
import RNQRGenerator from 'rn-qr-generator'
import React, { useState } from 'react'

const QR_Code_Generator = () => {
    const [qrCode, setQrCode] = useState(null);
    const [codeText, setCodeText] = useState('NA');
    const generateQR_Code = () => {
        RNQRGenerator.generate({
            value: codeText,
            height: 400,
            width: 400,
            base64: true,
        }).then((response) => {
            // console.log(' response', response)
            setQrCode(response.uri)
        })
    }
    return (

        <View style={styles.container} >
            <TextInput
                style={{ height: 40, width: 300, borderWidth: 1, borderRadius: 10, marginVertical: 20 }}
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
    qrcode: { marginTop: 20, width: 400, height: 400 },
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
})



export default QR_Code_Generator