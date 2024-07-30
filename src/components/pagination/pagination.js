import './pagination.css'

import { Pagination as AntdPagination } from 'antd'

export default function Pagination({ setPagValue }) {
  return (
    <AntdPagination
      className="pagination"
      align="center"
      defaultCurrent={1}
      total={20}
      pageSize={6}
      onChange={(page) => setPagValue(page)}
    />
  )
}
