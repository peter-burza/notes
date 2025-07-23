'use client'
import Editor from "@/components/Editor";
import MDX from "@/components/MDX";
import SideNav from "@/components/SideNav";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function NotesPage() {
  const [isViewer, setIsViewer ] = useState(true);
  const [text, setText] = useState('')
  const [showNav, setShowNav] = useState(false);

  const { currentUser, isLoadingUser } = useAuth()

  function handleToggleViewer() {
    setIsViewer(!isViewer)
  }

  // function handleToggleMenu() {
  //   setShowNav(!showNav)
  // }

  
  if (isLoadingUser) {
    return (
      <h6 className="text-title">Loading...</h6>
    )
  }

  if (!currentUser) {
    // if no user found - then boot them to the home page cause the notes page is for authenticated users only
    window.location.href = '/'
  }

  return (
    <main id="notes">
      <SideNav showNav={showNav} setShowNav={setShowNav} />
      {!isViewer && <Editor isViewer={isViewer} setShowNav={setShowNav} handleToggleViewer={handleToggleViewer} text={text} setText={setText} />}
      {isViewer && <MDX isViewer={isViewer} setShowNav={setShowNav} handleToggleViewer={handleToggleViewer} text={text} />}
    </main>
  );
}
