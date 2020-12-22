import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';

import { variables } from '../variables';

import Dot5 from './dot-5';

const Pagination5 = ({ activePage, pages }) => {
  const leftOffset = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(variables.DOT_SIZE)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const [lastPage, setLastPage] = useState(null);

  useEffect(() => {
    if (activePage > lastPage) {
      next();
    } else {
      previous();
    }

    setLastPage(activePage);
  }, [containerWidth, activePage]);

  const previous = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(indicatorWidth, {
          toValue: variables.DOT_SIZE + containerWidth,
          duration: variables.ANIMATION_TIME / 2,
          useNativeDriver: false,
        }),
        Animated.timing(leftOffset, {
          toValue: getOffset(),
          duration: variables.ANIMATION_TIME / 2,
          useNativeDriver: false,
        }),
      ]),
      Animated.timing(indicatorWidth, {
        toValue: variables.DOT_SIZE,
        duration: variables.ANIMATION_TIME / 2,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const next = () => {
    Animated.sequence([
      Animated.timing(indicatorWidth, {
        toValue: variables.DOT_SIZE + containerWidth,
        duration: variables.ANIMATION_TIME / 2,
        useNativeDriver: false,
      }),
      Animated.parallel([
        Animated.timing(indicatorWidth, {
          toValue: variables.DOT_SIZE,
          duration: variables.ANIMATION_TIME / 2,
          useNativeDriver: false,
        }),
        Animated.timing(leftOffset, {
          toValue: getOffset(),
          duration: variables.ANIMATION_TIME / 2,
          useNativeDriver: false,
        }),
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
      
      <Animated.View style={[styles.indicator, { transform: [{ translateX: leftOffset }], width: indicatorWidth }]} />
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
    backgroundColor: variables.COLOR_ACTIVE,
  },
  dotsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Pagination5;
