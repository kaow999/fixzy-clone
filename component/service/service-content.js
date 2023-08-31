import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card } from "react-native-paper";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import { services } from "../../_mock/service";

export default function ServiceContent({ route, navigation }) {
  const { userInfo } = route.params;
  const [data, setData] = useState([]);

  const fetchData = async () => {
    await axios
      .get(`http://localhost:1337/api/services?populate=*`)
      .then((res) => {
        setData(res.data.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Button
            mode="contained"
            style={{ marginHorizontal: 10, marginVertical: 5 }}
            onPress={() => navigation.navigate("Search")}
          >
            แจ้งงานซ่อม กดที่นี่
          </Button>
        </View>
        <ScrollView>
          <View style={styles.tabContainer}>
            <Image
              style={{ width: "100%", height: 200 }}
              source={{
                uri: "https://legacy.reactjs.org/logo-og.png",
              }}
            />
            <View
              style={{
                paddingTop: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 24 }}>บริการแนะนำ</Text>
            </View>
            <View
              style={{
                justifyContent: "start",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {data.map((i) => (
                <Card
                  key={i.id}
                  theme={{
                    roundness: 10,
                    isV3: false,
                  }}
                  style={{
                    width: "45%",
                    marginTop: 10,
                    marginLeft: 10,
                  }}
                  onPress={() =>
                    navigation.navigate("ServiceDetail", {
                      userInfo: userInfo,
                      data: {
                        name: i?.attributes?.name,
                        worker: i?.attributes?.workerName,
                        workerNumber: i?.attributes?.workerMobileNumber,
                      },
                      serviceOptions: i?.attributes?.serviceOption,
                    })
                  }
                >
                  <Card.Cover
                    source={{ uri: userInfo.picture }}
                    theme={{
                      roundness: 10,
                      isV3: false,
                    }}
                  />
                  <Card.Content>
                    <Text variant="titleMedium">{i?.attributes?.name}</Text>
                    <Text variant="bodyMedium">฿ {i?.attributes?.price}.-</Text>
                  </Card.Content>
                </Card>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
  },
});
