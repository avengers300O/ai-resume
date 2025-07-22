import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
export const meta = () => [
  { title: "Resumind|Auth" },
  { name: "description", content: "Log into your account" },
];

const auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split('next=')[1]
  const navigate = useNavigate()

  useEffect(()=>{
    if(auth.isAuthenticated) navigate(next)
  },[auth.isAuthenticated, next]);

  return (
    <main className='bg-[url("/images/gb-auth.svg")] bg-cover min-h-screen flex items-center justify-center'>
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col items-center justify-center">
            <h1>Welcome</h1>
            <h3>Log In to continue</h3>
          </div>
          {isLoading ? (
            <button className="auth-button animate-pulse">
              <p className="text-xl">Signing you in...</p>
            </button>
          ) : (
            <>
            {auth.isAuthenticated?(
                <button className="auth-button" onClick={auth.signOut}>
              <p className="text-xl">Sign Out</p>
            </button>
            ):(<button className="auth-button" onClick={auth.signIn}>
              <p className="text-xl">Log in</p>
            </button>)}
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default auth;
