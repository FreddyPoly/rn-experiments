import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Image } from 'react-native';

import apple from '../../assets/demo-carousel-1/apple.png';
import banana from '../../assets/demo-carousel-1/banana.png';
import grape from '../../assets/demo-carousel-1/grape.png';
import pineapple from '../../assets/demo-carousel-1/pineapple.png';
import strawberry from '../../assets/demo-carousel-1/strawberry.png';

const { width } = Dimensions.get('window');

const HEIGHT = 200;
const WIDTH = width;
const elements = [
  {
    color: '#012638',
    title: 'Titre 1',
    image: apple,
  },
  {
    color: '#012b3f',
    title: 'Titre 2',
    image: banana,
  },
  {
    color: '#023047',
    title: 'Titre 3',
    image: grape,
  },
  {
    color: '#1b4459',
    title: 'Titre 4',
    image: pineapple,
  },
  {
    color: '#34596b',
    title: 'Titre 5',
    image: strawberry,
  },
];

const DemoCarousel1 = () => {
  const offset = useRef(new Animated.Value(0)).current;
  const [activePage, setActivePage] = useState(0);
  const pages = Array.from(Array(5).keys());
  const titleOffset = useRef(new Animated.Value(0)).current;
  const [title, setTitle] = useState(elements[0].title);

  useEffect(() => {
    updateText();
  }, [activePage]);

  const nextPage = async () => {
    if (activePage >= pages.length - 1) return;

    const newPage = activePage + 1;

    Animated.timing(offset, {
      toValue: -newPage * width,
      duration: 250,
      useNativeDriver: true,
    }).start();

    setActivePage(newPage);
  }

  const previousPage = async () => {
    if (activePage <= 0) return;

    const newPage = activePage - 1;

    Animated.timing(offset, {
      toValue: -newPage * width,
      duration: 250,
      useNativeDriver: true,
    }).start();

    setActivePage(newPage);
  }

  const updateText = () => {
    Animated.timing(titleOffset, {
      toValue: 20,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setTitle(elements[activePage].title);

      Animated.timing(titleOffset, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  }

  return (
    <View style={styles.container}>
      <View style={{ height: HEIGHT, width: WIDTH }}>
        <Animated.View style={[styles.background, { transform: [{ translateX: offset }] }]}>
          {elements.map((element) => (
            <View key={element.color} style={{ width: WIDTH, height: HEIGHT, backgroundColor: element.color }}>
              <Image style={{ height: 50, width: 50 }} source={element.image} />
            </View>
          ))}
        </Animated.View>
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

      <View style={{ backgroundColor: 'red', overflow: 'hidden' }}>
        <Animated.Text style={{ backgroundColor: 'gold', transform: [{ translateY : titleOffset }] }}>{title}</Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  background: {
    flexDirection: 'row',
    height: HEIGHT,
    width: WIDTH,
  },
});

export default DemoCarousel1;
