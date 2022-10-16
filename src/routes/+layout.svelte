<nav>
	<a href="/">Home</a>
	<a href="/shop">Shop</a>
	<a href="/commands">Commands</a>
	<a href="/what-is-my-user-agent">What's my user agent?</a>
	<!-- data-sveltekit-prefetch -->
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