export default function Login() {
  return (
    <main>
      <div className="flex justify-center">
        <div className="card shadow-xl w-5/12">
          <div className="card-body">
            <h2 className="card-title justify-center">Create an account</h2>
            <div className="divider"></div>
            <p>
              Creating an account offers convenience, allowing you to streamline
              checkout, access your shopping bag across devices, and easily
              review your order history.
            </p>
            <div className="h-2"></div>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full max-w"
              />
            </label>

            <div className="divider"></div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary">Register</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
