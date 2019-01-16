import React from 'react'
import * as Classes from './input.css'

const Input = props => {
    let {inputType, invalidInput, ...rest} = props
    let inputElement = null

    const style = invalidInput ? Classes.InvalidInput : Classes.InputElement

    switch (inputType) {
        case('input') :
            inputElement = <input className={style} {...rest} onChange={(e) => props.onChange(e)} />
            break
        case ('textarea'):
            inputElement = <textarea className={style} {...rest} onChange={(e) => props.onChange(e)} />
            break
        case ('select'):
            inputElement = (
                <select className={style} {...rest} onChange={(e) => props.onChange(e)}>
                    {props.options.map((option, i) => <option key={i} value={option}>{option}</option>)}
                </select>
            )
            break;
        default:
            inputElement = <input className={style} {...rest} onChange={(e) => props.onChange(e)} />
    }

    return (
        <div className={Classes.Input}>
            <label className={Classes.Label} htmlFor=''>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default Input