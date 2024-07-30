import './item.css'
import { Typography, Col, Flex } from 'antd'
import { format } from 'date-fns'

const { Title, Text } = Typography

function image(imageUrl) {
  if (imageUrl) {
    return <img alt="poster" className="movie_img" src={imageUrl} />
  }
  return (
    <Flex className="movie_img" align="center" justify="center">
      No poster
    </Flex>
  )
}

export default function Item({ title, text, imageUrl, releaseData }) {
  return (
    <Col span={12}>
      <div className="item">
        {image(imageUrl)}
        <div className="movie_info">
          <Title level={3} className="movie_title">
            {title}
          </Title>
          <p className="movie_date">{format(new Date(releaseData), 'MMMM dd, yyyy')}</p>
          <div className="movie_genres">
            <p className="genre">Action</p>
            <p className="genre">Drama</p>
          </div>
          <Text className="movie_text">{text}</Text>
        </div>
      </div>
    </Col>
  )
}
