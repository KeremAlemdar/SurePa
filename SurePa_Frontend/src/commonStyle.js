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
        borderWidth: 0.5,
        borderColor: '#DDDDDD',
    },
    inputStyle: { fontSize: 16 },
    labelStyle: {
        fontSize: 14,
        position: 'absolute',
        top: -10,
        backgroundColor: 'white',
        paddingHorizontal: 4,
        marginLeft: -4,
    },
    placeholderStyle: { fontSize: 16 },
    textErrorStyle: { fontSize: 16 },
});