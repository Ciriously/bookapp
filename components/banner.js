import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Banner = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greeting;
  let emoji;

  if (currentHour < 12) {
    greeting = "Good morning";
    emoji = "☀️";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
    emoji = "🌤️";
  } else {
    greeting = "Good evening";
    emoji = "🌙";
  }

  return (
    <View style={[styles.container, { marginTop: 20, marginBottom: 20 }]}>
      <Text
        style={[
          styles.text,
          {
            color: "#000",
            textShadowColor: "pink",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          },
        ]}
      >
        {greeting}, scaleX! {emoji}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
});

export default Banner;
