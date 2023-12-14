import { StyleSheet } from "react-native";

import { Text, View } from "react-native";
import {Agenda} from "../../components/organisms/_features/agenda/Agenda";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Agenda />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
