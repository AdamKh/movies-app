import '../error.css'
import { Alert } from 'antd'

export default function EmptyQuery({ errorDescription }) {
  return <Alert className="error" description={errorDescription} type="error" showIcon />
}
