import { StyleSheet, Text, View } from "react-native";

export default function Navigation({current}) {
  const navItems = ['riffs', 'record', 'loops'];
  return (
    <View style={styles.container}>
      {navItems.map((navItem, idx) => {
        return (
          <Text
            key={`${idx}-${navItem}`}
            style={[styles.navItem, current === navItem && styles.current]}>{navItem}
          </Text>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    borderColor: 'white',
    borderTopWidth: 2,
    flexDirection: 'row',
    height: 72,
    justifyContent: 'space-around',
    paddingTop: 9,
  },
  navItem: {
    color: 'white',
    fontSize: 24,
    textTransform: 'uppercase',
  },
  pL: {
    paddingLeft: 18,
  },
  current: {
    color: "purple",
  }
});
