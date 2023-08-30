import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibrary } from "react-native-image-picker";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function ImagePickerScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

  async function pickImage() {
    try {
      const options = {
        mediaType: "photo",
        quality: 1,
      };

      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log("Image picking cancelled");
        } else if (response.error) {
          console.log("Image picking error: ", response.error);
        } else if (response.assets[0].uri) {
          console.log("Selected image URI: ", response.assets[0].uri);
          setSelectedImage(response.assets[0].uri);
        }
      });
    } catch (error) {
      console.log("Error picking image: ", error);
    }
    r;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
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

          {selectedImage && (
            <View style={styles.imageUploadContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.uploadedImage}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
