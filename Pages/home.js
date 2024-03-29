import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Banner from "../components/banner";
import SearchPage from "./SearchPage";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://openlibrary.org/people/mekBot/books/already-read.json")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.reading_log_entries)) {
          const booksWithStatus = data.reading_log_entries
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
  }, []);

  const toggleStatus = (index) => {
    setBooks((prevBooks) => {
      const newBooks = [...prevBooks];
      newBooks[index].status =
        newBooks[index].status === "Read" ? "Unread" : "Read";
      return newBooks;
    });
  };

  const renderBookItem = (book, index) => {
    const key = `${book.logged_date}-${index}`;
    const coverImageUrl = `https://covers.openlibrary.org/b/id/${book.work.cover_id}-M.jpg`;
    return (
      <View key={key} style={styles.bookItem}>
        <Image source={{ uri: coverImageUrl }} style={styles.coverImage} />
        <View style={styles.bookDetails}>
          <Text style={styles.title}>Title: {book.work.title}</Text>
          <Text style={styles.author}>
            Author: {book.work.author_names.join(", ")}
          </Text>
          <Text style={styles.year}>Year: {book.work.first_publish_year}</Text>
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
      <Banner />
      <SearchPage />
      {books.map((book, index) => renderBookItem(book, index))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 20,
    backgroundColor: "white",
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
  statusText: {
    fontFamily: "Poppins-Medium",
  },
});

export default BookList;
