import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation";
import { ThemeProvider } from "styled-components";
import themes from "./themes";
import { Appearance, useColorScheme } from "react-native-appearance";

export default function App() {
  // chama a função que verifica o tema atual do smartphone
  Appearance.getColorScheme();

  // retorna dark, light ou null
  const deviceTheme = useColorScheme();

  // verifica qual tema esta ativo, se nenhum, seta o tema dark
  const theme = themes[deviceTheme] || theme.dark;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}
