import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterConfig } from './RouterConfig'
import './index.css'
import { RecoilRoot } from 'recoil'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterConfig />
    </RecoilRoot>
  </React.StrictMode>,
)
