"use client";

import { useTranslations } from "next-intl";

export default function AdminLogin() {
  const t = useTranslations("AdminLogin");

  const onClickLogin = () => {
    console.log("increment like count");
  };

  return (
    <main>
      <div className="flex justify-center">
        <div className="card shadow-xl w-5/12">
          <div className="card-body">
            <h2 className="card-title justify-center">{t("title")}</h2>

            <div className="divider" />

            <label className="form-control w-full max-w">
              <div className="label">
                <span className="label-text">{t("name")}</span>
              </div>
              <input
                type="text"
                placeholder={t("enter-your-name")}
                className="input input-bordered"
              />
              <div className="h-2"></div>

              <div className="label">
                <span className="label-text">{t("password")}</span>
              </div>
              <input
                type="text"
                placeholder={t("enter-your-password")}
                className="input input-bordered"
              />
            </label>

            <div className="divider" />

            <div className="card-actions justify-center">
              <button className="btn btn-primary w-full" onClick={onClickLogin}>
                {t("login")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
