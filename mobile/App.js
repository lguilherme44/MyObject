import React from "react";
import App from "./src";
import { AppearanceProvider } from "react-native-appearance";

export default function Main() {
  return (
    <AppearanceProvider>
      <App />
    </AppearanceProvider>
  );
}
