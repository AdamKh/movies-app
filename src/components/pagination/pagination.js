import './pagination.css'
import { Pagination as AntdPagination } from 'antd'
// import { useState } from 'react'

export default function Pagination({ total, pagValue, setPagValue }) {
  return (
    <AntdPagination
      className="pagination"
      align="center"
      defaultCurrent={1}
      current={pagValue}
      showSizeChanger={false}
      total={total}
      pageSize={20}
      onChange={(page) => {
        setPagValue(page)
        window.scrollTo(0, 0)
      }}
    />
  )
}
