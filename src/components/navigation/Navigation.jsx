import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { WelcomeScreen } from "../../screens/WelcomeScreen";
import { HomeScreen } from "../../screens/HomeScreen";

// Création de la stack
const Stack = createStackNavigator();


/**
 * Mise en place de la navigation. 
 * Deux écrans -> un écran WelcomeScreen juste pour accueillir l'utilisateur
 * Un écran HomeScreen dans lequel se fera l'ensemble des fonctionnalités
 * 
 * Stack.Navigator prend ici deux props : initialRouteName qui permet de déterminer quel est l'écran par défaut lorsque l'on arrive sur l'application 
 * (attention, les name sont très importants car ils sont "l'encre" permettant la navigation -> les name sont les éléments qui permettent de naviguer de page en page)
 * 
 * seconde props de Stack.Navigator : screenOptions, qui nous permet ici de désactiver le bandeau en haut de l'écran affichant le name de la route
 * 
 */
export function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}