import React, { useState } from "react";
// import axios from "axios";
import { Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibraryAsync } from "expo-image-picker";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

export default function Contact({ navigation, route }) {
  const { userInfo } = route.params;
  const { data } = route.params;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [mobile, setMobile] = useState(null);
  const [imageURIList, setImageURIList] = useState([]);

  async function pickImage() {
    const image = await launchImageLibraryAsync();
    if (image.canceled) {
      alert("No image selected");
    } else {
      setImageURIList([...imageURIList, image.assets[0].uri]);
    }
  }

  const handleSubmit = () => {
    const body = {
      name: data.name,
      customerName: userInfo.name,
      customerEmail: userInfo.email,
      customerMobileNumber: mobile,
      cost: data.cost,
      serviceOption: data.selectedOptions,
      workerName: data.worker,
      workerMobileNumber: data.workerNumber,
    };

    console.log(body);

    // axios.post(`http://localhost:1337/api/service-orders`, { data: body });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.content}>
              <Text style={styles.label}>name:</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>e-mail:</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>mobile number:</Text>
              <TextInput
                style={styles.input}
                value={mobile}
                onChangeText={setMobile}
              />
            </View>
            <View
              style={{
                flex: 6,
              }}
            >
              <ScrollView>
                {imageURIList.map((uri, i) => (
                  <Image
                    style={{ height: 300, marginVertical: 30 }}
                    key={uri + i}
                    source={{ uri }}
                  />
                ))}
              </ScrollView>
            </View>
          </ScrollView>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              style={{ backgroundColor: "black", padding: 30 }}
              onPress={pickImage}
            >
              <Text style={{ color: "white" }}>Add picture</Text>
            </TouchableOpacity>
          </View>

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
                {data.cost} บาท
              </Text>
            </View>

            <Button mode="contained" onPress={handleSubmit}>
              ยืนยันแจ้งบริการ
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
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
  imageUploadContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
