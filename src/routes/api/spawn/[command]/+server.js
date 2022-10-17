import { spawn } from 'child_process'

export var commandOutput = ``

function makeSystemCall(command) {
    const commandArguments = command.split(' ');
    var command = commandArguments[0]
    // const systemCall = spawn(`ping`, [`-al`])
    // const systemCall = spawn(command string, array of arguments)
    const systemCall = spawn(command, commandArguments.slice(1))
    systemCall.on('error', function(err) {
        console.log('command not found: ' + command);
        console.error(err)
        commandOutput = `command not found: ${command}`
      });
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
    })
}

export const POST = async ({ request }) => {
    const body = await request.json()
    const { command } = body
    await makeSystemCall(command)
        console.log(`POST: spawnCommand(): ${commandOutput}`)
        // return response
        return new Response(JSON.stringify(commandOutput), { status: 201 })
}
    
