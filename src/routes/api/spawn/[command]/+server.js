import {spawn} from 'child_process'
export const POST = async ({ request }) => {

    const body = await request.json()
    // const authHeader = request.headers.get('Authorization')
    // if (authHeader !== 'Myauthheader') {
    //   return new Response(JSON.stringify({message: 'Invalid credentials'}), { status: 401 })
    // }
    const spawnCommand = async () => {
        let output = ''

        const { command } =  body
              const makeSystemCall = (command) => {
                  const systemCall = spawn(command)
        
                  systemCall.stdout.on(`data`, (data) => {
                      output += data
                    console.log(`stdout: ${data}`)
                    // res.send(output)
                    return new Response(JSON.stringify({message: output}), { status: 201 })
                  })
        
                  systemCall.stderr.on(`data`, (data) => {
                      console.error(`stderr: ${data}`)
                  })
        
                  systemCall.on(`close`, (code) => {
                      console.log(`child process exited with code ${code}`)
                  })
              }
        makeSystemCall(command)
        console.log(output)
        return output
    }
    spawnCommand()
    return new Response(JSON.stringify({message: "Success"}), { status: 201 })
}