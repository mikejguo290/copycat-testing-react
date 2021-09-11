import React from 'react';
import PropTypes from 'prop-types';
import { styles } from '../styles';

const images = {
  copycat: 'https://content.codecademy.com/courses/React/react_photo_copycat.png',
  quietcat: 'https://content.codecademy.com/courses/React/react_photo_quietcat.png'
};

export const CopyCat = ({name, value, handleChange, isCopying, toggleTape}) => {
    // copyCat is a controlled component. it takes a prop. it displays a heading, input and an image. 
    // isCopying - a state to record whether cat is Copying cat or not. if true, copied text of input will be displayed below image.
    // toggleTape - a function to flip the isCopying state - quietCat & copyCat (after 0.5 seconds), attacheced to onClick handler for cat image.
    // handleChange - updates input in CopyCatContainer.js, attached to onChange handler for input
  return (
    <div style={styles.divStyles}>
      <h1 style={{ marginBottom: 80 }}>Copy Cat {name || 'Tom'}</h1>
      <input
        type="text"
        value={value}
        onChange={handleChange} 
      />
      <img 
        alt= {isCopying ? 'copycat': 'quietcat'}
        src={isCopying ? images.copycat : images.quietcat}
        style={styles.imgStyles}
        onClick={toggleTape}
        data-testid="cat-image"
      />
      <p data-testid="copied-text">{isCopying && value}</p>
    </div>
  );
}