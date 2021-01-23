import React, { useEffect, useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

import cloud from '../../assets/circle-button/cloud.png';
import home from '../../assets/circle-button/home.png';
import insert from '../../assets/circle-button/insert.png';
import search from '../../assets/circle-button/search.png';
import settings from '../../assets/circle-button/settings.png';
const images = [cloud, home, insert, search, settings];

import { SIZE } from './index';
const SIZE_BUTTONS = 10;
const ANIM_TIME = 150;

const IconButton = ({ index, rotation, rad }) => {
  if (!SIZE || !rotation || !rad) return null;
  
  const scale = useRef(new Animated.Value(1)).current;

  const press = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: .75,
        duration: ANIM_TIME,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: ANIM_TIME,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        position: 'absolute',
        borderRadius: SIZE_BUTTONS / 2,
        top: (SIZE / 2 - SIZE_BUTTONS / 2) + (SIZE / 2 - SIZE_BUTTONS / 2 * 2) * Math.sin(rad),
        left: (SIZE / 2 - SIZE_BUTTONS / 2) + (SIZE / 2 - SIZE_BUTTONS / 2 * 2) * Math.cos(rad),
        transform: [
          { scale: scale },
        ],
      }}
      hitSlop={{ top: 3, right: 3, bottom: 3, left: 3 }}
      onPress={press}
    >
      <Animated.Image
        source={images[index]}
        style={{
          width: SIZE_BUTTONS,
          height: SIZE_BUTTONS,
          resizeMode: 'contain',
          transform: [
            { rotate: rotation },
          ],
        }} />
    </TouchableOpacity>
  );
};

export default IconButton;
