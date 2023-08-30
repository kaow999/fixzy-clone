import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { List, Button } from "react-native-paper";

export default function Detail({ navigation, route }) {
  const { data } = route.params;
  const { userInfo } = route.params;
  const { serviceOptions } = route.params;
  const [cost, setCost] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionChange = (option, action) => {
    const updatedOptions = { ...selectedOptions };
    if (!updatedOptions[option.name]) {
      updatedOptions[option.name] = { count: 0, price: option.price };
    }
    if (action === "increase") {
      updatedOptions[option.name].count++;
    } else if (action === "decrease" && updatedOptions[option.name].count > 0) {
      updatedOptions[option.name].count--;
    }
    if (updatedOptions[option.name].count === 0) {
      delete updatedOptions[option.name];
    }
    setSelectedOptions(updatedOptions);
    updateTotalCost(updatedOptions);
  };

  const updateTotalCost = (options) => {
    let totalCost = 0;
    for (const optionLabel in options) {
      totalCost += options[optionLabel].count * options[optionLabel].price;
    }
    setCost(totalCost);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <List.Section>
            <List.Item
              title="เงื่อนไข"
              right={() => <List.Icon icon="arrow-right" />}
            />
            <List.Item
              title={data.name}
              description="service name"
              left={() => <List.Icon icon="clipboard-text" />}
            />
            <List.Item
              title={data.worker}
              description="worker"
              left={() => <List.Icon icon="account" />}
            />
            <List.Item
              title={data.workerNumber}
              description="moblie number"
              left={() => <List.Icon icon="cellphone" />}
            />
          </List.Section>
        </View>

        <View style={styles.content}>
          {serviceOptions.map((option, index) => (
            <View key={index} style={styles.optionItem}>
              <View style={styles.optionTextContainer}>
                <Text
                  style={{
                    fontSize: 14,
                  }}
                >
                  {option.name}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                  }}
                >
                  {option.price} บาท
                </Text>
              </View>
              {selectedOptions[option.name] ? (
                <View style={styles.counterContainer}>
                  <Button
                    mode="contained"
                    onPress={() => handleOptionChange(option, "decrease")}
                    style={styles.counterButton}
                  >
                    -
                  </Button>
                  <Text style={styles.counterText}>
                    {selectedOptions[option.name].count}
                  </Text>
                  <Button
                    mode="contained"
                    onPress={() => handleOptionChange(option, "increase")}
                    style={styles.counterButton}
                  >
                    +
                  </Button>
                </View>
              ) : (
                <Button
                  mode="contained"
                  onPress={() => handleOptionChange(option, "increase")}
                  style={styles.addButton}
                >
                  เพิ่ม
                </Button>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.divider} />
      <View style={styles.inlineContainer}>
        <View>
          <Text>ราคา</Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            {cost} บาท
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={() =>
            navigation.navigate("GoogleMaps", {
              userInfo: userInfo,
              data: {
                ...data,
                cost: cost,
                selectedOptions: selectedOptions,
              },
            })
          }
        >
          ต่อไป
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inlineContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "lightgray",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  optionTextContainer: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
  },
  addButton: {
    marginLeft: 10,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    marginHorizontal: 5,
  },
  counterText: {
    marginHorizontal: 5,
    fontSize: 16,
  },
});
