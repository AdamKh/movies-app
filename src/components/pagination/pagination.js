import './pagination.css'

import { Pagination as AntdPagination } from 'antd'

export default function Pagination() {
  return <AntdPagination className="pagination" align="center" defaultCurrent={1} total={50} />
}
