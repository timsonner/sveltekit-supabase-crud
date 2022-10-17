import { spawn } from 'child_process'

let outputToBrowser = '' // POST returns empty string without this

function makeSystemCall(command) {
  const commandArguments = command.split(' ')
  command = commandArguments[0]
  return new Promise((resolve, reject) => {
    let commandOutput = ``
    // const systemCall = spawn(command string, array of arguments) example:     spawn(`ls`, [`-al`])
    const systemCall = spawn(command, commandArguments.slice(1))

    systemCall.on('error', function (err) {
      console.log('command not found: ' + command)
      console.error(err)
      commandOutput = `command not found: ${command}`
    })

    systemCall.stdout.on(`data`, (data) => {
      commandOutput += data
      console.log(`stdout: ${data}`)
    })

    systemCall.stderr.on(`data`, (data) => {
      commandOutput += data.toString()
      console.error(`stderr: ${data}`)
    })

    systemCall.on(`close`, (code) => {
      console.log(`makeSystemCall() exited with code ${code}`)
      outputToBrowser = commandOutput // hack to get output to browser
      resolve()
    })
  })
}

export const POST = async ({ request }) => {
  const body = await request.json()
  const { command } = body
  await makeSystemCall(command) // await let foo = makeSystemCall(command) will result in empty string
  console.log(`POST: spawnCommand(): ${outputToBrowser}`) // same for this console log, return nothing
  // return response
  return new Response(JSON.stringify(outputToBrowser), { status: 201 })
}
