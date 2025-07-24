import { useEffect, useState } from "react"
import { randomMotto } from "../app/utils"
import TopNav from "./TopNav"

export default function Editor(props) {
    const {text, setText} = props
    const [motto, setMotto] = useState('')

    useEffect(() => {
        setMotto(randomMotto())
    }, [])
    
    return (
        <section className="notes-container">
            <TopNav {...props} />
            <textarea value={text} onChange={setText} placeholder={motto} />
        </section>
    )

}