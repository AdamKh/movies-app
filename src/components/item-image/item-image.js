import { Flex } from 'antd'

import noImage from '../../img/no-image.svg'

function image(imageUrl) {
  if (imageUrl) {
    return <img alt="poster" className="movie_img" src={imageUrl} />
  }
  return (
    <Flex className="movie_img-no_image_wrapper" align="center" justify="center">
      <img className="movie_img-no_image" alt="poster" src={noImage} />
    </Flex>
  )
}

export default function ItemImage({ imageUrl }) {
  return image(imageUrl)
}
