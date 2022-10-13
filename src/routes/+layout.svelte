<nav>
	<a href="/">Home</a>
	<a href="/shop" data-sveltekit-prefetch>Shop</a>
	<a href="/commands" data-sveltekit-prefetch>Commands</a>
</nav>
<slot />

<style>
	nav {
		display: flex;
	}
	nav a {
		margin-right: 1rem;
	}
</style>