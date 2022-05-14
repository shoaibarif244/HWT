import { View, Text } from 'react-native'
import React from 'react'
import QR_Code_Generator from './src/QR_Code/QR_Code_Generator'
import QR_Code_Scanner from './src/QR_Code/QR_Code_Scanner'
import API_Calling from './src/API_Calling/API_Calling'
import Stripe from './src/PaymentMethod_Stripe/Stripe'

export default function App() {
  return (
    // <QR_Code_Generator />
    // <QR_Code_Scanner />
    // <API_Calling />
    <Stripe />
  )
}