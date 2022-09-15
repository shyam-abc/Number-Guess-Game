import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

const Card = ({children}) => {
    return (
        <View style={styles.card}>
            {children}
        </View>
    )
};

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: 24,
        borderRadius: 8, 
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
        elevation: 4, // For Android Shadow
        backgroundColor: Colors.primary800
    },
})

export default Card;