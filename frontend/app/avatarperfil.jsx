import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; 

export default function Index() {
  const [image, setImage] = useState(null); 

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
     const navigation = useNavigation(); 

    if (status !== "granted") {
      Alert.alert("Permissão", "Precisamos de permissão para acessar suas fotos.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

   
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };
  <TouchableOpacity style={styles.backCircle} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={20} color="#fa6cb3ff" />
          </TouchableOpacity>

  return (
    
    <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Toque para selecionar uma imagem</Text>
        </View>
      )}
    </TouchableOpacity>
    
    
  );
}


const styles = StyleSheet.create({
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: 25,
    alignSelf: "center",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
   backCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginLeft: -2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
  },
  placeholderText: {
    fontFamily: "fino",
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
