import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

const HEIGHT = 200;
const WIDTH = 150;
const elements = [
  {
    color: 'blue',
    title: 'Titre 1',
  },
  {
    color: 'red',
    title: 'Titre 1',
  },
  {
    color: 'yellow',
    title: 'Titre 1',
  },
];

const DemoCarousel1 = () => {
  const [activePage, setActivePage] = useState(0);

  const onScrollEndDrag = (data) => {
    console.log(`data : ${JSON.stringify(data.nativeEvent)}`);
    console.log(`-- page : ${data.nativeEvent.contentOffset.x} / ${WIDTH / 2} = ${data.nativeEvent.contentOffset.x % (WIDTH / 2)}`);

    setActivePage(data.nativeEvent.contentOffset.x / WIDTH / 2);
  };

  return (
    <View style={styles.container}>
      <View style={{ height: HEIGHT, width: WIDTH }}>
        <ScrollView
          style={{ flex: 1 }}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onScrollEndDrag={onScrollEndDrag}>
          {elements.map((element, index) => (
            <View key={index} style={{ backgroundColor: element.color, height: HEIGHT, width: WIDTH }} />
          ))}
        </ScrollView>
      </View>

      <Text>Page {activePage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default DemoCarousel1;
