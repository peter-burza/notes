"use client";
import Editor from "@/components/Editor";
import MDX from "@/components/MDX";
import SideNav from "@/components/SideNav";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function NotesPage() {
  const [isViewer, setIsViewer] = useState(true);
  // const [text, setText] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [note, setNote] = useState({
    content: ''
  })
  const [noteIds, setNoteIds] = useState([])
  const [savingNote, setSavingNote] = useState(false)

  const { currentUser, isLoadingUser } = useAuth();

  function handleToggleViewer() {
    setIsViewer(!isViewer);
  }

  function handleCreateNote() {
    setNote({
      content: ''
    })
  }

  function handleEditNote(e) {
    setNote({ ...note, content: e.target.value })
  }

  async function handleSaveNote() {
    if (!note?.content) return
    try {
      setSavingNote(true)
      // see if note already exists in database
      if (note.id) {
        // then we have an existing note cause we have it's id, so write to existing note
        const noteRef = doc(db, 'users', currentUser.uid, 'notes', note.id)
        await setDoc(noteRef, {
          ...note
        }, { merge: true })
      } else {
        // that means - It's a brand new note and will only contain the content field, so we can basically save a new note to firebase db
        const newId = note.content.slice(0, 15) + '__' + Date.now()
        const notesRef = doc(db, 'users', currentUser.uid, 'notes', newId)
        const notes = await setDoc(notesRef, {
          content: note.content,
          createdAt: serverTimestamp()
        })
        setNote({ ...note, id: newId})
      }
    } catch (error) {
      console.log(error.message)
    } finally {
      setSavingNote(false)
    }
  }

  // function handleToggleMenu() {
  //   setShowNav(!showNav)
  // }

  if (isLoadingUser) {
    return <h6 className="text-title">Loading...</h6>;
  }

  if (!currentUser) {
    // if no user found - then boot them to the home page cause the notes page is for authenticated users only
    window.location.href = "/";
  }

  return (
    <main id="notes">
      <SideNav showNav={showNav} setShowNav={setShowNav} noteIds={noteIds} setNoteIds={setNoteIds} />
      {!isViewer && (
        <Editor
          isViewer={isViewer}
          setShowNav={setShowNav}
          handleToggleViewer={handleToggleViewer}
          handleSaveNote={handleSaveNote}
          savingNote={savingNote}
          text={note.content}
          setText={handleEditNote}
        />
      )}
      {isViewer && (
        <MDX
          isViewer={isViewer}
          setShowNav={setShowNav}
          handleToggleViewer={handleToggleViewer}
          handleSaveNote={handleSaveNote}
          savingNote={savingNote}
          text={note.content}
        />
      )}
    </main>
  );
}
