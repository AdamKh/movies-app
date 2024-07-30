import './spinner.css'
// eslint-disable-next-line import/no-extraneous-dependencies
import { LoadingOutlined } from '@ant-design/icons'
import { Flex, Spin } from 'antd'

export default function Spinner() {
  return (
    <Flex className="spinWrapper" align="center" justify="center">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 100 }} spin />} />
    </Flex>
  )
}
