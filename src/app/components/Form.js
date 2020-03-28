import React, { useState } from 'react';
import { Input, RadioGroup, TextArea, Check, Select } from './FormCtrls';

const initState = { 
    role: "Writer",
    subscribe: false,
    selection: '',
}

const Form = ({ className }) => {
    const [formValues, setFormValues] = useState(initState);

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(formValues);
        setFormValues(initState);
    }

    const handleOnChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.id === "check-ctrl" ? e.target.checked : e.target.value
        });
    };

    return (
        <form className={className} onSubmit={onSubmit}>
            <fieldset className={"fieldset"}>
                <legend>Email Me!</legend>
                <Input className="customField" name="email" type="email" label="Email:" required={true} 
                    onChange={handleOnChange} state={formValues} placeholder= "Enter Email"
                />
                <Input className="customField" name="username" type="text" label="Username:" required={true} 
                    onChange={handleOnChange} state={formValues} placeholder= "Enter Username"
                />
                <Input className="customField" name="password" type="password" label="Password:" required={true} 
                    onChange={handleOnChange} state={formValues} placeholder= "Enter Password"
                />

                <RadioGroup className="CustomRadio" name="role" onChange={handleOnChange} state={formValues}
                    values={["Admin", "Designer", "Writer", "Developer"]}
                />

                <Check className="CustomCheck" name="subscribe" value="subscribe" state={formValues} required={true}
                    label="Subscribe to our channel"  onChange={handleOnChange} 
                />

                <TextArea className="CustomField" name="message" type="textarea" label="Message:" required={true}
                    onChange={handleOnChange} state={formValues}  placeholder= "Write your message"
                />

                <Select className="customSelect"  name="selection" onChange={handleOnChange} state={formValues} required={true}
                    label="Message:" placeholder= "Select your Role" options={["Admin", "Designer", "Writer", "Developer"]}
                />

                <button className="btn" type="submit">Send</button>
            </fieldset>
        </form>
    )
}

export default Form;