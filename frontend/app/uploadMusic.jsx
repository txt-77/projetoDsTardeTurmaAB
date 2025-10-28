import { Text, TouchableOpacity, TextInput, View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native"; 

export default function Upload() {
  const navigation = useNavigation();
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isGenreListVisible, setIsGenreListVisible] = useState(false);

  const genres = ['Pop', 'Rock', 'Hip Hop', 'Eletronic', 'Indie', 'Jaxx'];

  const handleSelectGenre = (genre) => {
    setSelectedGenre(genre);
    setIsGenreListVisible(false);
  };

  return (
    <LinearGradient
      colors={["#fedea6", "#fc7ea7", "#7466e6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
        
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Upload de Música</Text>
          <Text style={styles.subtitle}>Compartilhe sua arte com o mundo</Text>
        </View>

        <View style={styles.form}>
         
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Arquivo de Áudio</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>📁 Selecionar Música</Text>
            </TouchableOpacity>
          </View>

         
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Capa do Álbum</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>🖼️ Selecionar Imagem</Text>
            </TouchableOpacity>
          </View>

          
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Título da Música</Text>
            <TextInput style={styles.input} placeholder="Digite o título da música" placeholderTextColor="#aaa" />
          </View>

          
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Artista</Text>
            <TextInput style={styles.input} placeholder="Seu nome artístico" placeholderTextColor="#aaa" />
          </View>

         
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Álbum</Text>
            <TextInput style={styles.input} placeholder="Nome do álbum" placeholderTextColor="#aaa" />
          </View>

          
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Gênero Musical</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setIsGenreListVisible(!isGenreListVisible)}
            >
              <Text style={styles.selectButtonText}>
                {selectedGenre || 'Selecionar Gênero'}
              </Text>
              <Text style={styles.selectArrow}>▼</Text>
            </TouchableOpacity>

            {isGenreListVisible && (
              <View style={styles.genreList}>
                {genres.map((genre) => (
                  <TouchableOpacity
                    key={genre}
                    style={styles.genreItem}
                    onPress={() => handleSelectGenre(genre)}
                  >
                    <Text style={styles.genreText}>{genre}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Conte sobre sua música..."
              placeholderTextColor="#aaa"
              multiline={true}
              numberOfLines={4}
            />
          </View>

          
          <TouchableOpacity style={styles.uploadFinalButton}>
            <Text style={styles.uploadFinalButtonText}>🎵 Fazer Upload</Text>
          </TouchableOpacity>

         
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>📋 Informações Importantes:</Text>
            <Text style={styles.infoText}>• Formatos aceitos: MP3, WAV, FLAC</Text>
            <Text style={styles.infoText}>• Tamanho máximo: 50MB</Text>
            <Text style={styles.infoText}>• Capa: JPG, PNG (mín. 500x500px)</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { flex: 1, paddingHorizontal: 24 },
  header: { paddingTop: 60, paddingBottom: 20 },
  backButton: { alignSelf: "flex-start", marginBottom: 20 },
  backArrow: { fontSize: 24, color: "#333" }, 
  inputBlock: { marginBottom: 20 },
  label: { fontSize: 14, color: "#333", marginBottom: 8 },
  form: { paddingBottom: 40 },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 16,
    fontSize: 16,
  },
  textArea: { height: 100, paddingTop: 12, textAlignVertical: "top" },
  uploadButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  uploadButtonText: { fontSize: 16, color: "#666" },
  selectButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectButtonText: { fontSize: 16, color: "#666" },
  selectArrow: { fontSize: 12, color: "#666" },
  genreList: { marginTop: 10, backgroundColor: "#fff", borderRadius: 10 },
  genreItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  genreText: { fontSize: 14, color: "#333" },
  uploadFinalButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  uploadFinalButtonText: { color: "#fff", fontSize: 18 },
  title: { fontSize: 28, color: "#000", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#666", textAlign: "center" },
  infoBox: { backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: 15, padding: 20, marginTop: 10 },
  infoTitle: { fontSize: 16, color: "#333", marginBottom: 10 },
  infoText: { fontSize: 14, color: "#666", marginBottom: 5 },
});
