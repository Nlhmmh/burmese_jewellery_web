export default function AdminLogin() {
  return (
    <main>
      <div className="flex justify-center">
        <div className="card shadow-xl w-5/12">
          <div className="card-body">
            <h2 className="card-title justify-center">
              Login as Admin Account
            </h2>
            <div className="divider"></div>

            <label className="form-control w-full max-w">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered"
              />
              <div className="h-2"></div>

              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                placeholder="Enter your password"
                className="input input-bordered"
              />
            </label>

            <div className="divider"></div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
