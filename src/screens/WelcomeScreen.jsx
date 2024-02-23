import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export function WelcomeScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.welcomeContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>Wildbot</Text>
                <Text style={styles.subtitle}>You are the king of the dev world</Text>
                <Text style={styles.subtitle}>(thanks to AI)</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image source={require("./../../assets/images/welcome.png")} style={styles.image} />
            </View>

            <TouchableOpacity style={styles.getStartedButton} onPress={() => navigation.navigate("Home")}>
                <Text style={styles.buttonText}>Get Started !!</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "white", 
        padding: 15
    },
    textContainer: {
        alignItems: "center"
    },
    title: {
        fontSize: wp(10),
        color: "grey",
        fontWeight: "600"
    },
    subtitle: {
        fontSize: wp(4),
        color: "darkgrey"
    },
    image: {
        width: wp(80),
        height: wp(80),
        // marginTop: 10
    },
    getStartedButton: {
        width: "100%",
        backgroundColor: "#028258",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center"
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: wp(6)
    }
})