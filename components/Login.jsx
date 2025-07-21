export default function Login() {
  return (
    <>
      <div className="login-container">
        <h1 className="text-title">ECHOES</h1>
        <h2>Thoughts that gently resonate</h2>
        <p>Create a personal library of neatly organized and searchable notes and ideas.</p>
        <div className="full-line"></div>
        <h3>Sign in</h3>
        <div>
            <p>Email</p>
            <input type="text" placeholder="Enter your email adress" />
        </div>
        <div>
            <p>Password</p>
            <input type="password" placeholder="*******" />
        </div>
        <button className="submit-btn">
            <h3>Submit</h3>
            <h3 className="arrow">-&gt;</h3>
        </button>
        <div className="secondary-btns-container">
            <button className="card-button-secondary">
                <small>Log in</small>
            </button>
            <button className="card-button-secondary">
                <small>Forgot password?</small>
            </button>
        </div>
        <div className="full-line"></div>
        <footer>
            <a target="_blank" href="https://github.com/peter-burza/echoes">
              <img alt="pfp" src="https://avatars.githubusercontent.com/u/18643421?v=4" />
              <h6>@peter-burza</h6>
              <i className="fa-brands fa-github"></i>
            </a>
        </footer>
      </div>
    </>
  );
}
