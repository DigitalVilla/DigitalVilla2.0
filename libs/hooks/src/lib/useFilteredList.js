import { useState, useRef, useEffect } from 'react'

export default function useFilteredList(mainList = [], options = {}) {
  const [filteredList, setFilteredList] = useState([])
  const _ops = useRef({
    searchParams: options.searchParams || [],
    caseSensitive: options.caseSensitive || false,
    pageSizeLimit: options.pageSizeLimit || 100,
    invertDates: options.invertDates || true,
    isAscending: options.isAscending || true,
    sortingField: options.sortingField || '',
    currentPage: options.currentPage || 1,
    pageSize: options.pageSize || 10,
    filterBy: options.filterBy || '',
    totalItems: mainList.length,
    cachedList: [],
    viewing: {},
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => init(), [mainList])

  const init = () => {
    if (!mainList.length) return
    if (options.sortingField) {
      _ops.current.cachedList = mainList.slice()
      return setNewSort(options)
    } else {
      return setNewFilter({})
    }
  }

  const setNewFilter = ({
    filterBy = _ops.current.filterBy,
    caseSensitive = _ops.current.caseSensitive,
    searchParams = _ops.current.searchParams,
  }) => {
    try {
      let param
      const FL = filterBy.length
        ? mainList.filter((item, i) => {
            param =
              typeof searchParams === 'string'
                ? item
                : searchParams.map((field) => _resolve(item, field)).join('|')

            return caseSensitive
              ? param.indexOf(filterBy) >= 0
              : param.toLowerCase().indexOf(filterBy.toLowerCase()) >= 0
          })
        : mainList.slice()

      _ops.current.cachedList = FL
      _ops.current.filterBy = filterBy
      _ops.current.sortingField = ''

      setNewCurrentPage()
    } catch (error) {
      console.error('setNewFilter() ', error)
    }
  }

  const setNewSort = ({
    isAscending: ASC = _ops.current.isAscending,
    sortingField: SF = _ops.current.sortingField,
    caseSensitive = _ops.current.caseSensitive,
    invertDates = _ops.current.invertDates,
    dataType: DT = 'string',
    complex = false,
  }) => {
    try {
      let a, b, temp
      const collator = new Intl.Collator('en', {
        sensitivity: !caseSensitive ? 'base' : 'case',
        usage: 'sort',
      })

      const SL = _ops.current.cachedList.sort((prev, next) => {
        if (complex) {
          temp = DT === 'number' ? 0 : ''
          a = SF.reduce((acc, val) => acc + _resolve(prev, val), temp)
          b = SF.reduce((acc, val) => acc + _resolve(next, val), temp)
        } else {
          a = _resolve(prev, SF)
          b = _resolve(next, SF)
        }

        if (!a || !b) return 0

        if (DT === 'date' && !(a - 1)) {
          a = Date.parse(a)
          b = Date.parse(b)
        }

        if (DT === 'string') {
          return (ASC ? 1 : -1) * collator.compare(a, b)
        } else if (DT === 'date' || DT === 'number') {
          temp = DT === 'date' ? invertDates && !ASC : ASC
          return (temp ? 1 : -1) * (a - b)
        }
      })

      _ops.current.sortingField = SF
      _ops.current.isAscending = ASC
      _ops.current.cachedList = SL

      setNewCurrentPage()
    } catch (error) {
      console.error('setNewSort() ', error)
    }
  }

  const setNewPageSize = (pageSize = 10) => {
    const { pageSizeLimit } = _ops.current
    if (pageSize < 1 || pageSize > pageSizeLimit) return
    _ops.current.pageSize = Math.ceil(pageSize)
    setNewCurrentPage()
  }

  const setNewCurrentPage = (pageIndex = 1) => {
    const { pageSize, cachedList } = _ops.current
    if (pageIndex < 1) return

    const items = cachedList.length
    const start = items ? (pageIndex - 1) * pageSize : 0
    const end = items ? start + pageSize : 0
    const pages = items ? Math.ceil(items / pageSize) : 0
    const index = pageIndex > pages ? pages : pageIndex
    const last = index * pageSize

    // Update filterOptions
    _ops.current.totalItems = items
    _ops.current.totalPages = pages
    _ops.current.currentPage = index
    _ops.current.viewing.firstItem = items ? last - pageSize + 1 : 0
    _ops.current.viewing.lastItem = last > items ? items : last

    if (items === 0) {
      _ops.current.cachedList.push({
        error: 'No items to view',
      })
      return setFilteredList(_ops.current.cachedList)
    }

    setFilteredList(cachedList.slice(start, end))
  }

  function _resolve(obj, keys) {
    if (!keys || typeof obj !== 'object') return obj
    return keys.reduce((acc, curr) => acc && acc[curr], obj)
  }

  return {
    filteredList,
    setNewSort,
    setNewFilter,
    setNewPageSize,
    setNewCurrentPage,
    filterOptions: _ops.current,
  }
}
