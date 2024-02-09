import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, FlatList, StyleSheet } from "react-native";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://openlibrary.org/people/mekBot/books/already-read.json")
      .then((response) => response.json())
      .then((data) => setBooks(data.books))
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        style={styles.image}
        source={{
          uri: `http://covers.openlibrary.org/b/id/${item.cover_id}-M.jpg`,
        }}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.authors[0].name}</Text>
        <Text style={styles.year}>Published: {item.first_publish_year}</Text>
        <Button title={item.read ? "Read" : "Not Read"} onPress={() => {}} />
      </View>
    </View>
  );

  return (
    <FlatList
      data={books}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 2,
  },
  author: {
    fontSize: 14,
    marginBottom: 2,
  },
  year: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default BookList;
