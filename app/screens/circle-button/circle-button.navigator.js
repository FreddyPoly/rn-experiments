import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CircleNutton from './index';

const Stack = createStackNavigator();

export default function CircleButtonNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CircleNutton"
        options={{
          headerShown: false,
        }}
        component={CircleNutton}
      />
    </Stack.Navigator>
  );
}
