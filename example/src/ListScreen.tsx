import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;

export function SettingsScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginBottom: -50,
        }}>
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
      </ScrollView>
    </SafeAreaView>
  );
}
