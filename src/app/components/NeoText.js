import React, { useEffect, useState } from 'react'
import TextScramble from '../utils/TextScramble'
import logger from '../utils/logger';
let log = logger(`<NeoText/>: `);

// Global variables
let timeId = 0;
let _lapses = 0;
let _autoPlay = false;
let counter = 0;
let Neo = null;
let neoId = `neo-text`;

export default function NeoText(props) {
	const [_animate, setAnimate] = useState(false);
	
	useEffect(() => {
		if (props.animate) {
			setAnimate(true);
		} else {
			setAnimate(false);
		}
		runTextScramble();
	})

	const runTextScramble = () => {
		const { delay, charClass, autoPlay, reset, loop, lapses, loopDelay, speed, chars, rolls, phrases } = props.options;
		log(['initTxt()']);
		clearTimeout(timeId)
		counter = reset ? 0 : counter;

		const next = () => {
			log('next()', 4);
			clearTimeout(timeId)
			if (!_animate) return;
			let nextPhrase = phrases[counter];
			let words = nextPhrase.split(' ').length * 0;

			Neo.setText(nextPhrase, props.animate).then(() => {
				log('next().then()', 2, true);
				if (!_animate) return

				let nextDelay = counter !== 0 ? words * delay || 600 : loopDelay || 2000;

				if (!loop && counter !== 0) {
					timeId = setTimeout(next, nextDelay)

				} else if (loop && _lapses > 0) {
					timeId = setTimeout(next, nextDelay);
				} else {
					clearTimeout(timeId);
				}
			}).catch((err) => {
				log('next().catch()', 3, true)
			});

			_lapses = _lapses - 1;
			counter = (counter + 1) % phrases.length
		}

		if (_animate && !Neo) {
			log('TextScramble init():',7,true);
			_autoPlay = autoPlay;
			_lapses = !loop ? lapses : 1000;
			Neo = new TextScramble(neoId, {
				speed: speed === 'slow' ? 0.08 : speed === 'fast' ? 0.8 : 0.28,
				charClass: charClass || null,
				chars: chars || null,
				rolls: rolls || null,
			});
		}

		if (_animate && _autoPlay) {
			log('invoke next()', 1, true);
			next();
		}
	}

	return (
		<div className={props.options.className || 'neo-text'} id={neoId}>
			{props.options.initialText || 'Neo-Text'}
		</div>
	);
}

/* <NeoText options={{
        // Markup
        delay : number, | default: 500 | delay per word in milliseconds
        className : string, | default: 'n-text' | className for the div container
        charClass : string, | default: 'n-char' | className for each scrambled span

        // Controls
        autoPlay : boolean, | default: true | play as soon as it is mounted
        loop : boolean, | default: true | infinite playing
        loopDelay= {number, | default: 2000 | delay before starting next scramble

        // Settings
        rolls : number:70, | default: true
        chars : string: '_&^*', | default: true
        speed : string: 'slow',medium','fast', | default: true

        // Display
		initialText: string:
        phrases : array: [string:], | default: true
        }}

        play={boolean} | default: true | if !isPlaying play when indicated
        animate={boolean} | default: true | if false the animation  will stop
    /> */