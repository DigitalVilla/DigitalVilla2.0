import React from 'react'
import './table.scss'

export function CardTable({
  mobileStyle = 'cards',
  emptyMessage = 'Empty rows',
  className = '',
  tableHeaders,
  dataList,
  renderCallback,
  ...rest
}) {
  return (
    <div className='table-container'>
      <table
        className={`tabular-${mobileStyle} ${className}`}
        cellSpacing='0'
        cellPadding='0'
        {...rest}
      >
        <thead>
          <tr className='noSelect'>
            {tableHeaders.map((h, i) => (
              <th
                className='tab-head'
                key={h.title + i}
                width={h.width}
                aria-sort={'none'}
              >
                {h.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={className}>
          {dataList.length && dataList.map((r, i) => renderCallback(r, i))}
          {!dataList.length && (
            <tr key='error' className='error-column'>
              <td colSpan='100%'>{emptyMessage}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
