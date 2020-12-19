// info from https://www.areacodehelp.com/canada/canada_area_codes.shtml

export const areaCodes = {
  AB: [368, 403, 587, 780, 825],
  BC: [236, 250, 604, 672, 778],
  MB: [204, 431],
  NB: [428, 506],
  NL: [709, 879],
  NT: [867],
  NS: [782, 902],
  NU: [867],
  ON: [226, 249, 289, 343, 365, 416, 437, 519, 548, 613, 647, 705, 807, 905],
  PE: [782, 902],
  QC: [354, 367, 418, 438, 450, 514, 579, 581, 819, 873],
  SK: [306, 474, 639],
  YT: [867],
}

export const getAreaByCode = (code) => {
  switch (code) {
    case 368:
    case 403:
    case 587:
    case 780:
    case 825:
      return 'AB'

    case 236:
    case 250:
    case 604:
    case 672:
    case 778:
      return 'BC'

    case 204:
    case 431:
      return 'MB'

    case 428:
    case 506:
      return 'NB'

    case 709:
    case 879:
      return 'NL'

    case 867:
      return 'NT'
    // return 'NU'
    // return 'YT'

    case 782:
    case 902:
      return 'NS'
    // return 'PE'

    case 306:
    case 474:
    case 639:
      return 'SK'

    case 226:
    case 249:
    case 289:
    case 343:
    case 365:
    case 416:
    case 437:
    case 519:
    case 548:
    case 613:
    case 647:
    case 705:
    case 807:
    case 905:
      return 'ON'

    case 354:
    case 367:
    case 418:
    case 438:
    case 450:
    case 514:
    case 579:
    case 581:
    case 819:
    case 873:
      return 'QC'

    case 800:
    case 833:
    case 844:
    case 855:
    case 866:
    case 877:
    case 888:
      return 'Toll free'

    case 600:
    case 622:
      return 'Non Geographic'

    default:
      return 'none'
  }
}

export const getCodesByArea = (area) => {
  return areaCodes[areaCodes]
}
