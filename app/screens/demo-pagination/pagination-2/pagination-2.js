import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

import { variables } from '../variables';

import Dot2 from './dot-2';

const Pagination2 = ({ activePage, pages }) => {
  const leftOffset = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    animateIndicator();
  }, [containerWidth, activePage]);

  const animateIndicator = () => {
    Animated.timing(leftOffset, {
      toValue: getOffset(),
      duration: variables.ANIMATION_TIME,
      useNativeDriver: true,
    }).start();
  }

  const getOffset = () => {
    return ((activePage * 2 + 1) * (containerWidth / 2)) - (variables.DOT_SIZE / 2);
  }

  return (
    <View
      style={styles.container}
      onLayout={(event) => setContainerWidth(event.nativeEvent.layout.width / pages.length)}>
      <Animated.View style={[styles.indicator, { transform: [{ translateX: leftOffset }] }]} />

      <View style={styles.dotsContainer}>
        {pages.map((_, index) => (
          <Dot2 key={index} active={index === activePage} />
        ))}
      </View>
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

export default Pagination2;
