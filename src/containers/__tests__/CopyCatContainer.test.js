import { CopyCatContainer } from '../CopyCatContainer'
import 'regenerator-runtime'

//  Make all the imports below
import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // get DOM specific matcher methods from jest-dom module
import  userEvent from '@testing-library/user-event'; // get userEvent object to mimick user interactions
import { forOfStatement } from '@babel/types';

test('Should display copied text', () => {
// Write your solution to task 9 within this test
// test app render user input below cat image whenever user types.
    render(<CopyCatContainer />); //parent will contain all elements rendered in child - CopyCat
    // extract input
    const input = screen.getByRole('textbox');
    // simulate userEvent - typing into input.
    userEvent.type(input, 'Hello World!');
    // extract the paragraph below image 
    const paragraph = screen.getByText('Hello World!'); 
    // Q. queryByText also works. why not use queryByX which seems more flexible all the time? 
    // A. In case the paragraph is not there, expect(null).toBeInTheDocument();  would not work! //received value must be an HTMLElement or an SVGElement.
    // lesson is query has to sync with jest-dom matcher

    // test expectation
    expect(paragraph).toBeInTheDocument();

})

test('Should remove copied text after removing tape', async() => {
// Write your solution to task 11 within this test
// tests whether the user input disappears when the user clicks on the cat image and sets it to the 'quietcat' state. In two parts.
// Part 1, check whether text is in paragraph after typing into input.
    render(<CopyCatContainer/>);
    // grab and type into input
    const input = screen.getByRole('textbox');
    userEvent.type(input,'My mouth is shut');
    // grab and assert the paragraph is in DOM
    const paragraph = screen.getByText('My mouth is shut');
    expect(paragraph).toBeInTheDocument();

// part 2. check whether paragraph disappears after typing into input. 
    // extract cat image
    const image = screen.getByAltText('copycat') // alt text based on isCopying state whose default is true;
    // simulate clicking on cat image.
    userEvent.click(image);
    await waitFor(()=>{
        // wait for the async expect() to pass test
        // previously established this paragraph was in DOM, so when it vanishes. we know it was because of the image click.
        const paragraph = screen.queryByText('My mouth is shut');
        expect(paragraph).toBeNull(); 
    })

})

test('Should display copied text after removing tape', () => {
// Write your solution to tasks 12-13 within this test


})

