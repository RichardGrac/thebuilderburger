import React, {Component} from 'react'
import Input from '../../components/UI/Input/input'
import Button from '../../components/UI/Button'
import * as Classes from './Auth.css'
import {connect} from 'react-redux'
import {auth, authStart, cleanAuthError} from '../../redux/Authentication/actions/auth'
import Modal from '../../components/UI/Modal'
import Spinner from '../../components/UI/Spinner'
import {CHECKOUT_URL, HOME_URL} from '../../utilities/constants'
// eslint-disable-next-line
const emailRegex = new RegExp(/^[-A-Z-a-z0-9~!$%^&*_=+}{\'?]+(\.[-A-Z-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/)

class Auth extends Component {

    constructor(props) {
        super(props)
        this.onHandleValue = this.onHandleValue.bind(this)
        this.onSubmitAuth = this.onSubmitAuth.bind(this)
    }

    state = {
        email: '',
        password: '',

        errorValidations: {
            email: [],
            password: []
        }
    }

    onHandleValue (e) {
        let { value, id, } = e.target
        let errors = []
        value = value.trim()

        switch (id) {
            case 'password':
                if (value.length < 7) {
                    errors = errors.concat('Password should be at least from 8 characters')
                }
                break

            case 'email':
                if (value.length < 1) {
                    errors = errors.concat('Email should not be empty')
                }
                if (!emailRegex.test(value)) {
                    errors = errors.concat('Invalid email')
                }
                break

            default:
                break
        }

        this.setState(prevState  => {
            return {
                [id]: value,
                errorValidations: {
                    ...prevState.errorValidations,
                    [id]: errors
                }
            }
        })
    }

    onSubmitAuth (e) {
        e.preventDefault()
        const {email, password, errorValidations } = this.state
        const { isSignIn, location } = this.props

        let continueSubmitting = email !== '' && password !== ''
        Object.values(errorValidations).forEach(validation => {
            validation.length !== 0 && (continueSubmitting = false)
        })

        if (!continueSubmitting) {
            window.alert('Invalid form, please check it')
            return
        }

        const redirectTo = location.hash === '#purchasing' ? CHECKOUT_URL : HOME_URL
        this.props.authStart()
        this.props.onAuth(email, password, isSignIn, redirectTo)
    }

    render() {
        const { email, password, errorValidations } = this.state
        const { isSignIn } = this.props

        return (
            <div>
                <div className={Classes.AuthHeader}>
                    <h2>{isSignIn ? 'SIGN IN' : 'SIGN UP'}</h2>
                    <hr />
                </div>

                <form className={Classes.AuthForm}
                      onSubmit={this.onSubmitAuth}
                >
                    <Input inputType='input'
                           type='email'
                           placeholder='Type your email'
                           id='email'
                           value={email}
                           label='Email'
                           onChange={this.onHandleValue}
                           invalidInput={errorValidations.email.length > 0}
                    />
                    {errorValidations.email.length > 0 ? (
                        <div className={Classes.ErrorMessage}>
                            {errorValidations.email.map((error, i) => (
                                <span key={i}>{error}</span>
                            ))}
                        </div>
                    ) : null}

                    <Input inputType='input'
                           type='password'
                           placeholder='Type your password'
                           id='password'
                           value={password}
                           label='Password'
                           onChange={this.onHandleValue}
                           invalidInput={errorValidations.password.length > 0}
                    />
                    {errorValidations.password.length > 0 ? (
                        <div className={Classes.ErrorMessage}>
                            {errorValidations.password.map((error, i) => (
                                <span key={i}>{error}</span>
                            ))}
                        </div>
                    ) : null}

                    <Button btnType='Success'>
                        SUBMIT
                    </Button>
                </form>

                {this.props.loading && <Spinner />}
                <Modal show={this.props.authError} dismiss={this.props.cleanAuthError}>
                    <p>An error occurred while trying to {isSignIn ? 'Sign In' : 'Sign Up'}. Please try with different credentials.</p>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authError: state.authReducer.authError,
        loading: state.authReducer.loading,
        isLogged: state.authReducer.tokenId !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignIn, redirectTo) => dispatch(auth(email, password, isSignIn, redirectTo)),
        cleanAuthError: () => dispatch(cleanAuthError()),
        authStart: () => dispatch(authStart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)