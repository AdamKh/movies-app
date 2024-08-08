import { format } from 'date-fns'

function shortenText(text, maxLength) {
  if (text.length <= maxLength) {
    return text
  }

  const shortened = text.slice(0, maxLength)
  const lastSpaceIndex = shortened.lastIndexOf(' ')

  if (lastSpaceIndex === -1) {
    return `${shortened}...`
  }

  return `${shortened.slice(0, lastSpaceIndex)}...`
}

function formatDate(releaseData) {
  if (releaseData) {
    return format(new Date(releaseData), 'MMMM dd, yyyy')
  }
  return 'Дата релиза неизвестна'
}

// eslint-disable-next-line import/prefer-default-export
export { shortenText, formatDate }
