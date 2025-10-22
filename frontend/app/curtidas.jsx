import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const App = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [showParticles, setShowParticles] = useState(false);

  const particles = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setShowParticles(true);
    particles.forEach((particle, index) => {
      particle.setValue(0);
      Animated.timing(particle, {
        toValue: 1,
        duration: 600,
        delay: index * 100,
        useNativeDriver: true,
      }).start(() => {
        if (index === particles.length - 1) {
          setShowParticles(false);
        }
      });
    });
  };

  return (
    <LinearGradient
      colors={['#962fbf', '#d62976', '#fa7e1e', '#feda75', '#4f5bd5']}
      style={styles.container}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Suas Curtidas</Text>
        </View>

        <View style={styles.iconContainer}>
          <TouchableWithoutFeedback onPress={handlePress}>
            <Animated.View style={[styles.iconButton, { transform: [{ scale: scaleAnim }] }]}>
              <Icon name="heart" size={width * 0.24} color="#fff" style={{ position: 'absolute', top: 8, left: 7 }} />
              <Icon name="heart" size={width * 0.22} color="#ffd900" />
            </Animated.View>
          </TouchableWithoutFeedback>

          {showParticles &&
            particles.map((anim, i) => {
              const translateY = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -80 - i * 10],
              });

              const opacity = anim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              });

              const colors = ['#cc00ff', '#ff9900', '#ffe600'];

              return (
                <Animated.View
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '45%',
                    transform: [{ translateY }],
                    opacity,
                  }}
                >
                  <Icon name="heart" size={16} color={colors[i % colors.length]} />
                </Animated.View>
              );
            })}
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText1}>Ainda sem curtidas</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentText2}>
            Comece a descobrir músicas para ver suas curtidas aqui!
          </Text>
        </View>

        <View style={styles.nav}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText1}>Player</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText1}>Curtidas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText1}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#962fbf',
    paddingVertical: height * 0.02,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  iconButton: {
    backgroundColor: '#9300a0',
    borderRadius: 100,
    padding: width * 0.03,
    elevation: 5,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000000',
    paddingVertical: height * 0.015,
    marginBottom: 2,
  },
  navItem: {
    paddingHorizontal: width * 0.03,
  },
  navText1: {
    fontSize: width * 0.04,
    color: '#ff3cf5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.1,
  },
  contentText1: {
    fontSize: width * 0.055,
    color: '#ffffff',
    textAlign: 'center',
  },
  contentText2: {
    fontSize: width * 0.035,
    color: '#ffffff',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#4A90E2',
    padding: 15,
    alignItems: 'center',
  },
  footerText: {
    color: '#f80091',
  },
});

export default App;
