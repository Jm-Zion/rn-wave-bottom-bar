import React from 'react';
import { Text, View } from 'react-native';
import * as renderer from 'react-test-renderer';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { FabTabBar } from '../components/bottom.tab';

const tabBarIcon = (props: any) => <View {...props} />;
const Tab = createBottomTabNavigator();

describe('FabTabBar', () => {
  it('Should render', () => {
    const tree = renderer.create(
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'purple',
          }}
          tabBar={(props: any) => <FabTabBar color="purple" {...props} />}
        >
          <Tab.Screen
            options={{ tabBarIcon }}
            name="Home"
            component={() => (
              <View>
                <Text>Home</Text>
              </View>
            )}
          />
          <Tab.Screen
            options={{ tabBarIcon }}
            name="Home"
            component={() => (
              <View>
                <Text>Settings</Text>
              </View>
            )}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
