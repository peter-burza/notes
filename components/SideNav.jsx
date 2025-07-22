import { useEffect, useRef } from "react";

export default function SideNav(props) {
  const notes = ["hello sdgfffffffffffffffffffffffffffffffffffffffffffffffffffffff", "world", "hello", "world", "hello", "world", "hello", "world", "hello", "world", "hello", "world", "hello", "world", "hello", "world"];
  const {showNav, setShowNav} = props

  const ref = useRef()

  useEffect(() => {
    // This is the code block that gets executed when our ref changes, (so in this case it's when the reft is assigned)
    // console.log(ref)
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowNav(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // cleanup - unbind the event listener on clean up (so when we close the menu, it will remove the event listener and when we open menu again, it will create new one, but the old one will be gone, and we don't end up with a duplicate...)
      document.removeEventListener('mousedown', handleClickOutside)
    }

  }, [ref])

  return (
    <section ref={ref} className={"nav " + (showNav ? "" : "hidden-nav")}>
      <h1 className="text-title">ECHOES</h1>
      <h6>Thoughts that gently resonate</h6>
      <div className="full-line"></div>
      <button className="new-note-btn">
        <h5>New note</h5>
        <i className="fa-solid fa-plus"></i>
      </button>
      <div className="notes-list">
        {notes.length == 0 ? (
          <p>You have 0 notes.</p>
        ) : (
          notes.map((note, idx) => {
            return (
              <button key={idx} className="card-button-secondary list-btn">
                <p>{note}</p>
                <small>DATETIME</small>
                <div className="delete-btn">
                  <i className="fa-solid fa-trash-can"></i>
                </div>
              </button>
            );
          })
        )}
      </div>
      <div className="full-line"></div>
      <button className="logout-btn">
        <h6>Logout</h6>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
    </section>
  );
}
