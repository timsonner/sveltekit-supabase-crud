<script>
	export let data;
	const { products } = data;
</script>

<h1>Shop</h1>
{#each products as product}
<img src="{product.images[0]}" alt="asdf">
	<h2>{product.title}</h2>
	<p>{product.description}</p>
{/each}

