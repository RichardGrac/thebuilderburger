import {authReducer} from './auth'
import {HOME_URL} from '../../../utilities/constants'

describe('Auth reducer', () => {

    const initialState = {
        authError: null,
        tokenId: null,
        userId: null,
        loading: false,
        redirectTo: HOME_URL
    }

    it('Should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(initialState)
    })

    const action = {
        type: 'AUTH_SUCCESS',
        authData: {
            idToken: 'some-token',
            localId: 'some-user-id'
        },
        redirectTo: '/'
    }

    test('Should store the token upon login', () => {
        expect(authReducer(initialState, action)).toEqual({
            authError: null,
            tokenId: 'some-token',
            userId: 'some-user-id',
            loading: false,
            redirectTo: '/'
        })
    })
})