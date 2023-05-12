import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native';
import Colors from '../constants/Colors';

const DebouncedInput = ({ onChange, delay }) => {
  const [text, setText] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(text);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, onChange]);

  return (
    <TextInput style={{ fontSize: 18,color:Colors.WHITE, backgroundColor: "#1D1D1D",  width: '70%', margin: 5, borderRadius:15}}
      value={text}
      onChangeText={setText}
    />
  );
};

export default DebouncedInput;