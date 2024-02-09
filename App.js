import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import BookList from "./Pages/home";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BookList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
