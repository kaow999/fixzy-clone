import React, { useState } from "react";
// import axios from "axios";
import { Button, Modal, Portal, PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibrary } from "react-native-image-picker";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import GoogleMaps from "./map";

export default function Contact({ navigation, route }) {
  const { userInfo } = route.params;
  const { data } = route.params;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [mobile, setMobile] = useState(null);
  const [address, setAddress] = useState();
  const [selectedImage, setSelectedImage] = useState([]);
  const [visible, setVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: 18.81,
    longitude: 98.95,
    latitudeDelta: 0.1,
    longitudeDelta: 0.15,
  });
  const [markerCoordinate, setMarkerCoordinate] = useState(null);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handlePickImage = async () => {
    try {
      const options = {
        mediaType: "photo",
        quality: 1,
        selectionLimit: 0,
      };

      launchImageLibrary(options, (response) => {
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
  };

  const handleConfirmService = async () => {
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

    await axios.post(`http://localhost:1337/api/service-orders`, {
      data: body,
    });
  };

  const handleRegionChange = (newRegion) => {
    setRegion(newRegion);
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkerCoordinate(coordinate);
    setAddress(coordinate);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <PaperProvider>
          <View style={styles.container}>
            <View style={styles.content}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />

              <Text style={styles.label}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                value={mobile}
                onChangeText={setMobile}
              />

              <TouchableOpacity onPress={showModal}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  editable={false}
                  style={styles.input}
                  value={JSON.stringify(address)}
                />
              </TouchableOpacity>

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

              <TouchableOpacity
                style={styles.addButton}
                onPress={handlePickImage}
              >
                <Text style={styles.addButtonLabel}>Add Additional Images</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.bottomContainer}>
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Price:</Text>
                <Text style={styles.priceValue}>{data.cost} บาท</Text>
              </View>

              <Button
                mode="contained"
                onPress={handleConfirmService}
                style={styles.submitButton}
              >
                Confirm Service
              </Button>
            </View>

            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={styles.modalContainer}
              >
                <GoogleMaps
                  region={region}
                  markerCoordinate={markerCoordinate}
                  hideModal={hideModal}
                  handleRegionChange={handleRegionChange}
                  handleMapPress={handleMapPress}
                />
              </Modal>
            </Portal>
          </View>
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
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
  imageUploadContainer: {
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
  addButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonLabel: {
    fontWeight: "bold",
    color: "white",
  },
  divider: {
    height: 1,
    backgroundColor: "lightgray",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 16,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  submitButton: {
    borderRadius: 12,
  },
  modalContainer: {
    backgroundColor: "white",
    height: "100%",
  },
});
