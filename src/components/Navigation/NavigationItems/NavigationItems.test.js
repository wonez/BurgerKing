import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem';

configure({
    adapter: new Adapter()    
});

describe('<NavigationItems />', () => {

    let wrapper;
    
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />);
    })

    it('should render two <NavigationItem /> elements when not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    });

    it('should render three <NavigationItem /> elements when authenticated', () => {
        wrapper = shallow(<NavigationItems auth/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    });
    it('should contain Logout elements when authenticated', () => {
        wrapper = shallow(<NavigationItems auth/>);
        expect(wrapper.contains(<NavigationItem to='/logout'>Logout</NavigationItem>)).toBeTruthy();
    });
});