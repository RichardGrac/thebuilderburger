import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BurgerBuilder from './index'
import BuildControls from '../../components/Burger/components/BuildControls'

configure({ adapter: new Adapter() })

describe(`<BurgerBuilder />`, () => {
    let wrapper
    const ingredients = {
        salad: 1,
        meat: 1,
        bacon: 1,
        cheese: 1
    }

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder
            onFetchInitialIngredients={() => {}} />)
    })

    it('Should contain one set of <BuildControls />', () => {
        wrapper.setProps({ingredients})
        expect(wrapper.find(BuildControls)).toBeTruthy()
    })
})