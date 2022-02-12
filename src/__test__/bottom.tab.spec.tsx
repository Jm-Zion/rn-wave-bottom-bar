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
            tabBarInactiveTintColor: 'white',
          }}
          tabBar={(props) => <FabTabBar mode="default" {...props} />}
        >
          <Tab.Screen
            options={{ tabBarIcon, tabBarLabel: 'Home' }}
            name="Home"
            component={() => (
              <View>
                <Text>Home</Text>
              </View>
            )}
          />
          <Tab.Screen
            options={{ tabBarIcon, tabBarLabel: 'Settings' }}
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
  it('Should render', () => {
    const tree = renderer.create(
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: 'purple',
            tabBarInactiveTintColor: 'white',
          }}
          tabBar={(props: any) => (
            <FabTabBar mode="square" color="purple" {...props} />
          )}
        >
          <Tab.Screen
            options={{ tabBarIcon, tabBarLabel: 'Home' }}
            name="Home"
            component={() => (
              <View>
                <Text>Home</Text>
              </View>
            )}
          />
          <Tab.Screen
            options={{ tabBarIcon, tabBarLabel: 'Settings' }}
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
