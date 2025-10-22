import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [showParticles, setShowParticles] = useState(false);
  const dimensions = useWindowDimensions();
  const { width, height } = dimensions;

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
      style={[styles.container]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.header, { paddingVertical: height * 0.03 }]}>
          <Text style={[styles.headerText, { fontSize: width * 0.05 }]}>Suas Curtidas</Text>
        </View>

        <View style={[styles.iconContainer, { marginTop: height * 0.02 }]}>
          <TouchableWithoutFeedback onPress={handlePress}>
            <Animated.View
              style={[
                styles.iconButton,
                {
                  transform: [{ scale: scaleAnim }],
                  padding: width * 0.035,
                  borderRadius: width * 0.2,
                },
              ]}
            >
              <Icon name="heart" size={width * 0.25} color="#fff" style={styles.backHeart} />
              <Icon name="heart" size={width * 0.23} color="#ffd900" />
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
                    top: height * 0.4,
                    transform: [{ translateY }],
                    opacity,
                  }}
                >
                  <Icon name="heart" size={width * 0.045} color={colors[i % colors.length]} />
                </Animated.View>
              );
            })}
        </View>

        <View style={styles.content}>
          <Text style={[styles.contentText1, { fontSize: width * 0.055 }]}>Ainda sem curtidas</Text>
          <Text style={[styles.contentText2, { fontSize: width * 0.037, marginTop: 8 }]}>
            Comece a descobrir músicas para ver suas curtidas aqui!
          </Text>
        </View>

        <View style={[styles.nav, { paddingVertical: height * 0.015 }]}>
          {['Player', 'Curtidas', 'Perfil'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.navItem}>
              <Text style={[styles.navText1, { fontSize: width * 0.04 }]}>{item}</Text>
            </TouchableOpacity>
          ))}
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
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  iconContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconButton: {
    backgroundColor: '#9300a0',
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backHeart: {
    position: 'absolute',
    top: 5,
    left: 5,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%',
  },
  contentText1: {
    color: '#ffffff',
    textAlign: 'center',
  },
  contentText2: {
    color: '#ffffff',
    textAlign: 'center',
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
  },
  navItem: {
    paddingHorizontal: 10,
  },
  navText1: {
    color: '#ff3cf5',
  },
});

export default App;
