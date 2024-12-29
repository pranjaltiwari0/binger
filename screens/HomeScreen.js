import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  Pressable,
  SafeAreaView 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.error('Error fetching shows:', error);
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
    <SafeAreaView style={styles.container}>

      <Pressable 
        style={styles.searchBar}
        onPress={() => navigation.navigate('Search')}
      >
        <MaterialIcons name="search" size={24} color="#FFF" />
        <Text style={styles.searchText}>Search for shows...</Text>
      </Pressable>
      <FlatList
        data={shows}
        renderItem={renderShowItem}
        keyExtractor={(item) => item.show.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
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
  searchText: {
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default HomeScreen; 