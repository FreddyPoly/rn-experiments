import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Image } from 'react-native';

import apple from '../../assets/demo-carousel-1/apple.png';
import banana from '../../assets/demo-carousel-1/banana.png';
import grape from '../../assets/demo-carousel-1/grape.png';
import pineapple from '../../assets/demo-carousel-1/pineapple.png';
import strawberry from '../../assets/demo-carousel-1/strawberry.png';

const { width } = Dimensions.get('window');

const WIDTH = width;
const elements = [
  {
    title: 'Apple',
    subtitle: 'Lorem ipsum',
    image: apple,
  },
  {
    title: 'Banana',
    subtitle: 'Lorem ipsum',
    image: banana,
  },
  {
    title: 'Grape',
    subtitle: 'Lorem ipsum',
    image: grape,
  },
  {
    title: 'Pineapple',
    subtitle: 'Lorem ipsum',
    image: pineapple,
  },
  {
    title: 'Strawberry',
    subtitle: 'Lorem ipsum',
    image: strawberry,
  },
];

const DemoCarousel1 = () => {
  const offset = useRef(new Animated.Value(0)).current;
  const [activePage, setActivePage] = useState(0);
  const pages = Array.from(Array(5).keys());
  const titleOffset = useRef(new Animated.Value(0)).current;
  const [title, setTitle] = useState(elements[0].title);
  const [subtitle, setSubtitle] = useState(elements[0].subtitle);

  useEffect(() => {
    updateText();
  }, [activePage]);

  const nextPage = async () => {
    if (activePage >= pages.length - 1) return;

    const newPage = activePage + 1;

    Animated.timing(offset, {
      toValue: -newPage * width,
      duration: 250,
      useNativeDriver: false,
    }).start();

    setActivePage(newPage);
  }

  const previousPage = async () => {
    if (activePage <= 0) return;

    const newPage = activePage - 1;

    Animated.timing(offset, {
      toValue: -newPage * width,
      duration: 250,
      useNativeDriver: false,
    }).start();

    setActivePage(newPage);
  }

  const updateText = () => {
    Animated.timing(titleOffset, {
      toValue: 30,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setTitle(elements[activePage].title);
      setSubtitle(elements[activePage].subtitle);

      Animated.timing(titleOffset, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  }

  const color = offset.interpolate({
    inputRange: [-4 * width, -3 * width, -2 * width, -width, 0],
    outputRange: ['#012638', '#012b3f', '#023047', '#1b4459', '#34596b']
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.absoluteBackground, { backgroundColor: color }]} />

      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: WIDTH }}>
        <Animated.View style={[styles.background, { transform: [{ translateX: offset }] }]}>
          {elements.map((element, index) => (
            <View key={index} style={styles.contentContainer}>
              <Image style={{ height: width * 0.45, width: width * 0.45, resizeMode: 'contain' }} source={element.image} />
            </View>
          ))}
        </Animated.View>
      </View>

      <View style={{ flex: 1, width: WIDTH, paddingHorizontal: width * 0.05 }}>
        <View style={{ overflow: 'hidden' }}>
          <Animated.Text style={{ fontSize: 24, transform: [{ translateY : titleOffset }] }}>{title}</Animated.Text>
        </View>
        
        <View style={{ overflow: 'hidden' }}>
          <Animated.Text style={{ transform: [{ translateY : titleOffset }] }}>{subtitle}</Animated.Text>
        </View>
      </View>

      <TouchableOpacity
        style={{ position: 'absolute', top: 5, left: 5 }}
        onPress={previousPage}
        disabled={activePage <= 0}>
        <Text style={styles.buttonLabel}>Previous</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ position: 'absolute', top: 5, right: 5 }}
        onPress={nextPage}
        disabled={activePage >= pages.length - 1}>
        <Text style={styles.buttonLabel}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  background: {
    flexDirection: 'row',
    width: WIDTH,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,
  },
});

export default DemoCarousel1;
