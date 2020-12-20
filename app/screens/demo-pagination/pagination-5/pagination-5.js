import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';

import { variables } from '../variables';

import Dot5 from './dot-5';

const Pagination5 = ({ activePage, pages }) => {
  const leftOffset = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(1)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    animateIndicator();
  }, [containerWidth, activePage]);

  const animateIndicator = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(indicatorWidth, {
          toValue: 50,
          duration: variables.ANIMATION_TIME / 2,
          useNativeDriver: false,
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
          <Dot5 key={index} />
        ))}
      </View>
      
      <Animated.View style={[styles.indicator, { width: indicatorWidth }]} />
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

export default Pagination5;
