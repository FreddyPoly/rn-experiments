import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DemoCarousel1 from './index';

const Stack = createStackNavigator();

export default function DemoCarousel1Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DemoCarousel1"
        options={{
          headerShown: false,
        }}
        component={DemoCarousel1}
      />
    </Stack.Navigator>
  );
}
