"use client";
import Editor from "@/components/Editor";
import MDSyntax from "@/components/MDSyntaxt";
import MDX from "@/components/MDX";
import Modal from "@/components/Modal";
import SideNav from "@/components/SideNav";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotesPage() {
  const [isViewer, setIsViewer] = useState(true);
  // const [text, setText] = useState("");
  const [showNav, setShowNav] = useState(false);
  const [note, setNote] = useState({
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [noteIds, setNoteIds] = useState([]);
  const [savingNote, setSavingNote] = useState(false);
  const [showMDSyntaxt, setShowMDSyntaxt] = useState(false);

  const { currentUser, isLoadingUser } = useAuth();

  const searchParams = useSearchParams();

  function handleToggleViewer() {
    setIsViewer(!isViewer);
  }

  function handleShowMDSyntax() {
    setShowMDSyntaxt(!showMDSyntaxt)
  }

  function handleCreateNote() {
    setNote({
      content: "",
    });
    setIsViewer(false);
    window.history.replaceState(null, "", "/notes"); // this just replace the additional data from URL after '/' by '/notes'
  }

  function handleEditNote(e) {
    setNote({ ...note, content: e.target.value });
  }

  async function handleSaveNote() {
    if (!note?.content) return;
    try {
      setSavingNote(true);
      // see if note already exists in database
      if (note.id) {
        // then we have an existing note cause we have it's id, so write to existing note
        const noteRef = doc(db, "users", currentUser.uid, "notes", note.id);
        await setDoc(
          noteRef,
          {
            ...note,
          },
          { merge: true }
        );
      } else {
        // that means - It's a brand new note and will only contain the content field, so we can basically save a new note to firebase db
        const newId =
          note.content.replaceAll("#", "").slice(0, 15) + "__" + Date.now();
        const notesRef = doc(db, "users", currentUser.uid, "notes", newId);
        const notes = await setDoc(notesRef, {
          content: note.content,
          createdAt: serverTimestamp(),
        });
        setNoteIds((curr) => [...curr, newId]);
        setNote({ ...note, id: newId });
        window.history.pushState(null, "", `?id=${newId}`); // this will push a data into URL after what is already there (in this case '/notes')
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setSavingNote(false);
    }
  }

  useEffect(() => {
    // locally cache in a global context like the onewe already have. you perhaps just need an extra useState
    const value = searchParams.get("id");

    if (!value || !currentUser) return;

    async function fetchNote() {
      if (isLoading) return;
      try {
        setIsLoading(true);
        const noteRef = doc(db, "users", currentUser.uid, "notes", value);
        const snapshot = await getDoc(noteRef);
        const docData = snapshot.exists()
          ? { id: snapshot.id, ...snapshot.data() }
          : null;
        if (docData) {
          setNote({ ...docData });
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNote();
  }, [currentUser, searchParams]);

  if (isLoadingUser) {
    return <h6 className="text-gradient">Loading...</h6>;
  }

  if (!currentUser) {
    // if no user found - then boot them to the home page cause the notes page is for authenticated users only
    window.location.href = "/";
  }

  return (
    <main id="notes">
      {showMDSyntaxt && (
        <Modal handleCloseModal={handleShowMDSyntax}>
          <MDSyntax handleShowMDSyntax={handleShowMDSyntax} />
        </Modal>
      )}
      <SideNav
        showNav={showNav}
        setShowNav={setShowNav}
        noteIds={noteIds}
        setNoteIds={setNoteIds}
        handleCreateNote={handleCreateNote}
        setIsViewer={setIsViewer}
        noteId={note.id}
      />
      {!isViewer && (
        <Editor
          isViewer={isViewer}
          setShowNav={setShowNav}
          handleToggleViewer={handleToggleViewer}
          handleSaveNote={handleSaveNote}
          handleShowMDSyntax={handleShowMDSyntax}
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
          handleShowMDSyntax={handleShowMDSyntax}
          savingNote={savingNote}
          text={note.content}
        />
      )}
    </main>
  );
}
