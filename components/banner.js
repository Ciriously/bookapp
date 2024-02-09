import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Banner = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{greeting}, scaleX!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins-Bold", // Change font weight/style here
    fontSize: 20,
    color: "#000",
  },
});

export default Banner;
