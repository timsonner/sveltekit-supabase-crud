import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

// create Supabase client, pass it the .env variables
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
export const GET = async ({ request, url }) => {

  // const res = await fetch(``)
  // const data = await res.json()
  const getCommands = async () => {
  
    const { data, error } = await supabase
          .from('commands')
          .select('*')
      console.log(data)
      return data     
  }
  // return new Response(JSON.stringify(data), { status: 200 })
    return new Response(await getCommands(), { status: 200 })
}

export const POST = async ({ request }) => {
  const body = await request.json()
  console.log(body)
  // const result = JSON.stringify(body)
  // console.log(result)

  const insertCommand = async () => {
    const { command, id } = body
    
      const { data, error } = await supabase
        .from('commands')
        .insert([{ id: id, command: command }])
        return data
  }
  insertCommand()
  return new Response(JSON.stringify({message: "Success"}), { status: 201 })
}

