import 'dotenv/config'

import { createClient } from '@supabase/supabase-js'

// create Supabase client, pass it the .env variables
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

export const load = async () => {
    console.log('Server Load Ran')
    return {
        commands: getCommands()
    }
}

export const getCommands = async () => {
  const { data, error } = await supabase
        .from('commands')
        .select('*')
    console.log(data)
    return data     
}

export const POST = async ({ request }) => {
  const body = await request.json()
  
  const postCommand = async (req, res) => {
      const { command } = req.body
      
        const { data, error } = await supabase
          .from('commands')
          .insert([{ id: uuidv4(), command: command }])
          return data
  }
  console.log(body)
  return new Response(JSON.stringify(postCommand()), { status: 201 })
}




