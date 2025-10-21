import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

// Adicione valores padrão para containerPadding, maxContentWidth e rf
const containerPadding = 16; // Exemplo de valor padrão
const maxContentWidth = 400; // Exemplo de largura máxima
const rf = (size) => size; // Função de exemplo para calcular tamanhos responsivos

export default function Index() {
  const { height, width } = useWindowDimensions();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function cadastro() {
    router.push('/cadastrar');
  }

  function entrar() {
    router.push('/uploadMusic');
  }

  return (
    <LinearGradient
      colors={['#fedea6', '#fc7ea7', '#7466e6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View
                style={[
                  styles.innerContainer,
                  {
                    paddingHorizontal: containerPadding,
                    maxWidth: maxContentWidth,
                    alignSelf: 'center',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.title,
                    { fontSize: rf(26), marginBottom: Math.max(8, height * 0.01) },
                  ]}
                >
                  Descubra Música Local
                </Text>
                <Text style={[styles.subtitle, { fontSize: rf(15) }]}>
                  Conecte-se com artistas da sua região
                </Text>

                <Text style={[styles.label, { fontSize: rf(14) }]}>Email</Text>
                <TextInput
                  style={[
                    styles.input,
                    { height: Math.min(Math.max(height * 0.065, 48), 68), fontSize: rf(16) },
                  ]}
                  placeholder="email@exemplo.com"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />

                <Text style={[styles.label, { fontSize: rf(14) }]}>Senha</Text>
                <TextInput
                  style={[
                    styles.input,
                    { height: Math.min(Math.max(height * 0.065, 48), 68), fontSize: rf(16) },
                  ]}
                  placeholder="••••••••"
                  placeholderTextColor="#666"
                  secureTextEntry
                  value={senha}
                  onChangeText={setSenha}
                />

                <TouchableOpacity
                  style={[
                    styles.button,
                    { paddingVertical: Math.min(Math.max(height * 0.02, 12), 20) },
                  ]}
                  onPress={entrar}
                >
                  <Text style={[styles.buttonText, { fontSize: rf(16) }]}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={cadastro}>
                  <Text style={[styles.footer, { fontSize: rf(14) }]}>
                    Não tem uma conta?{' '}
                    <Text style={styles.footerLink}>Cadastre-se</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    color: '#fff',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#5a4ae3',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    color: '#fff',
    textAlign: 'center',
  },
  footerLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});