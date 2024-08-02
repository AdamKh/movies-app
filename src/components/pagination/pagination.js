import './pagination.css'
import { Pagination as AntdPagination } from 'antd'

import { MovieAppConsumer } from '../movies-app-service-context'

export default function Pagination() {
  return (
    <MovieAppConsumer>
      {({ setPagValue }) => (
        <AntdPagination
          className="pagination"
          align="center"
          defaultCurrent={1}
          showSizeChanger={false}
          total={500}
          pageSize={20}
          onChange={(page) => {
            setPagValue(page)
            window.scrollTo(0, 0)
          }}
        />
      )}
    </MovieAppConsumer>
  )
}
