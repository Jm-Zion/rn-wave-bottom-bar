import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Avatar, Button, Card} from 'react-native-paper';
import {useSafeArea} from 'react-native-safe-area-context';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

export function SettingsScreen() {
  const {top} = useSafeArea();
  return (
    <View style={{flex: 1, marginTop: top}}>
      <ScrollView>
        <View>
          <Card elevation={5} style={{margin: 5}}>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
          <Card elevation={5} style={{margin: 5}}>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
          <Card elevation={5} style={{margin: 5}}>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
          <Card elevation={5} style={{margin: 5}}>
            <Card.Title
              title="Card Title"
              subtitle="Card Subtitle"
              left={LeftContent}
            />
            <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        </View>
        {/* -> Set bottom view to allow scrolling to top if you set bottom-bar position absolute */}
        <View style={{height: 90}} />
      </ScrollView>
    </View>
  );
}
