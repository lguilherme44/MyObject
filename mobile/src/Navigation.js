import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "./screens/Home";
import OrdersScreen from "./screens/Order";

const Tab = createBottomTabNavigator();

const icons = {
  Home: {
    lib: AntDesign,
    name: "home",
  },
  Order: {
    lib: FontAwesome5,
    name: "box-open",
  },
};

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const { lib: Icon, name } = icons[route.name];
          return <Icon name={name} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: "#131418",
          borderTopColor: "rgba(255,255,255, 0.2)",
        },
        activeTintColor: "#FFF",
        inactiveTintColor: "#92929c",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Inicio",
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrdersScreen}
        options={{
          title: "Encomendas",
        }}
      />
    </Tab.Navigator>
  );
}
