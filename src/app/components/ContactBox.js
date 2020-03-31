import React, { useState, useRef, useEffect } from 'react';
import Icon, { Loader } from './Icons'
import img from "../assets/old-games.jpg"
import { Input, TextArea, Check, Select, HoneyPot } from './FormCtrls';
const initState = {
    subject: '',
    captcha: false,
    confirmEmailCheck: false,
    confirmEmail: "i@robot.ai",
}

export default function ContactBox(props) {
    const [formValues, setFormValues] = useState(initState);
    const [initFocus, setInitFocus] = useState(true);
    const [success, setSuccess] = useState(false);
    const [loading, setloading] = useState(false);
    const refInputName = useRef(null);
    const subjects = [
        "Bug-Fix Request",
        "Consulting Request",
        "Contract Offer",
        "Full-time Offer",
        "Teaching Offer",
        "Pay Me Back!",
        "Other"
    ];

    useEffect(() => {
        if (refInputName.current && initFocus) {
            // console.log('refInputName',refInputName);
            setInitFocus(false)
            refInputName.current.focus();
        }
    })

    const onSubmit = (e) => {
        e.preventDefault();
        setloading(true);

        setTimeout(() => {
            setSuccess(true);
            setloading(false);
            setFormValues(initState);
        }, 2000);
    }

    const onChange = (e) => {
        let el = e.target;
        setFormValues({
            [el.name]: el.id === "check-ctrl" ? el.checked : el.value,
            ...formValues,
        });
    };

    const handleClose = () => {
        props.toggleContact();
        success && setSuccess(false);
        setInitFocus(true);
    }

    const onBlur = (e) => {
        // console.log("onBlur");   
        // props.api.reloadView();
    }

    const onFocus = (e) => {
        // props.api
        // console.log("onFocus");   
    }

    return (
        <div id="contactBox" className={"menu contactBox " + props.className}>
            <div className="form-background" onClick={handleClose}></div>
            <div className="form-container">
                <div className="form-header">
                    <Icon className="contactBox-close" icon={'logOut'} action={handleClose} />
                    <figure>
                        <img src={img} alt="contact-header" />
                    </figure>
                    <h2>Send me a Text!</h2>
                    <h3 className={`${success ? "active" : ''}`} >
                        Thanks, You'll hear from me soon!
                    </h3>
                </div>
                <div className={`form-body${loading ? " active" : ''}`}>
                    {props.isOpen &&
                        <form className='form-controller' onSubmit={onSubmit}>
                            <div className="input-container">
                                <Input className="customField" name="name" type="text" label="Name:" required ref={refInputName}
                                    handlers={{ onChange, onFocus, onBlur }} state={formValues} placeholder="Name"
                                />
                                <Input className="customField" name="email" type="email" label="Email:" required
                                    handlers={{ onChange, onFocus, onBlur }} state={formValues} placeholder="Email"
                                />
                                <Select className="customSelect" name="subject" onChange={onChange} state={formValues} required
                                    label="Message:" placeholder="Subject" options={subjects}
                                />
                            </div>
                            <TextArea className="customTextarea" name="message" type="textarea" label="Message:" required
                                handlers={{ onChange, onFocus, onBlur }} state={formValues} placeholder="Write your message"
                            />
                            <div className="footer">
                                <Check className="customCheck" name="captcha" state={formValues} required
                                    label="You're Human Right?" onChange={onChange} checkmark
                                />
                                <HoneyPot name="confirmEmail" state={formValues} onChange={onChange} />
                                <Icon className="contactBox-submit" label="Send" type="submit" icon="planeSolid" gradient />
                            </div>
                        </form>
                    }
                    {loading &&
                        <Loader className="sendMessage" gradient />
                    }
                </div>
            </div>
        </div>
    )
}