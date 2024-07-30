import '../error.css'
import { Alert } from 'antd'

export default function ErrorHandler({ errorMessage, errorDescription }) {
  return <Alert className="error" message={errorMessage} description={errorDescription} type="error" showIcon />
}
