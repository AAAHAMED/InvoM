import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 50,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    arrowContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 18,
        color: '#fff',
        marginRight: 10,
    },
    arrowIcon: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});

export default styles;
