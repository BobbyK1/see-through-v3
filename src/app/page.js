export default function Page() {
	return (
	  <form action="/auth/login" method="post">
		<label htmlFor="email">Email</label>
		<input name="email" />
		<button>Sign In</button>
		<button formAction="/auth/sign-up">Sign Up</button>
		<button formAction="/auth/logout">Sign Out</button>
	  </form>
	)
  }