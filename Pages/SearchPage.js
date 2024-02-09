import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm) {
      fetch(`https://openlibrary.org/search.json?title=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data.docs)) {
            const booksWithStatus = data.docs
              .slice(0, 20)
              .map((book) => ({ ...book, status: "Unread" }));
            setBooks(booksWithStatus);
          } else {
            console.error("Invalid data format:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    }
  }, [searchTerm]);

  const toggleStatus = (index) => {
    setBooks((prevBooks) => {
      const newBooks = [...prevBooks];
      newBooks[index].status =
        newBooks[index].status === "Read" ? "Unread" : "Read";
      return newBooks;
    });
  };

  const renderBookItem = (book, index) => {
    const key = `${book.first_publish_year}-${index}`;
    const coverImageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    const authorNames = book.author_name
      ? book.author_name.join(", ")
      : "Unknown";
    return (
      <View key={key} style={styles.bookItem}>
        <Image source={{ uri: coverImageUrl }} style={styles.coverImage} />
        <View style={styles.bookDetails}>
          <Text style={styles.title}>Title: {book.title}</Text>
          <Text style={styles.author}>Author: {authorNames}</Text>
          <Text style={styles.year}>Year: {book.first_publish_year}</Text>
        </View>
        <TouchableOpacity
          onPress={() => toggleStatus(index)}
          style={[
            styles.statusButton,
            {
              backgroundColor: book.status === "Read" ? "green" : "transparent",
              borderColor: book.status === "Read" ? "green" : "red",
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: book.status === "Read" ? "white" : "red" },
            ]}
          >
            {book.status}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for books..."
        onChangeText={setSearchTerm}
      />
      {books.map((book, index) => renderBookItem(book, index))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 20,
  },
  bookItem: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  coverImage: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  bookDetails: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily: "Poppins-Bold",
    marginBottom: 5,
  },
  author: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "gray",
    marginBottom: 5,
  },
  year: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "gray",
    marginBottom: 5,
  },
  statusButton: {
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  statusText: {
    fontFamily: "Poppins-Medium",
  },
});

export default SearchPage;
