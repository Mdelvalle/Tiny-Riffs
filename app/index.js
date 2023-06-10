import { StyleSheet, Text, View } from "react-native";
import RecordRiff from "./screens/RecordRiff";
import Navigation from "./screens/Navigation";

export default function Page() {
  return (
    <View style={styles.container}>
      {/* <PlayRiff title="Morning Noodle" date="4/13/23" timeSignature="4/4"/> */}
      <RecordRiff></RecordRiff>
      <Navigation style={styles.navigation} current="riffs"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
  navigation: {
    alignSelf: "flex-end",
  }
});
