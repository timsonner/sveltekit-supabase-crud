import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

// create Supabase client, pass it the .env variables
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

export const PUT = async ({ request, params }) => {
  const body = await request.json()
    console.log(body)
    const putCommand = async () => {
        const { command } = body     
          const { data, error } = await supabase
            .from('commands')
            .update({ command: command })
            .match({ id: params.id })
            return data
    }
    putCommand()
    return new Response(JSON.stringify({message: "Success"}), { status: 201 })
}

export const DELETE = async ({ params }) => {
    console.log(params)
    // const {id} = params
    const deleteCommand = async () => {
        const { data, error } = await supabase
      .from('commands')
      .delete()
      .match({ id: params.id })
      return data
    }
    deleteCommand()
    return new Response(JSON.stringify({message: "Success"}), { status: 201 })
}


