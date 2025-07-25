export default function TopNav(props) {
    const { isViewer, handleToggleViewer, setShowNav, handleSaveNote, savingNote } = props

    return (
        <>
            <div className="notes-btn">
                <button onClick={() => setShowNav(true)} className="card-button-primary menu">
                    <i className="fa-solid fa-bars"></i>   
                </button>
                <button disabled={savingNote} onClick={handleSaveNote} className="card-button-secondary">
                    <h3>{savingNote ? 'Saving...' : 'Save'}</h3>
                    <i className="fa-solid fa-floppy-disk"></i>
                </button>
                <button onClick={handleToggleViewer} className="card-button-secondary">
                    {isViewer ? 
                        <>
                            <h3>Editor</h3>
                            <i className="fa-solid fa-pencil"></i>
                        </> : 
                        <>
                            <h3>Viewer</h3>
                            <i className="fa-solid fa-check-double"></i>
                        </> 
                    }                     
                </button>
            </div>
            <div className="full-line"></div>
        </>
    )
}