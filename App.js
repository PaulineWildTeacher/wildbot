import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Navigation } from './src/components/navigation/Navigation';

/**
 * Ce composant App contient uniquement une SafeAreaView (attention à bien installer react-native-safe-area-context, car sinon la SafeAreaView native n'est pas supportée par Android) + Composant de Navigation pour changer de Screen
 * 
 */
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
