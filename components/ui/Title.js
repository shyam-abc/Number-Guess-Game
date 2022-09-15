import { Text, StyleSheet } from 'react-native'

const Title = ({children}) => {
    return (
        <Text style={styles.title}>{children}</Text>
    )
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'OpenSans-Bold',
        color: 'white',
        textAlign: 'center',
        padding: 12,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 20,
        maxWidth: '80%',
        width: 300
    }
})

export default Title;