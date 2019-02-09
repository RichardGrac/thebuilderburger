import React from 'react'
import Classes from './Order.css'

const Order = (props) => {
    const {ingredients, price, date} = props.order

    let items = []
    for(let ingredient in ingredients) {
        items.push(ingredient + ' (' + ingredients[ingredient] + ')')
    }

    const tagStyle = {
        margin: '3px 8px',
        border: '1px solid #ccc',
        padding: '8px',
        borderRadius: '3px',
        cursor: 'pointer',
        display: 'inline-block'
    }

    return (
        <div className={Classes.Order}>
            <p>
                Date: {new Date(date).toLocaleDateString('en-US')}
            </p>
            <div>
                Ingredients:
                {items.map((item, i) => {
                    return <div style={tagStyle} key={i}>{item}</div>
                })}
            </div>
            <p>Price: <strong>USD ${price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
