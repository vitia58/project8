import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Articles} from './Articles';
import {Article} from './Article';
import {CommentWidget} from './NewComment';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Articles"
        screenOptions={{
          headerTitleStyle: {alignSelf: 'center'},
          headerStyle: {backgroundColor: 'dodgerblue'},
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="Articles"
          component={Articles}
          options={{title: 'News'}}
        />
        <Stack.Screen name="Article" component={Article} />
        <Stack.Screen
          name="Comment"
          component={CommentWidget}
          options={{title: 'Adding comment'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
