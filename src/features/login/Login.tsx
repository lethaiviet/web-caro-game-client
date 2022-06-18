import { SyntheticEvent } from "react";

interface loginForm {
  username: { value: string };
  password: { value: string };
}

export default function Login() {
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const target = e.target as typeof e.target & loginForm;

    console.log(target.password.value, target.username.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
