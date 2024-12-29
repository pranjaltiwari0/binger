import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  FlatList, 
  Image, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (text) => {
    setSearchQuery(text);
    if (text.length > 0) {
      try {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${text}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error searching shows:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const renderShowItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.showCard}
      onPress={() => navigation.navigate('Details', { show: item.show })}
    >
      <Image
        source={{ uri: item.show.image?.medium || 'https://via.placeholder.com/210x295' }}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{item.show.name}</Text>
      <Text style={styles.summary} numberOfLines={2}>
        {item.show.summary?.replace(/<[^>]*>/g, '') || 'No summary available'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={24} color="#FFF" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for shows..."
          placeholderTextColor="#AAA"
          value={searchQuery}
          onChangeText={handleSearch}
          autoFocus
        />
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderShowItem}
        keyExtractor={(item) => item.show.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    marginLeft: 10,
  },
  list: {
    padding: 10,
  },
  showCard: {
    flex: 1,
    margin: 5,
    backgroundColor: '#111',
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  summary: {
    color: '#AAA',
    fontSize: 12,
    padding: 10,
    paddingTop: 0,
  },
});

export default SearchScreen; 