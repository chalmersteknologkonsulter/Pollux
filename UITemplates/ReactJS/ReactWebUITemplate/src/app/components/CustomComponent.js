import React, { useState } from 'react';

export default function CustomComponent(props) {
  const [button, setButton] = useState('');

  const onYesPress = () => {
    setButton('Yes');
    console.log({ button });
  };

  const onNoPress = () => {
    setButton('No');
    console.log({ button });
  };

  return (
    <div>
      <button onClick={() => props.onChange()}>{props.title}</button>
      <button onClick={() => onNoPress()}>No</button>
    </div>
  );
}
