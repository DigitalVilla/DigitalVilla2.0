import React from 'react'

export default function Menu(props) {
    const moveTo = (e) => {
        let index = e.target.dataset.page
        props.api.moveTo(index);
    }


    return (
        <div id="menu">
            {
                props.pages.map((e, i) => <button key={i} data-page={i + 1} onClick={moveTo}>{e}</button>)
            }
        </div>
    )
}
