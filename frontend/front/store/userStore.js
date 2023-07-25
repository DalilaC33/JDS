import { useRouter } from 'next/router'
import create from 'zustand'
import { getCookie, removeCookie } from '../utils'

const userStore = create(set => ({
  user: null,
  setUser: user => set({ user: user }),
  fetchUser: async () => {
    const response = await fetch(`${process.env.BASE_URL}auth/whoami`, { 
      method: 'get', 
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCookie()}`,
      })
    })
    if(response.status !== 200) {
      removeCookie()
      const router = useRouter()
      router.push('/auth/login')
    }
    set({ user: await response.json() })
  }
}))

export default userStore