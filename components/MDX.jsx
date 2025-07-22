import TopNav from "./TopNav"

export default function MDX(props) {
    const md = `
        # This is a header 1
        ## This is a header 2

        hello world

        [click me](https://www.google.com)
    `
    
    return (
        <section className="mdx-container">
            <TopNav {...props} />
        </section>
    )

}