import img_sm from "../assets/nebula-sm.jpg"
import img_md from "../assets/nebula-md.jpg"
import img_lg from "../assets/nebula-lg.jpg"
import img_4k from "../assets/nebula.jpg"
import isMedia from "../utils/isMedia"

 let poster = isMedia('phone') ? img_sm : isMedia('tablet') ? img_md
		: isMedia('2kUp') ? img_4k : img_lg;

// export default function getPoster() {
//     return poster;
// }
export default poster;
