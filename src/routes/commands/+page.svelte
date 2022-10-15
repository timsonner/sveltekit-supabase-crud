<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={insertPost}>Click to post</button>
<button on:click={fetchPosts}>Click to get posts</button>
<input type="text" id="inputAddCommand" bind:value={inputAddCommandValue}>

<script>
import { v4 as uuidv4 } from 'uuid'

export let inputAddCommandValue



export const fetchPosts = async () => {
    const response = await fetch('/api', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
  }

export const insertPost = async () => {
    const id = uuidv4()
    const command = 'imacommand from insert' // This is static for testing, needs bound to a variable
    const response = await fetch('/api', { 
      method: 'POST',
      body: JSON.stringify({ command: command, id: id}),
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  export const updatePost = async () => {
    const id = uuidv4()
    const command = 'imacommand from update' // This is static for testing, needs bound to a variable
    const response = await fetch(`/api/${id}`, { // same, static testing
      method: 'PUT',
      body: JSON.stringify({ command: command }),
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  export const deletePost = async () => {
    const id = uuidv4()
    const command = 'imacommand2' // This is static for testing, needs bound to a variable
    const response = await fetch(`/api/${id}`, { // same, static testing
      method: 'DELETE',
      body: JSON.stringify({ command: command, id: id}),
      headers: {
        'content-type': 'application/json'
      }
    })
  }
</script>