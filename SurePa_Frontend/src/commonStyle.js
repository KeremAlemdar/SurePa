import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainDiv: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 12
    },
    container: {
        padding: 16,
    },
    input: {
        height: 55,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 8,
        marginBottom: 14,
    },
    inputStyle: { fontSize: 16, color: 'black' },
    labelStyle: {
        fontSize: 14,
        position: 'absolute',
        top: -10,
        backgroundColor: 'white',
        paddingHorizontal: 4,
    },
    applogo: {
        width: 150,
        height: 150
    },
    centeredContainer: {
        padding: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 15,
        fontWeight: '600',
        color: 'black',
    }
});