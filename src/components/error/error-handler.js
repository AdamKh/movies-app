import './error-handler.css'
import { Alert } from 'antd'

export default function ErrorHandler({ errorMessage, errorDescription }) {
  return <Alert message={errorMessage} description={errorDescription} type="error" showIcon />
}
