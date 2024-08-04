import './pagination.css'
import { Pagination as AntdPagination } from 'antd'
// import { useState } from 'react'

import { MovieAppConsumer } from '../movies-app-service-context'

export default function Pagination({ total }) {
  // const [currentPagValue, setCurrentPagValue] = useState(1)
  return (
    <MovieAppConsumer>
      {({ setPagValue, pagValue }) => (
        <AntdPagination
          className="pagination"
          align="center"
          defaultCurrent={1}
          current={pagValue}
          showSizeChanger={false}
          total={total || 500}
          pageSize={20}
          onChange={(page) => {
            // setCurrentPagValue(page)
            setPagValue(page)
            window.scrollTo(0, 0)
          }}
        />
      )}
    </MovieAppConsumer>
  )
}
