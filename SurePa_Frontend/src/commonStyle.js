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
    }
});