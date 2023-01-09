import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

type AuthState = {
  id: number | null
}

const { persistAtom } = recoilPersist()

export const authState = atom<AuthState>({
  default: {
    id: null
  },
  effects_UNSTABLE: [persistAtom],
  key: 'authState',
})
