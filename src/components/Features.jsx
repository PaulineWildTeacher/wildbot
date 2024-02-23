import { Image, StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export function Features() {
    return (
        <View style={styles.featuresContainer}>
            <Text style={styles.textFeatures}>Features</Text>

            <View style={[styles.featureContainer, styles.feature1Container]}>
                <View style={styles.feature}>
                    <Image source={require("./../../assets/images/chatgptIcon.png")} style={styles.featureImage}/>
                    <Text style={styles.label}>ChatGPT</Text>
                </View>
                <Text style={styles.description}>ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on a wide range of topics.</Text>
            </View>

            <View style={[styles.featureContainer, styles.feature2Container]}>
                <View style={styles.feature}>
                    <Image source={require("./../../assets/images/dalleIcon.png")} style={styles.featureImage}/>
                    <Text style={styles.label}>Dall-E</Text>
                </View>
                <Text style={styles.description}>DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity.</Text>
            </View>

            <View style={[styles.featureContainer, styles.feature3Container]}>
                <View style={styles.feature}>
                    <Image source={require("./../../assets/images/smartaiIcon.png")} style={styles.featureImage}/>
                    <Text style={styles.label}>Smart AI</Text>
                </View>
                <Text style={styles.description}>A powerful voice assistant with the abilities of ChatGPT and Dall-E, providing you the best of both worlds.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    featuresContainer: {
        height: hp(60)
    },
    featureContainer: {
        borderRadius: 10,
        padding: 10, 
        marginBottom: 20
    },
    feature1Container: {
        backgroundColor: "#98f1c7"
    },
    feature2Container: {
        backgroundColor: "#e5cefe"
    },
    feature3Container: {
        backgroundColor: "#9af0fc"
    },
    feature: {
        flexDirection: "row",
        alignItems: "center"
    },
    textFeatures: {
        fontSize: wp(7),
        fontWeight: "500",
        marginBottom: 15
    },
    featureImage: {
        width: hp(4),
        height: hp(4)
    },
    label: {
        marginLeft: 5
    },
    description: {
        color: "#282828"
    }
})