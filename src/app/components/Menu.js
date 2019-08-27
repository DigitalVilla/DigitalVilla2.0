import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage';

export default function Menu(props) {
    const pages = ['Home', 'About', 'Works', 'Contact'];

    const moveTo = (e) => {
        let index = e.target.dataset.page
        props.api.moveTo(index);
    }


    return (
        <div id="menu">
            {
                pages.map((e, i) => <button key={i} data-page={i + 1} onClick={moveTo}>{e}</button>)
            }
        </div>
    )
}
