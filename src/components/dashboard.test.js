import React from 'react';
import { shallow, mount } from 'enzyme';

import { Dashboard } from './dashboard';


describe('<Dashboard />', () => {
    it('Renders without crashing', () => {
        shallow(<Dashboard  />);
    });

    // it('Renders the title', () => {
    //     const title = 'See what people are saying about the match:';
    //     const wrapper = shallow(<CommentForm comments={[]} dispatch={() => {}} />);
    //     expect(wrapper.contains(<h3>{title}</h3>)).toEqual(true);
    // });
});