'use server'

import { revalidatePath } from 'next/cache'

import { createClient } from '@/database/supabase'

async function login(formData: FormData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const status = await supabase.auth.signInWithPassword(data)

  revalidatePath('/', 'layout')
  return JSON.stringify(status);
}

export default login;