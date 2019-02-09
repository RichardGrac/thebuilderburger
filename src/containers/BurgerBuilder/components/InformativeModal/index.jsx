import React from 'react'
import Button from '../../../../components/UI/Button'

const InformativeModal = (props) => {
    return (
        <div style={{textAlign: 'center'}}>
            <h2>Please log in</h2>
            <p>To continue purchasing this order, log in the application.</p>
            <div style={{margin: '0 auto'}}>
                <Button clicked={props.dismissModal} btnType='Danger'>Cancel</Button>
                <Button clicked={props.onContinue} btnType='Success'>Go to Login</Button>
            </div>
        </div>
    )
}

export default InformativeModal
