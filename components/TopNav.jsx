export default function TopNav(props) {
    const { isViewer } = props

    return (
        <>
            <div className="notes-btn">
                <button className="card-button-primary menu">
                    <i className="fa-solid fa-bars"></i>   
                </button>
                <button className="card-button-secondary">
                    <h3>Save</h3>
                    <i className="fa-solid fa-floppy-disk"></i>
                </button>
                <button className="card-button-secondary">
                    {isViewer ? 
                        <>
                        <h3>Viewer</h3>
                            <i className="fa-solid fa-check-double"></i>
                        </> : 
                        <>
                            <h3>Editor</h3>
                            <i className="fa-solid fa-pencil"></i>
                        </> 
                    }                     
                </button>
            </div>
            <div className="full-line"></div>
        </>
    )
}