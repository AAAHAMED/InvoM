import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';

const RecentUploadsPage = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    fetch('https://invom.online/get_uploads.php')
      .then(response => response.json())
      .then(data => {
        setUploads(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: `https://invom.online/${item.image}` }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.imageId}</Text>
        <Text>Type: {item.type}</Text>
        <Text>Company: {item.company}</Text>
        <Text>Date: {item.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recent Uploads</Text>
      </View>
      <FlatList
        data={uploads}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}  // Using the 'id' from the database
        style={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 20,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 1,
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 120,  // Set a fixed height for each card
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default RecentUploadsPage;
