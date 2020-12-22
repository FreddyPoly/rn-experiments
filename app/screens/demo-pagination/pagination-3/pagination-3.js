import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import MaskedView from '@react-native-community/masked-view';

import { variables } from '../variables';

import Dot3 from './dot-3';

const Pagination3 = ({ activePage, pages }) => {
  const leftOffset = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    animateIndicator();
  }, [containerWidth, activePage]);

  const animateIndicator = () => {
    Animated.timing(leftOffset, {
      toValue: getOffset(),
      duration: variables.ANIMATION_TIME,
      Easing: Easing.bezier(.32,-0.16,.41,.17),
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
      <MaskedView
        style={styles.maskedView}
        maskElement={
          <View style={styles.maskedContainer}>
            {pages.map((_, index) => (
              <Dot3 key={index} />
            ))}
          </View>
        }
      >
        <Animated.View style={[styles.indicator, { transform: [{ translateX: leftOffset }] }]} />
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  maskedView: {
    width: '100%',
    height: variables.DOT_SIZE,
    backgroundColor: variables.COLOR_INACTIVE,
  },
  maskedContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default Pagination3;
