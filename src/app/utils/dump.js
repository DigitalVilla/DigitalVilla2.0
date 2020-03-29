

export default function Dump(className) {
    let div = document.createElement('div');
    div.id = "dump";
    div.className = 'className';
    document.body.appendChild(div);

    return function dump(object) {
        console.log('SENT', object)

        let args = '';

        for (const key in object) {
            // if (object.hasOwnProperty(key)) {
            console.log(typeof key, typeof object[key]);

            if (typeof object[key] === 'object') {
                const object2 = object[key];
                args += `<ul class="dump-ul"><strong>${key}:</strong>`;
                for (const key2 in object2) {
                    if (typeof object2[key2] === 'function') {
                        args += `<li>${key2}: function </li>`;
                    } else {
                        args += `<li>${key2}: ${object2[key2]}</li>`;
                    }
                }

                args += `</ul>`;

            } else {
                args += `<p>${key}: ${object[key]}<p> `;
            }

            // }
        }

        div.innerHTML = `<div class="dump-content">${(args)}</div>`;
        div.style.display = 'block';
    }

}