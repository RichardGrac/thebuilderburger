import React from 'react'
import Classes from './Order.css'

const Order = (props) => {
    const {ingredients, price} = props.order

    let items = []
    for(let ingredient in ingredients) {
        items.push(ingredient + ' (' + ingredients[ingredient] + ')')
    }

    const tagStyle = {
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '8px',
        borderRadius: '3px',
        cursor: 'pointer'
    }

    return (
        <div className={Classes.Order}>
            <p>
                Ingredients:
                {items.map((item, i) => {
                    return <span style={tagStyle} key={i}>{item}</span>
                })}
            </p>
            <p>Price: <strong>USD ${price.toFixed(2)}</strong></p>
        </div>
    )
}

export default Order
