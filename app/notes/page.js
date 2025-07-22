'use client'
import Editor from "@/components/Editor";
import MDX from "@/components/MDX";
import SideNav from "@/components/SideNav";
import { useState } from "react";

export default function NotesPage() {
  const [isViewer, setIsViewer ] = useState(true);
  const [text, setText] = useState('')
  const [showNav, setShowNav] = useState(false);

  function handleToggleViewer() {
    setIsViewer(!isViewer)
  }

  // function handleToggleMenu() {
  //   setShowNav(!showNav)
  // }

  return (
    <main id="notes">
      <SideNav showNav={showNav} setShowNav={setShowNav} />
      {!isViewer && <Editor isViewer={isViewer} setShowNav={setShowNav} handleToggleViewer={handleToggleViewer} text={text} setText={setText} />}
      {isViewer && <MDX isViewer={isViewer} setShowNav={setShowNav} handleToggleViewer={handleToggleViewer} text={text} />}
    </main>
  );
}
