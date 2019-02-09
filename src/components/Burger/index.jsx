import React from 'react';
import Classes from './Burger.css'
import Ingredient from './components/Ingredient'

const Burger = (props) => {
    // Becoming an object of ingredients to an array
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])]
                .map((_, i) => {
                    return <Ingredient
                        key={ingredientKey + i}
                        type={ingredientKey}/>
                })
        })
        // Let's quit all the ingredients with quantity = 0
        .reduce((previousValue, currentValue) => {
            return previousValue.concat(currentValue)
        }, [])

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please, start adding ingredients!</p>
    }

    return (
        <div className={Classes.Burger}>
            <Ingredient type='bread-top'/>
            {transformedIngredients}
            <Ingredient type='bread-bottom'/>
        </div>
    );
};

export default Burger;
