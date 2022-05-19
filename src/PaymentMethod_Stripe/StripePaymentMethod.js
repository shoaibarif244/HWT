// import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
// import React, { Component } from 'react'
// import Stripe from 'tipsi-stripe'
// import Button from './src/components/Button'


// Stripe.setOptions({
//     publishableKey: 'pk_test_51KzN0iAlB9DvmAyvE57BbjTbIu2CinjQF81exOA9LEv9CQh0P4ixOEXUCR2fKHcWkl4GFRlUuRoF2NqpLHkAsFDL00lW9k6uJn'
// })

// export default class StripePaymentMethod extends Component {
//     static title = 'Card Form'

//     state = {
//         loading: false,
//         paymentMethod: null,
//     }

//     handleCardPayPress = async () => {
//         try {
//             this.setState({ loading: true, paymentMethod: null })

//             const paymentMethod = await Stripe.paymentRequestWithCardForm(demoCardFormParameters)

//             this.setState({ loading: false, paymentMethod })

//         } catch (error) {
//             this.setState({ loading: false })
//         }
//     }

//     render() {
//         const { loading, paymentMethod } = this.state

//         return (
//             <View style={styles.container}>
//                 <Text style={styles.header}>Card Form Example</Text>
//                 <Text style={styles.instruction}>Click button to show Card Form dialog.</Text>
//                 <Button
//                     text="Enter you card and pay"
//                     loading={loading}
//                     onPress={this.handleCardPayPress}
//                 // {...testID('cardFormButton')}
//                 />
//                 <View style={styles.paymentMethod}
//                 //   {...testID('cardFormPaymentMethod')}
//                 >
//                     {paymentMethod && (
//                         <Text style={styles.instruction}>
//                             Payment Method: {JSON.stringify(paymentMethod)}
//                         </Text>
//                     )}
//                 </View>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     header: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     instruction: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
//     paymentMethod: {
//         height: 20,
//     },
// })
import { View, Text } from 'react-native'
import React from 'react'

export default function StripePaymentMethod() {
  return (
    <View>
      <Text>StripePaymentMethod</Text>
    </View>
  )
}