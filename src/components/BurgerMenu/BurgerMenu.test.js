import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme'

import { BurgerMenu } from './BurgerMenu';
import Controls from './Controls/Controls';

configure({adapter: new Adapter()});

describe('<BurgerMenu />', () => {

    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<BurgerMenu getIngredients={() => {}} setBuilt={()=> {}} />)
    })
    
    it('should render Controls when receiving ingredients', ()=>{
        wrapper.setProps({ingredients: {salad: 1}, price: 0})
        expect(wrapper.find(Controls)).toHaveLength(1)
    })
});