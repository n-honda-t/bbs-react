import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterConfig } from './RouterConfig'
import './index.css'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <SWRConfig>
        <RouterConfig />
      </SWRConfig>
    </RecoilRoot>
  </React.StrictMode>,
)
