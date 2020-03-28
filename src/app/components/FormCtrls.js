import React from 'react'


export const RadioGroup = ({ className, name, values, onChange, state }) => {
    return (
        <>
            { values.map((value, i) =>
                <Radio key={"rad-" + i}
                    value={value}
                    className={className}
                    name={name}
                    state={state}
                    onChange={onChange}
                    label={value}
                />
            )}
        </>
    )
}

export const HoneyPot = (props) => {
    return (
        <div className={"screen" + (props.className || '')}>
            <label> Do not edit this field 
            <input
                name={props.name}
                type="email"
                placeholder="Confirm Email" 
                value={props.state[props.name]}
                onChange={props.onChange}
                required={props.required || true}
            />
             </label>
             <label> Keep this checkbox unchecked
                <input
                    id="check-ctrl"
                    type="checkbox"
                    name={props.name + 'Check'}
                    onChange={props.onChange}
                    checked={props.state[props.name + 'Check']}
                />
            </label>
        </div>
    )
}

export const Input = (props) => {
    return (
        <div className={"form-ctrlr " + (props.className || '')}>
            <label
                htmlFor={props.name}
                className={props.className ? props.className + '-label' : false}
            >
                {props.label || ''}
            </label>
            <input
                id={props.name}
                name={props.name}
                type={props.type || "text"}
                autoComplete="off"
                className={props.className ? `${props.className}-input ${props.type}` : false}
                value={props.state[props.name] || ''}
                placeholder={props.placeholder || ''}
                required={props.required || false}
                onChange={props.onChange}
            />
        </div>
    )
}

export const TextArea = (props) => {
    return (
        <div className={"form-ctrlr " + (props.className || '')}>
            <label
                htmlFor={props.name}
                className={props.className ? props.className + '-label' : false}
            >
                {props.label || ''}
            </label>
            <textarea
                id={props.name}
                name={props.name}
                value={props.state[props.name] || ''}
                onChange={props.onChange}
                type={props.type || "text"}
                required={props.required || false}
                className={props.className ? props.className + '-textarea' : false}
                placeholder={props.placeholder || ''}
            />
        </div>
    )
}

export const Select = (props) => {
    const hasOption = props.state[props.name] ? props.state[props.name].toLowerCase() !== props.name : false;
    
    return (
        <div className={"form-ctrlr " + (props.className || '')}>
            <label
                htmlFor={props.name}
                className={props.className ? props.className  + '-label' : false}
            >
                {props.label || ''}
            </label>

            <select
                id={props.name}
                name={props.name}
                value={props.state[props.name]}
                onChange={props.onChange}
                required={props.required || false}
                className={`${props.className}-select${hasOption ? " hasOption" : ''}`}
            >
                { props.placeholder &&
                    <option value="">{props.placeholder}</option>
                }
                {props.options.map((opt, i) =>
                    <option key={props.name + i} value={opt}>
                        {opt}
                    </option>
                )}
            </select>
        </div>
    )
}

export const Radio = (props) => {
    return (
        <div className={"form-ctrlr " + (props.className || '')}>
            <label
                className={props.className ? props.className + '-label' : false}
            >
                <input
                    type="radio"
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    checked={props.state[props.name] === props.value}
                    className={props.className ? props.className + '-radio' : false}
                />
                {props.label || ''}
            </label>
        </div>
    )
}

export const Check = (props) => {
    return (
        <div className={"form-ctrlr " + (props.className || '')}>
            <label
                className={props.className ? props.className + '-label' : false}
            >
                <input
                    id="check-ctrl"
                    type="checkbox"
                    name={props.name}
                    onChange={props.onChange}
                    checked={props.state[props.name]}
                    required={props.required || false}
                    className={props.className ? props.className + '-checkbox' : false}
                />
                { props.checkmark &&
                    <span className="checkmark"></span>
                }
                {props.label || ''}
            </label>
        </div>
    )
}