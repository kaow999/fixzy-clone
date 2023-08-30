import * as React from "react";
import { Searchbar } from "react-native-paper";
import { Text, View, StyleSheet } from "react-native";

export default function WaterSystem({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const data = [
    { name: "ท่อตัน", key: "PipeClog" },
    { name: "น้ำรั่วซึม", key: "WaterLeak" },
    { name: "ส้มตัน", key: "DrainBlockage" },
  ];

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {filteredData.map((item) => (
        <Text
          key={item.key}
          style={styles.item}
          onPress={() => navigation.navigate("Contact", { data: item })}
        >
          {item.name}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
});
