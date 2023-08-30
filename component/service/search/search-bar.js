import * as React from "react";
import { Searchbar } from "react-native-paper";
import { Text, View, StyleSheet } from "react-native";

export default function MySearchBarScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const data = [
    { name: "ระบบน้ำ", key: "WaterSystem" },
    { name: "ระบบไฟ", key: "ElectricSystem" },
    { name: "เครื่องใช้ไฟฟ้า", key: "Appliances" },
    { name: "โครงสร้าง", key: "Structure" },
    { name: "บริการและซ่อมบำรุง", key: "ServicesAndMaintenance" },
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
          onPress={() => navigation.navigate(item.key)}
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
