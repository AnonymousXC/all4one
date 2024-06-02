'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/database/supabase'


async function signup(formData: FormData) {
  const supabase = createClient()
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        username: formData.get('username') as string
      }
    }
  }

  const status = await supabase.auth.signUp(data)
  revalidatePath('/', 'layout')
  return JSON.stringify(status);
}

export default signup;