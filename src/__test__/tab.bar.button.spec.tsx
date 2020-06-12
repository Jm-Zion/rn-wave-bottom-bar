import React from 'react';
import { View } from 'react-native';
import * as renderer from 'react-test-renderer';

import { BarButton, TabBarButton } from '../components/tab.bar.button';

const tabBarIcon = (props: any) => <View {...props} />;

describe('TabBarButton', () => {
  it("Should render well when it's Focus", () => {
    const tree = renderer.create(
      <BarButton
        index={0}
        isFocused
        options={{ tabBarIcon }}
        onPress={jest.fn()}
        onLongPress={jest.fn()}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('Should render well it is not focused', () => {
    const tree = renderer.create(
      <BarButton
        index={0}
        isFocused={false}
        options={{ tabBarIcon }}
        onPress={jest.fn()}
        onLongPress={jest.fn()}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it("Should render well when it's Focus", () => {
    const tree = renderer.create(
      <TabBarButton
        index={0}
        isFocused
        options={{ tabBarIcon }}
        onPress={jest.fn()}
        onLongPress={jest.fn()}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('Should render well it is not focused', () => {
    const tree = renderer.create(
      <TabBarButton
        index={0}
        isFocused={false}
        options={{ tabBarIcon }}
        onPress={jest.fn()}
        onLongPress={jest.fn()}
      />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
