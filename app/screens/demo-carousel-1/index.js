import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Image } from 'react-native';

import episode1 from '../../assets/demo-carousel-1/episode-1.jpg';
import episode2 from '../../assets/demo-carousel-1/episode-2.png';
import episode3 from '../../assets/demo-carousel-1/episode-3.jpg';
import episode4 from '../../assets/demo-carousel-1/episode-4.jpg';
import episode5 from '../../assets/demo-carousel-1/episode-5.jpg';
import episode6 from '../../assets/demo-carousel-1/episode-6.jpg';

const { width } = Dimensions.get('window');

const ANIM_TIME = 450;
const WIDTH = width;
const elements = [
  {
    title: 'Episode 1',
    subtitle: 'Lorem ipsum',
    image: episode1,
    backgroundText: 'I',
  },
  {
    title: 'Episode 2',
    subtitle: 'Lorem ipsum',
    image: episode2,
    backgroundText: 'II',
  },
  {
    title: 'Episode 3',
    subtitle: 'Lorem ipsum',
    image: episode3,
    backgroundText: 'III',
  },
  {
    title: 'Episode 4',
    subtitle: 'Lorem ipsum',
    image: episode4,
    backgroundText: 'IV',
  },
  {
    title: 'Episode 5',
    subtitle: 'Lorem ipsum',
    image: episode5,
    backgroundText: 'V',
  },
  {
    title: 'Episode 6',
    subtitle: 'Lorem ipsum',
    image: episode6,
    backgroundText: 'VI',
  },
];

const DemoCarousel1 = () => {
  const offset = useRef(new Animated.Value(0)).current;
  const [activePage, setActivePage] = useState(0);
  const pages = Array.from(Array(elements.length).keys());
  const titleOffset = useRef(new Animated.Value(0)).current;
  const [title, setTitle] = useState(elements[0].title);
  const [subtitle, setSubtitle] = useState(elements[0].subtitle);
  const backgroundTextOpacity = useRef(new Animated.Value(1)).current;
  const [backgroundText, setBackgroundText] = useState(elements[0].backgroundText);

  useEffect(() => {
    updateText();
  }, [activePage]);
  
  useEffect(() => {
    Animated.timing(backgroundTextOpacity, {
      toValue: 1,
      duration: ANIM_TIME / 2,
      useNativeDriver: false,
    }).start();
  }, [backgroundText]);

  const nextPage = async () => {
    if (activePage >= pages.length - 1) return;

    const newPage = activePage + 1;

    Animated.parallel([
      Animated.timing(offset, {
        toValue: -newPage * width,
        duration: ANIM_TIME,
        useNativeDriver: false,
      }),
      Animated.timing(backgroundTextOpacity, {
        toValue: 0,
        duration: ANIM_TIME / 2,
        useNativeDriver: false,
      })
    ]).start(() => {
      setBackgroundText(elements[newPage].backgroundText);
    });

    setActivePage(newPage);
  }

  const previousPage = async () => {
    if (activePage <= 0) return;

    const newPage = activePage - 1;

    Animated.parallel([
      Animated.timing(offset, {
        toValue: -newPage * width,
        duration: ANIM_TIME,
        useNativeDriver: false,
      }),
      Animated.timing(backgroundTextOpacity, {
        toValue: 0,
        duration: ANIM_TIME / 2,
        useNativeDriver: false,
      })
    ]).start(() => {
      setBackgroundText(elements[newPage].backgroundText);
    });

    setActivePage(newPage);
  }

  const updateText = () => {
    Animated.timing(titleOffset, {
      toValue: 30,
      duration: ANIM_TIME,
      useNativeDriver: true,
    }).start(() => {
      setTitle(elements[activePage].title);
      setSubtitle(elements[activePage].subtitle);

      Animated.timing(titleOffset, {
        toValue: 0,
        duration: ANIM_TIME,
        useNativeDriver: true,
      }).start();
    });
  }

  const color = offset.interpolate({
    inputRange: [-5 * width, -4 * width, -3 * width, -2 * width, -width, 0],
    outputRange: ['#cb997e', '#e76f51', '#f4a261', '#e9c46a', '#2a9d8f', '#264653']
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.absoluteBackground, { backgroundColor: 'white' }]} />

      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', width: WIDTH }}>
        <Animated.Text style={{ position: 'absolute', fontSize: width * 1, color: 'rgba(37, 37, 37, .3)', opacity: backgroundTextOpacity }}>{backgroundText}</Animated.Text>

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
