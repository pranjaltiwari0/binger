import React from 'react';
import { 
  ScrollView, 
  View, 
  Image, 
  Text, 
  StyleSheet 
} from 'react-native';

const DetailsScreen = ({ route }) => {
  const { show } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: show.image?.original || 'https://via.placeholder.com/500x750' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{show.name}</Text>
        {show.genres && (
          <Text style={styles.genres}>{show.genres.join(' • ')}</Text>
        )}
        {show.rating?.average && (
          <Text style={styles.rating}>Rating: ⭐️ {show.rating.average}/10</Text>
        )}
        <Text style={styles.summary}>
          {show.summary?.replace(/<[^>]*>/g, '') || 'No summary available'}
        </Text>
        {show.schedule && (
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Schedule</Text>
            <Text style={styles.infoText}>
              {show.schedule.days.join(', ')} at {show.schedule.time}
            </Text>
          </View>
        )}
        {show.network && (
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Network</Text>
            <Text style={styles.infoText}>{show.network.name}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: 500,
  },
  content: {
    padding: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  genres: {
    color: '#E50914',
    fontSize: 16,
    marginBottom: 10,
  },
  rating: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 15,
  },
  summary: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 15,
  },
  infoTitle: {
    color: '#E50914',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default DetailsScreen; 