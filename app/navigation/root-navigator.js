import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack from './home-stack';
import DemoPaginationNavigator from '../screens/demo-pagination/demo-pagination.navigator';
import DemoCarousel1 from '../screens/demo-carousel-1/demo-carousel-1.navigator';
import CircleButton from '../screens/circle-button/circle-button.navigator';

const Drawer = createDrawerNavigator();

function RootNavigator() {
  return (
    <Drawer.Navigator initialRouteName="CircleButton">
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="DemoPaginationNavigator" component={DemoPaginationNavigator} />
      <Drawer.Screen name="DemoCarousel1" component={DemoCarousel1} />
      <Drawer.Screen name="CircleButton" component={CircleButton} />
    </Drawer.Navigator>
  );
}

export default RootNavigator;
