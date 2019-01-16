import React from 'react'
import Burger from '../../Burger'
import Button from '../../UI/Button'
import './CheckoutSummary.css'

const CheckoutSummary = (props) => {
    return (
        <div className='CheckoutSummary'>
            <h1 style={{textAlign: 'center'}}>We hope it tastes well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>

            <div style={{textAlign: 'center'}}>
                <Button btnType='Danger' clicked={props.onCancelled}>
                    CANCEL
                </Button>
                <Button btnType='Success' clicked={props.continuePurchase}>
                    CONTINUE
                </Button>
            </div>
        </div>
    )
}

export default CheckoutSummary
