import React, { useEffect } from 'react'
import TextScramble from '../utils/TextScramble'

export default function NeoText(props) {
    console.log('NeoText');
    let isPlaying = false;

    useEffect(() => initTxt(), [props.autoPlay,props.play]);


    const initTxt = () => {
        const { uid, delay, phrases, loop } = props;

        let ms = delay || 500;
        let timeId = 0;
        let counter = 0;
        const el = document.getElementById("neo-" + uid);
        const fx = new TextScramble(el);


        const next = () => {
            let nextPhrase = phrases[counter];
            let words = nextPhrase.split(' ').length;

            fx.setText(nextPhrase).then((data) => {
                if (counter != 0) {
                    timeId = setTimeout(next, words * ms)
                     isPlaying = true;
                } else {
                    isPlaying = false;
                    clearTimeout(timeId);
                }
            })
            counter = (counter + 1) % phrases.length
            clearTimeout(timeId)
        }

        if (props.autoPlay || (props.play && !isPlaying)) {
            next();
        }
    }

    return (
        <div className={props.className || ''} id={"neo-" + props.uid}>
            {props.initial || 'Neo-Text'}
        </div>
    )
}
