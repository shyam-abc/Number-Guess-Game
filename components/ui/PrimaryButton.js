import { View, Text, StyleSheet, Pressable } from "react-native";
import Colors from "../../constants/colors";

const PrimaryButton = (props) => {
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable onPress={props.onPress} 
                        style={(pressData) => pressData.pressed ? [styles.buttonInnerContainer, styles.pressed] 
                                                                : styles.buttonInnerContainer} 
                        android_ripple={{color: Colors.primary600}}>
                <Text style={styles.buttonText}>{props.children}</Text>   
            </Pressable>  
        </View>  
    )
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden'
    },  
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.25,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    pressed: {
        opacity: 0.75
    }
});

export default PrimaryButton;