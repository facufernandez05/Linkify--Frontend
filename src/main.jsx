import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { LoadingProvider } from './context/loading'
import { ErrorProvider } from './context/error'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
    <LoadingProvider>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </LoadingProvider>
  </NextUIProvider>
)
