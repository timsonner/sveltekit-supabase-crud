import 'dotenv/config'

// require('dotenv').config()
import { createClient } from '@supabase/supabase-js'
import { invalidateAll } from '$app/navigation'
// const { createClient } = require('@supabase/supabase-js')
// const path = require('path')
// const { v4: uuidv4 } = require('uuid')
// const { spawn } = require('child_process')

// create Supabase client, pass it the .env variables
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

export const load = async () => {
    console.log('Server Load Ran')
    return {
        // resolved: fetchData(),
        commands: getCommands()
    }
}

// export const fetchData = async () => {
//         const res = await fetch(`/api`)
//         const data = await res.json()
//         return data.results
//     }

export const getCommands = async () => {
  const { data, error } = await supabase
        .from('commands')
        .select('*')
    console.log(data)
    return data     
}

export const POST = async ({ request }) => {
  const body = await request.json()
  // const authHeader = request.headers.get('Authorization')
  // if (authHeader !== 'Myauthheader') {
  //   return new Response(JSON.stringify({message: 'Invalid credentials'}), { status: 401 })
  // }
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




// module.exports = {
//   root: (req, res) => {
//     try {
//       res.status(200).sendFile(path.join(__dirname, '/public/index.html'))
//     } catch (error) {
//       console.log('error sending index.html', error)
//       res.sendStatus(400)
//     }
//   },
//   main: (req, res) => {
//     try {
//       res.status(200).sendFile(path.join(__dirname, '/public/main.js'))
//     } catch (error) {
//       console.log('error sending main.js', error)
//       res.sendStatus(400)
//     }
//   },
//   getCommands: async (req, res) => {
//       const { data, error } = await supabase
//         .from('commands')
//         .select('*')
//     console.log(data)
//     res.status(200).send(data)
//       if (error) {
//         res.send(error)
//         return
//       }
//   },
  
//   deleteCommand: async (req, res) => {
//     const { data, error } = await supabase
//   .from('commands')
//   .delete()
//       .match({ id: req.params.id })
//     if (error) {
//       res.send(error)
//       return
//     }
//     res.send(data)
//   },
//   updateCommand: async (req, res) => {
//     const { command } = req.body
//     const {id} = req.params
//     const { data, error } = await supabase
//   .from('commands')
//   .update({ command: command })
//       .match({ id: id })
//       if (error) {
//         res.send(error)
//         return
//       }
//       res.send(data)
//   },
      
//   spawn: async (req, res) => {
// const { command } =  req.body
//       let output = ''
//       const makeSystemCall = (command) => {
//           const systemCall = spawn(command)

//           systemCall.stdout.on(`data`, (data) => {
//               output += data
//             console.log(`stdout: ${data}`)
//             res.send(output)
//           })

//           systemCall.stderr.on(`data`, (data) => {
//               console.error(`stderr: ${data}`)
//           })

//           systemCall.on(`close`, (code) => {
//               console.log(`child process exited with code ${code}`)
//           })
//       }
//   makeSystemCall(command)
//   }
// }

