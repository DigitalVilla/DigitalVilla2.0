import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

/**
 * Return custom values when the screen matches the query in a mobile first approach
 * @param {array} queries list of Query* objects in descending order
 * @param {any} defaultValue (optional) container id
 * @returns {any} first matching query's value or defaultValue (false if not provided)
 *
 * Query example and breakdown: { '768:1024|1024:1366': 'iPadView' }
 * { "min-width [:] max-width [|] min-height [:] max-height": 'value to return'}
 *
 * Some use examples:
 * const iPadSize = useMedia([{ '768:1024|1024:1366': true }])
 * const phoneLandscape = useMedia([{ '0:668|0:376': true }], false)
 * const activeClass = useMedia([{ '768:1024': 'visible' }], 'hidden')
 * const screen = useMedia([{ '1400':'xl' }, { '1024':'lg' }, { '768':'md' },{ '375': 'sm' },{ '0':'xs' },], 'sm')
 * const device = useMedia([{ '375:376|812:813': 'iPhoneX portrait' }, { '812:813|375:376': 'iPhoneX landscape' }], 'another')
 *
 */
/* eslint-disable */
export default function useMedia(queries = [], defaultValue = false) {
  const store = useRef({ value: defaultValue, min_w: 0 })
  const [screen, setScreen] = useState(defaultValue)
  const mediaValues = useRef(null)

  useEffect(() => {
    if (storeMediaQueries().length) {
      matchQuery()
      window.addEventListener('resize', matchQuery)
      return () => window.removeEventListener('resize', matchQuery)
    } // eslint-disable-next-line
  }, [])

  function storeMediaQueries() {
    return (mediaValues.current = queries
      .map((query) => {
        const [mediaSizes, value] = getMediaParams(query)

        if (mediaSizes) {
          const splitW = mediaSizes[0] ? mediaSizes[0].split(':') : []
          const splitH = mediaSizes[1] ? mediaSizes[1].split(':') : []

          return {
            min_w: parseInt(splitW[0] || 0),
            max_w: parseInt(splitW[1] || 4e3),
            min_h: parseInt(splitH[0] || 0),
            max_h: parseInt(splitH[1] || 3e3),
            value: value,
          }
        }
        return null
      })
      .filter((el) => el !== null))
  }

  function getMediaParams(query) {
    if (typeof query !== 'object') return [null]
    const Q = Object.entries(query)[0]
    if (!Array.isArray(Q)) return [null]
    if (Q[0].replace(/[^:|\d]/g, '$').indexOf('$') >= 0) return [null] // no-useless-escape
    if (Q[0].replace(/\|{2,}|:{2,}/g, '$').indexOf('$') >= 0) return [null]
    return [Q[0].split('|'), Q[1]]
  }

  function matchQuery(e) {
    const width = window.innerWidth
    const height = window.innerHeight
    let query = null

    for (const key in mediaValues.current) {
      if (mediaValues.current.hasOwnProperty(key)) {
        query = mediaValues.current[key]

        if (
          width >= query.min_w &&
          height >= query.min_h &&
          width < query.max_w &&
          height < query.max_h
        ) {
          if (store.current.value !== query.value) {
            store.current = { value: query.value, min_w: query.min_w }
            setScreen(query.value)
          }
          return
        }
      }
    }

    if (store.current.value !== defaultValue) {
      store.current = { value: defaultValue, min_w: query.min_w }
      setScreen(defaultValue)
    }
  }

  return screen
}

useMedia.propTypes = {
  queries: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultValue: PropTypes.any,
}
