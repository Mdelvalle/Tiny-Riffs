import { StyleSheet, Text, View } from 'react-native';

const PlayRiff = ({ title, date, timeSignature }) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.timeSignature}>{timeSignature}</Text>
      </View>
      <View style={styles.actions}>
        <Text>heart</Text>
        <Text>loop</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 24,
  },
  info: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    maxWidth: 960,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  date: {
    color: 'white',
    fontSize: 16,
  },
  timeSignature: {
    color: 'white',
    fontSize: 12,
  },
  actions: {
    color: 'white',
    justifyContent: 'space-between',
    marginLeft: 12,
    marginRight: 12,
  },
});

export default PlayRiff;
