import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Navbar from "~/components/Navbar";
import { resumes } from "constant";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ahead resume anaylizer" },
    { name: "description", content: "ai resume anaylizer" },
  ];
}

export default function Home() {
  const { auth } = usePuterStore();
  const navigate = useNavigate()

  useEffect(()=>{
    if(!auth.isAuthenticated) navigate('/auth?next=/')
  },[auth.isAuthenticated])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover bg-center bg-no-repeat">
      <Navbar></Navbar>
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track You Application & Resume Rating</h1>
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        ) }
      </section>
    </main>
  );
}
