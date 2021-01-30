import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet, Dimensions} from 'react-native';
import styled from 'styled-components';
const width = Dimensions.get('window').width;
type AddedProps = {
  correct: boolean;
};
interface ComponentProps {
  name: string;
  isCorrect: boolean;
  onChange: any;
  maxLength: any;
  multiline: boolean;
}
const StyledField = styled(TextInput)<AddedProps>`
  fontSize: ${() => (width < 1000 ? 14 : width < 2000 ? 18 : 22)};
  flex: 5;
  borderColor: ${(props) => (props.correct ? 'limegreen' : 'red')};
  color: #004;
  borderRadius: 5;
  borderWidth: 1;
  marginLeft: 5;
  maxHeight: 160;
`;
export class FieldComponent extends Component<ComponentProps> {
  render() {
    let {name, isCorrect, onChange, maxLength, multiline} = this.props;
    return (
      <View style={styles.Row}>
        <Text style={stylestext.Text}>{name}</Text>
        <StyledField
          multiline={multiline}
          correct={isCorrect}
          placeholder={name}
          onChangeText={(text: string) => {
            if (text.length < maxLength) {
              onChange(text);
            }
          }}
        />
      </View>
    );
  }
}
const stylestext = StyleSheet.create({
  Text: {
    flex: width < 1000 ? 1.6 : width < 2000 ? 1.4 : 1,
    fontSize: width < 1000 ? 14 : width < 2000 ? 18 : 22,
    color: '#08F',
    textAlignVertical: 'center',
    textAlign: 'right',
    marginHorizontal: width < 2000 ? 0 : 5,
  },
});
const styles = StyleSheet.create({
  Row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
