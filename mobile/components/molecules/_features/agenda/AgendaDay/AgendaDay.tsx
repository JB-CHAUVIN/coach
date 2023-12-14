import React from 'react';
import { View, Text } from 'react-native';
import { s } from './AgendaDay.styles';
import { AgendaDayProps } from './AgendaDay.props';

const AgendaDay: React.FC<AgendaDayProps> = p => {
  const { day, item } = p || {};
console.log(day, item);
  return (
    <View>
      <Text>{day.toString()}</Text>
    </View>
  );
};

export { AgendaDay };
