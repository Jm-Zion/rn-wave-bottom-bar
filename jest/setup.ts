// eslint-disable-next-line @typescript-eslint/no-var-requires
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

jest.mock('@react-navigation/bottom-tabs', () => {
  return {
    createBottomTabNavigator: () => ({
      Navigator: 'Navigator',
      Screen: 'Screen',
    }),
  };
});
