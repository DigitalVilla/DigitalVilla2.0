import isMedia from "../utils/isMedia"
const img_sm = "https://assets.digitalvilla.ca/images/nebula-sm.jpg"
const img_md = ".https://assets.digitalvilla.ca/images/nebula-md.jpg"
const img_lg = ".https://assets.digitalvilla.ca/images/nebula-lg.jpg"
const img_4k = ".https://assets.digitalvilla.ca/images/nebula.jpg"

 let poster = isMedia('phone') ? img_sm : isMedia('tablet') ? img_md
		: isMedia('2kUp') ? img_4k : img_lg;

export default poster;
