import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, Image } from 'react-native';

import episode1 from '../../assets/demo-carousel-1/episode-1.jpg';
import episode2 from '../../assets/demo-carousel-1/episode-2.png';
import episode3 from '../../assets/demo-carousel-1/episode-3.jpg';
import episode4 from '../../assets/demo-carousel-1/episode-4.jpg';
import episode5 from '../../assets/demo-carousel-1/episode-5.jpg';
import episode6 from '../../assets/demo-carousel-1/episode-6.jpg';

import grain from '../../assets/demo-carousel-1/white-wall.jpg';

const { height, width } = Dimensions.get('window');

const ANIM_TIME = 450;
const WIDTH = width;
const elements = [
  {
    title: 'Episode 1',
    image: episode1,
    backgroundText: 'I',
  },
  {
    title: 'Episode 2',
    image: episode2,
    backgroundText: 'II',
  },
  {
    title: 'Episode 3',
    image: episode3,
    backgroundText: 'III',
  },
  {
    title: 'Episode 4',
    image: episode4,
    backgroundText: 'IV',
  },
  {
    title: 'Episode 5',
    image: episode5,
    backgroundText: 'V',
  },
  {
    title: 'Episode 6',
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
      toValue: 60,
      duration: ANIM_TIME,
      useNativeDriver: true,
    }).start(() => {
      setTitle(elements[activePage].title);

      Animated.timing(titleOffset, {
        toValue: 0,
        duration: ANIM_TIME,
        useNativeDriver: true,
      }).start();
    });
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.absoluteBackground, { backgroundColor: '#fffef3' }]} />
      <Image style={{ position: 'absolute', height: height, width: width, resizeMode: 'cover', opacity: .15 }} source={grain} />

        <View style={{ position: 'absolute', top: 7, bottom: 0, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Animated.Text style={{ textAlign: 'center', fontSize: width * 0.8, lineHeight: width, color: 'rgba(88, 88, 88, .2)', opacity: backgroundTextOpacity, fontFamily: 'PlayfairDisplay-Bold' }}>{backgroundText}</Animated.Text>
        </View>

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
          <Animated.Text style={{ fontSize: 48, transform: [{ translateY : titleOffset }],  fontFamily: 'PlayfairDisplay-Bold', textTransform: 'uppercase', color: '#262626' }}>{title}</Animated.Text>
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
