import './item-list.css'
import { Row } from 'antd'

import Item from '../item'

export default function ItemList({ itemsList }) {
  return (
    <Row className="item-list" gutter={[36, 36]}>
      {itemsList.map((item) => (
        <Item
          title={item.title}
          text={item.text}
          key={item.id}
          imageUrl={item.imageUrl}
          releaseData={item.releaseData}
        />
      ))}
    </Row>
  )
}
