import React from 'react'

export default function Menu(props) {

    const moveTo = (e) => {
        let index = e.target.dataset.page
        props.api.silentMoveTo(index);
    }

    return (
        <div id="menu">
            <ul>
                {
                    props.anchors.map((name, i) =>
                        <li key={i}>
                            <a data-page={i + 1} onClick={moveTo}>{name}</a>
                        </li>
                    )
                }
            </ul>
        </div>
    )
}
