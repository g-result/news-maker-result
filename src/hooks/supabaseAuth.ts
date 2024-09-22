'use client'
import { AFTER_SIGNIN_PATH, AFTER_SIGNOUT_PATH } from '@/const/config'
import { supabase } from '~/lib/supabase'

type EmailAndPassword = {
  email: string
  password: string
}

export const useSupabaseAuth = () => {
  const signup = async ({ email, password }: EmailAndPassword) => {
    try {
      const authResponse = await supabase.auth.signUp({
        email,
        password
        // options: {
        //   emailRedirectTo: `${location.origin}/api/auth/callback`
        // }
      })
      const userId = authResponse.data?.user?.id
      if (!userId) return
      console.log('signup:', userId)

      window.location.assign('/supabase/new-user') // リダイレクトしてミドルウェアにてCookieを反映しログイン状態を反映してからuser情報をDB登録
    } catch (error) {
      console.log('error', error)
    }
  }
  const signin = async ({ email, password }: EmailAndPassword) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      console.log('error', error)
      return
    }
    if (!data) return
    console.log('signin成功', { data })
    window.location.assign(AFTER_SIGNIN_PATH) // リダイレクトすることでミドルウェアを通してCookieを反映しログイン状態を反映
  }
  const signOut = async () => {
    await supabase.auth.signOut()
    console.log('signOut成功')
    window.location.assign(AFTER_SIGNOUT_PATH) // リダイレクトすることでミドルウェアを通してCookieを削除しログアウト状態を反映
  }

  return { signin, signup, signOut }
}
