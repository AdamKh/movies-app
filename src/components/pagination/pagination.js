import './pagination.css'
import { Pagination as AntdPagination } from 'antd'

export default function Pagination({ setPagValue }) {
  const handlePageChange = (page) => {
    setPagValue(page)
    window.scrollTo(0, 0)
  }

  return (
    <AntdPagination
      className="pagination"
      align="center"
      defaultCurrent={1}
      showSizeChanger={false}
      total={500}
      pageSize={20}
      onChange={handlePageChange}
    />
  )
}
