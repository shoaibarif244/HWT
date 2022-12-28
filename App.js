import { View, Text } from "react-native";
import React from "react";
import QR_Code_Generator from "./src/QR_Code/QR_Code_Generator";
import QR_Code_Scanner from "./src/QR_Code/QR_Code_Scanner";
import API_Calling from "./src/API_Calling/API_Calling";
import Stripe from "./src/PaymentMethod_Stripe/StripePaymentMethod";
import EmojiPickerKeyboard from "./src/EmojiPickerKeyboard/EmojiPickerKeyboard";
import OCR from "./src/OCR/OCR";
import WiFi from "./src/WiFi";
export default function App() {
  return (
    // <OCR />
    // <QR_Code_Generator />
    // <QR_Code_Scanner />
    <WiFi />
    // <EmojiPickerKeyboard />
    // <API_Calling />
    // <Stripe />
  );
}
