<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={doPost}>Click to post</button>
<button on:click={fetchPosts}>Click to get posts</button>


<script>
import { v4 as uuidv4 } from 'uuid'

export const doPost = async () => {
    const id = uuidv4()
    const command = 'imacommand2'
    const response = await fetch('/api', { 
      method: 'POST',
      body: JSON.stringify({ command: command, id: id}),
      headers: {
        'content-type': 'application/json'
      }
    })
  }

  export const fetchPosts = async () => {
    const response = await fetch('/api', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
  }
</script>