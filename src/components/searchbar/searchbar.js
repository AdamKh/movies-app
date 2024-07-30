import './searchbar.css'
import { Input, Flex } from 'antd'

export default function SearchBar() {
  return (
    <Flex className="searchbar_wrapper" align="center" justify="center">
      <Input className="searchbar" placeholder="Search movie" />
    </Flex>
  )
}
