<script>
	export let data;
	const { commands } = data;
</script>

<h1>Commands</h1>

{#each commands as command}
	<h2>{command.id}</h2>
	<p>{command.command}</p>
{/each}
