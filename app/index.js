import { StyleSheet, View } from "react-native";
import RiffSettings from "./screens/RiffSettings";
import RecordRiff from "./screens/RecordRiff";
import Navigation from "./screens/Navigation";

const Page = () => {
  return (
    <View style={styles.container}>
      {/* <PlayRiff title="Morning Noodle" date="4/13/23" timeSignature="4/4"/> */}
      <RiffSettings />
      <RecordRiff />
      <Navigation style={styles.navigation} current="record"/>
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

export default Page;
