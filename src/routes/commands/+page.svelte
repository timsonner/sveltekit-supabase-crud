<script>
  import { v4 as uuidv4 } from 'uuid'
  import {
  afterNavigate,
  beforeNavigate,
  disableScrollHandling,
  goto,
  invalidate,
  invalidateAll,
  prefetch,
  prefetchRoutes
} from '$app/navigation';

  export let data
  export let inputInsertCommandValue = ''

	let { commands } = data;

export const reload = async () => {
  invalidate('/commands')
  commands = [...commands]
}

  export const readCommands = async () => {
      const response = await fetch('/api', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
    }
  
  export const createCommand = async () => {
      const id = uuidv4()
      const command = inputInsertCommandValue
      const response = await fetch('/api', { 
        method: 'POST',
        body: JSON.stringify({ command: command, id: id}),
        headers: {
          'content-type': 'application/json'
        }
      })
    }

    export const updateCommand = async (id, command) => {
      console.log(`command:${command} id: ${id}`)
      const response = await fetch(`/api/${id}`, { 
        method: 'PUT',
        body: JSON.stringify({ command: command }),
        headers: {
          'content-type': 'application/json'
        }
      })
    }
  
    export const deleteCommand = async (id) => {
      const response = await fetch(`/api/${id}`, { 
        method: 'DELETE',
        body: JSON.stringify({ id: id}),
        headers: {
          'content-type': 'application/json'
        }
      })
    }

export let spawnOutput = ''
    export const spawnCommand = async (command) => {
      const response = await fetch(`/api/spawn/${command}`, { 
        method: 'POST',
        body: JSON.stringify({ command: command }),
        headers: {
          'content-type': 'application/json'
        }
      })
      spawnOutput = await response.json()
      console.log(spawnOutput)
    }
    // 🟢 🔴
  </script>

  <!-- HTML Start -->
  <header>  
  <h1>
    Run system commands on the server
  </h1>  
  </header>
{spawnOutput}
<button on:click={reload}>Click to get commands</button>
<input type="text" bind:value={inputInsertCommandValue} placeholder="Enter a command">
<button on:click={createCommand}>Add</button>

{#each commands as command}
  <p>{command.command}</p>
  <input type="text" placeholder="" bind:value={command.command}>
  <button sveltekit:reload on:click={updateCommand(command.id, command.command)}>Edit</button>
  <button on:click={deleteCommand(command.id)}>Delete</button>
  <button on:click={spawnCommand(command.command)}>Execute</button>
{/each}

<br>
<footer>
  2022 Tim Sonner
</footer>