import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("https://openlibrary.org/people/mekBot/books/already-read.json")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.reading_log_entries)) {
          setBooks(data.reading_log_entries.slice(0, 20));
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const renderBookItem = (book, index) => {
    const key = `${book.logged_date}-${index}`;
    const coverImageUrl = `https://covers.openlibrary.org/b/id/${book.work.cover_id}-M.jpg`;
    return (
      <View key={key} style={{ marginBottom: 20 }}>
        <Image
          source={{ uri: coverImageUrl }}
          style={{ width: 100, height: 150 }}
        />
        <Text>Title: {book.work.title}</Text>
        <Text>Author: {book.work.author_names.join(", ")}</Text>
        <Text>Year: {book.work.first_publish_year}</Text>
        <Text>Cover ID: {book.work.cover_id}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: book.isRead ? "green" : "red",
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Text style={{ color: "white" }}>
            {book.isRead ? "Read" : "Not Read"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {books.map((book, index) => renderBookItem(book, index))}
    </View>
  );
};

export default BookList;
