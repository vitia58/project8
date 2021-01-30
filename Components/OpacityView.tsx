import styled from 'styled-components';
//import React from 'react';
import {View} from 'react-native';
type AddedProps = {
  visible: boolean;
};
export const OpacityView = styled(View)<AddedProps>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
`;
