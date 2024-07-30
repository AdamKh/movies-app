import './searchbar.css'
import { Input, Flex } from 'antd'
import { debounce } from 'lodash'

export default function SearchBar({ setQuery }) {
  return (
    <Flex className="searchbar_wrapper" align="center" justify="center">
      <Input
        className="searchbar"
        placeholder="Search movie"
        onChange={debounce((e) => setQuery(e.target.value), 400)}
      />
    </Flex>
  )
}
