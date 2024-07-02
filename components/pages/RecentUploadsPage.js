import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { firebase } from '../../config';
import styles from '../shared/styles';

const RecentUploadsPage = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const storageRef = firebase.storage().ref();
            const result = await storageRef.listAll();
            const urls = await Promise.all(result.items.map(item => item.getDownloadURL()));
            setImages(urls);
        };
        fetchImages();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={images}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image source={{ uri: item }} style={styles.imagePreview} />
                )}
            />
        </View>
    );
};

export default RecentUploadsPage;
