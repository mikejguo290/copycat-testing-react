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
// Write your solution to task 11-12 within this test
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

test('Should display copied text after removing tape', async () => {
// Write your solution to tasks 13-14 within this test
// test whether the user input reappears when the tape is removed from the cat’s mouth. 
// part 1. click on copycat image and test to see if the quietcat image is rendered. 
    render(<CopyCatContainer />);
    // extract cat image
   let copyCatImage = screen.getByAltText('copycat');
    // simulate user click to set image to quietcat from copycat.
    userEvent.click(copyCatImage);
    // extract asynchronously the picture of quiet cat, toggleTap sets isCopying after 500 ms.
    let quietCatImage = await screen.findByAltText('quietcat') //no need to expect(quietCatImage).toBeInTheDocument. if it fails to find, will throw error.

// part 2. type into input and test the paragraph under the image isn't visible. 
    // extract input
    const input = screen.getByRole('textbox');
    // type into input 
    userEvent.type(input,'Eventually this will appear');
    // extract paragraph, not with waitFor, even though image change which affects paragraph is async, because we've already waited!   
    let paragraph = screen.queryByText('Eventually this will appear');
    // assert paragraph isn't in the DOM.
    expect(paragraph).toBeNull();

// part 3. click on quietcat image, and test for image turning back to copycat and presence of paragraph. 

    // simulate click to change image to copycat
    userEvent.click(quietCatImage);
    // assert image is reverted to copy cat - asynchronously (because it takes time for toggleTape to change quietCat to copycat)
    copyCatImage = await screen.findByAltText('copycat');
    // NOTE! findByX will not need to be followed by expect().toBeInTheDocument as failure to find cause error to be thrown.
    // get paragraph again
    paragraph = screen.getByText('Eventually this will appear');
    // assert paragraph is in the document.
    expect(paragraph).toBeInTheDocument(); 
});

