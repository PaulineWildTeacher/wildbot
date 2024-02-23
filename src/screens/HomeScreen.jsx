import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Features } from "../components/Features";
import { useEffect, useRef, useState } from "react";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { apiCallFunction } from "../services/apiCall";

export function HomeScreen() {
    const [messages, setMessages] = useState([]);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollViewRef = useRef();

    useEffect(() => {
        updateScrollView();
    }, []);

    function clear() {
        setPrompt('');
        setMessages([]);
    }

    function updateScrollView() {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({animated: true})
        }, 200)
    }

    function handlePress() {
        if (prompt && prompt.trim().length) {
            let newMessages = [...messages];
            newMessages.push({role: 'user', content: prompt.trim()})
            setMessages([...newMessages]);
            updateScrollView();
            setIsLoading(true);

            apiCallFunction(prompt.trim(), newMessages)
            .then(res => {
                setIsLoading(false);
                if (res.success) {
                    setMessages([...res.data]);
                    updateScrollView();
                    setPrompt('');
                } else {
                    Alert.alert('Error', res.msg)
                }
            })
        }
    }

    return (
        <ScrollView style={styles.homeContainer} showsVerticalScrollIndicator={false} 
        contentContainerStyle={{justifyContent: "flex-end"}}>
            <View style={styles.botImageContainer}>
                <Image source={require("./../../assets/images/bot.png")} style={styles.botImage}/>
            </View>

            {
                messages.length ? (
                    <View style={styles.mainContainer}>
                        <Text style={styles.assistant}>Assistant</Text>

                        <View style={styles.assistantContent}>
                            <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
                            {   
                                messages.map((message, index)=> {
                                    if (message.role === "assistant") {
                                        // bot
                                        if (message.content.includes('https')) {
                                            //image
                                            return (
                                                <View key={index} style={styles.assistantImageContainer}>
                                                    <View>
                                                        <Image source={{uri: message.content}} style={styles.assistantImage}/>
                                                    </View> 
                                                </View>
                                            )
                                        } else {
                                            // text
                                            return (
                                                <View key={index} style={styles.assistantResponseContainer}>
                                                    <View style={styles.botResponse}>
                                                        <Text>{message.content}</Text>
                                                    </View> 
                                                </View>
                                            )
                                        }
                                    } else {
                                        // me 
                                        return (
                                            <View key={index} style={styles.myResponseContainer}>
                                                <View style={styles.myResponse}>
                                                    <Text>{message.content}</Text>
                                                </View>
                                            </View>
                                        )
                                    }
                                })
                            }
                            </ScrollView>
                        </View>
                    </View>
                ) : (
                    <Features />
                )
            }

            {
                isLoading ? (
                    <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Image source={require("./../../assets/images/loading.gif")} style={{width: hp(10), height: hp(10)}} />
                    </View>
                ) : (
                <View style={{paddingBottom: 20}}>
                    <View style={styles.inputContainer}>
                        <TextInput multiline value={prompt} placeholder="Prompt ..." onChangeText={setPrompt} style={{flex: 1}}/>
                        <TouchableOpacity style={{backgroundColor: "#98f1c7", padding: 5, borderRadius: 10}} onPress={handlePress}>
                            <Feather name="send" size={24} color="black" />
                        </TouchableOpacity>
                        {
                            messages.length ? (
                                <TouchableOpacity style={{backgroundColor: "#e5cefe", padding: 5, borderRadius: 10, marginLeft: 4}} onPress={clear}>
                                    <AntDesign name="delete" size={24} color="black" />
                                </TouchableOpacity>
                            ) : null
                        }
                    </View>
                </View>
                )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: "white",
        padding: 15,
    },
    botImageContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    botImage: {
        width: wp(20),
        height: wp(20)
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        padding: 4
    },
    assistant: {
        fontSize: wp(7),
        fontWeight: "500",
        marginBottom: 15
    },
    assistantContent: {
        height: hp(60),
        backgroundColor: "#e0e0e0",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    },
    myResponseContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    myResponse: {
        backgroundColor: "white",
        padding: 10, 
        borderRadius: 10, 
    },
    botResponse: {
        backgroundColor: "#98f1c7",
        padding: 10, 
        borderRadius: 10, 
    },
    assistantImageContainer: { 
        borderRadius: 10, 
        backgroundColor:  "#98f1c7",
        width: wp(62),
        height: wp(62),
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    assistantImage: {
        width: wp(60),
        height: wp(60),
        borderRadius: 10
    },
    assistantResponseContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 10,
        backgroundColor:  "#98f1c7",
        borderRadius: 10,
        width: wp(70)
    }
})