import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';

import { variables } from '../variables';

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
        duration: variables.ANIMATION_TIME,
        easing: Easing.bezier(0.5, 0, 0.75, 0),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(variables.ANIMATION_TIME / 6),
        Animated.timing(indicatorWidth, {
          toValue: 1.5,
          duration: variables.ANIMATION_TIME / 2,
          useNativeDriver: true,
        }),
        Animated.timing(indicatorWidth, {
          toValue: 1,
          duration: variables.ANIMATION_TIME / 2,
          useNativeDriver: true,
        })
      ]),
    ]).start();
  }

  const getOffset = () => {
    return ((activePage * 2 + 1) * (containerWidth / 2)) - (variables.DOT_SIZE / 2);
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
    height: variables.DOT_SIZE,
    width: variables.DOT_SIZE,
    borderRadius: variables.DOT_SIZE / 2,
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
