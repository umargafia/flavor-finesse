import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/global/Header';
import MyInput from '../../components/global/MyInput';
import { Theme } from '../../constants/Theme';
import FavoriteCard from '../../components/FavoritePage/FavoriteCard';
import { apiKey, searchRecipesv2 } from '../../store/api';
import Trending from '../../components/foodWorld/Trending/Trending';

const theme = Theme();

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchText) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        handleSearch();
      }, 1000); // Delay for 1 second before searching

      return () => clearTimeout(timer); // Clear the timer if the input changes
    } else {
      setSearchResults([]);
      setIsLoading(false); // Reset isLoading when search text is empty
    }
  }, [searchText]);

  const handleSearch = async () => {
    try {
      const data = await searchRecipesv2({ searchText });
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header text="Search" />
      <View>
        <MyInput
          text="Search"
          name="search"
          inputStyle={styles.input}
          style={styles.inputContainer}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {searchText.trim().length === 0 ? (
        <View>
          <Trending horizontal />
        </View>
      ) : isLoading ? (
        <ActivityIndicator
          style={styles.loader}
          size="large"
          color={theme.palette.primary}
        />
      ) : (
        <View style={styles.resultsContainer}>
          <VirtualizedList
            getItemCount={() => searchResults?.length}
            getItem={(data, index) => {
              return {
                id: index,
                title: data.name,
              };
            }}
            data={searchResults}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <FavoriteCard item={item} notFav />}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    margin: 20,
  },
  inputContainer: {
    marginTop: 30,
    width: '95%',
  },
  input: {
    backgroundColor: theme.palette.white,
    borderColor: theme.palette.primary,
    borderWidth: 1,
    ...theme.ShadowLight,
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.primary,
  },
  loader: {
    marginTop: 20,
  },
});

export default SearchPage;
