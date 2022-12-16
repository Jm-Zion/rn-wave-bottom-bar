import React from 'react';
import { View } from 'react-native';
import * as renderer from 'react-test-renderer';
import {
  withReanimatedTimer,
  advanceAnimationByTime,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from 'react-native-reanimated/lib/reanimated2/jestUtils';

import { BarButton, TabBarButton } from '../components/tab.bar.button';

const tabBarIcon = (props: any) => <View {...props} />;

describe('TabBarButton', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  it("Should render well when it's Focus", () => {
    withReanimatedTimer(() => {
      const tree = renderer.create(
        <BarButton
          mode="default"
          index={0}
          isFocused
          options={{ tabBarIcon }}
          onPress={jest.fn()}
          onLongPress={jest.fn()}
        />
      );
      advanceAnimationByTime(500);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
  it('Should render well it is not focused', () => {
    withReanimatedTimer(() => {
      const tree = renderer.create(
        <BarButton
          mode="default"
          index={0}
          isFocused={false}
          options={{ tabBarIcon }}
          onPress={jest.fn()}
          onLongPress={jest.fn()}
        />
      );
      advanceAnimationByTime(500);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
  it("Should render well when it's Focus", () => {
    withReanimatedTimer(() => {
      const tree = renderer.create(
        <TabBarButton
          mode="default"
          index={0}
          isFocused
          options={{ tabBarIcon }}
          onPress={jest.fn()}
          onLongPress={jest.fn()}
        />
      );
      advanceAnimationByTime(500);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
  it('Should render well it is not focused', () => {
    withReanimatedTimer(() => {
      const tree = renderer.create(
        <TabBarButton
          mode="default"
          index={0}
          isFocused={false}
          options={{ tabBarIcon }}
          onPress={jest.fn()}
          onLongPress={jest.fn()}
        />
      );
      advanceAnimationByTime(500);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
  it('Should render well it is not focused', () => {
    withReanimatedTimer(() => {
      const tree = renderer.create(
        <TabBarButton
          mode="square"
          index={0}
          isFocused={false}
          options={{ tabBarIcon }}
          onPress={jest.fn()}
          onLongPress={jest.fn()}
        />
      );
      advanceAnimationByTime(500);
      expect(tree.toJSON()).toMatchSnapshot();
    });
  });
});
