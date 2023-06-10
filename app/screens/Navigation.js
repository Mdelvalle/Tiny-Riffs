import { StyleSheet, Text, View } from "react-native";

export default function Navigation({current}) {
  const navItems = ['riffs', 'record', 'loops'];
  return (
    <View style={styles.container}>
      {navItems.map((navItem, idx) => {
        return (
          <Text
            key={`${idx}-${navItem}`}
            className={current === navItem ? styles.current : ''}
            style={styles.navItem}>{navItem}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "purple",
    borderColor: "white",
    borderTopWidth: 2,
    flexDirection: "row",
    height: 36,
    justifyContent: "space-evenly",
  },
  navItem: {
    color: "white",
    fontSize: 12,
    textTransform: "uppercase",
  },
  current: {
    color: "purple",
  }
});
