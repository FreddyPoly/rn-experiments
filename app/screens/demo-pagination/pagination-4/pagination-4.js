import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Easing, Text } from 'react-native';

import { DOT_SIZE, ANIMATION_TIME } from '../index';

import Dot4 from './dot-4';

const Pagination4 = ({ activePage, pages }) => {
  const leftOffset = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(1)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    animateIndicator();
  }, [containerWidth, activePage]);

  const animateIndicator = () => {
    Animated.parallel([
      Animated.timing(leftOffset, {
        toValue: getOffset(),
        duration: ANIMATION_TIME,
        Easing: Easing.bezier(.32,-0.16,.41,.17),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(indicatorWidth, {
          toValue: 1.75,
          duration: ANIMATION_TIME / 2,
          Easing: Easing.bezier(.32,-0.16,.41,.17),
          useNativeDriver: true,
        }),
        Animated.timing(indicatorWidth, {
          toValue: 1,
          duration: ANIMATION_TIME / 2,
          Easing: Easing.bezier(.32,-0.16,.41,.17),
          useNativeDriver: true,
        })
      ]),
    ]).start();
  }

  const getOffset = () => {
    return ((activePage * 2 + 1) * (containerWidth / 2)) - (DOT_SIZE / 2);
  }

  return (
    <View
      style={styles.container}
      onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width / pages.length)}>
      <View style={styles.dotsContainer}>
        {pages.map((_, index) => (
          <Dot4 key={index} />
        ))}
      </View>
      
      <Animated.View style={[styles.indicator, { transform: [{ translateX: leftOffset }, { scaleX: indicatorWidth }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  indicator: {
    position: 'absolute',
    height: DOT_SIZE,
    width: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#de7200',
  },
  dotsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Pagination4;
