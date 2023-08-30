import React, { useState } from "react";
// import axios from "axios";
import { Button } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibrary } from "react-native-image-picker";
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
  const [selectedImage, setSelectedImage] = useState([]);

  async function pickImage() {
    try {
      const options = {
        mediaType: "photo",
        quality: 1,
        selectionLimit: 0,
      };

      launchImageLibrary(options, (response) => {
        console.log(response.assets);

        if (response.didCancel) {
          console.log("Image picking cancelled");
        } else if (response.error) {
          console.log("Image picking error: ", response.error);
        } else if (response.assets) {
          console.log("Selected image URI: ", response.assets);
          setSelectedImage(response.assets);
        }
      });
    } catch (error) {
      console.log("Error picking image: ", error);
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
            {selectedImage && (
              <View style={styles.imageUploadContainer}>
                {selectedImage.map((i) => (
                  <Image
                    key={i.fileName}
                    source={{ uri: i.uri }}
                    style={styles.uploadedImage}
                  />
                ))}
              </View>
            )}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ backgroundColor: "black", padding: 30 }}
                onPress={pickImage}
              >
                <Text style={{ color: "white" }}>Add</Text>
              </TouchableOpacity>
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginBottom: 1,
  },
});
