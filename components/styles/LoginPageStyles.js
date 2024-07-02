import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 42,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: Dimensions.get('window').width * 0.8, // 80% of the window width
        padding: 15,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent background for readability
        color: '#333',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        width: Dimensions.get('window').width * 0.8, // 80% of the window width
        padding: 15,
        backgroundColor: '#007BFF',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default styles;
