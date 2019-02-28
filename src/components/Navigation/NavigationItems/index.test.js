import React from 'react'
import {configure, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './index'
import NavigationItem from './NavigationItem'
import {LOG_OUT} from '../../../utilities/constants'

configure({ adapter: new Adapter() })

describe(`<NavigationItems />`, () => {
    let wrapper
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })
    it(`should render three <NavigationItem /> element if not auth`, () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('Should render three NavigationItems if is auth', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('Logout only when auth', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(
            <NavigationItem link={LOG_OUT}>Logout</NavigationItem>
        )).toEqual(true)
    })
})