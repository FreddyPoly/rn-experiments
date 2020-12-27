import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeStack from './home-stack';
import DemoPaginationNavigator from '../screens/demo-pagination/demo-pagination.navigator';
import DemoCarousel1 from '../screens/demo-carousel-1/demo-carousel-1.navigator';

const Drawer = createDrawerNavigator();

function RootNavigator() {
  return (
    <Drawer.Navigator initialRouteName="DemoCarousel1">
      <Drawer.Screen name="HomeStack" component={HomeStack} />
      <Drawer.Screen name="DemoPaginationNavigator" component={DemoPaginationNavigator} />
      <Drawer.Screen name="DemoCarousel1" component={DemoCarousel1} />
    </Drawer.Navigator>
  );
}

export default RootNavigator;
