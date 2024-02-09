import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";

const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(6);
  const [fetchError, setFetchError] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setFetching(true); // indicate fetching is in progress
      fetch(`https://openlibrary.org/search.json?title=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          setFetching(false); // indicate fetching is completed
          if (Array.isArray(data.docs)) {
            const booksWithStatus = data.docs
              .slice(0, displayCount)
              .map((book) => ({ ...book, status: "Unread" }));
            setBooks(booksWithStatus);
          } else {
            console.error("Invalid data format:", data);
            setFetchError(true); // set error state if data format is invalid
          }
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
          setFetchError(true); // set error state if fetching failed
          setFetching(false); // indicate fetching is completed (even if it failed)
        });
    }
  }, [searchTerm, displayCount]);

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

  const resetSearch = () => {
    setSearchTerm("");
    setBooks([]);
    setFetchError(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {fetching && <ActivityIndicator size="large" color="#0000ff" />}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for books..."
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      {searchTerm !== "" && (
        <TouchableOpacity style={styles.resetButton} onPress={resetSearch}>
          <Text style={styles.resetButtonText}>Reset Search</Text>
        </TouchableOpacity>
      )}
      {fetchError && (
        <Text style={styles.errorText}>
          Error fetching books. Please try again.
        </Text>
      )}
      {books.length > 0 && (
        <View style={styles.searchResultsContainer}>
          <Text style={styles.searchResultsTitle}>Search Results</Text>
          {books.map((book, index) => renderBookItem(book, index))}
        </View>
      )}
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
  searchBar: {
    height: 40,
    borderColor: "#fff",
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: "Poppins-Medium",
    marginBottom: 10,
    paddingLeft: 10,
  },
  statusText: {
    fontFamily: "Poppins-Medium",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  searchResultsContainer: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: "100%",
  },
  searchResultsTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  resetButtonText: {
    color: "white",
    fontFamily: "Poppins-Medium",
  },
});

export default SearchPage;
