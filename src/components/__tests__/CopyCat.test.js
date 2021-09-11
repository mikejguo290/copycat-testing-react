import { CopyCat } from '../CopyCat'

//  Make all the imports below
import React from 'react'; //need React from the react package in order to use JSX syntax in our tests
import { render , screen } from '@testing-library/react';
import "@testing-library/jest-dom"; // import the entire jest-dom module to get the matcher methods.




test('Should display name', () => {
// Write your solution to tasks 3-4 within this test

    // in order to render a component, one must pass props to it.
    render(
        <CopyCat 
            name='Mack' 
            value='' 
            handleChange={()=>{}} 
            toggleTape={()=>{}} 
            isCopying={true}
        />
    );
    screen.getByText('Copy Cat Mack');
})

test('Should display input text in paragraph when isCopying is set to true', () => {
// Write your solution to tasks 5-6 within this test
    render(
        <CopyCat 
            value="Here is an input",
            handleChange={()=>{}} 
            toggleTape={()=>{}} 
            isCopying={true}
        />
    );
})

test('Should not display input text in paragraph when isCopying is set to false', () => {
// Write your solution to task 7 within this test


})

