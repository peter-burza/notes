import Markdown from "markdown-to-jsx";

export default function MDSyntax(props) {
  const { handleShowMDSyntax } = props
  return (
    <div className="markdown-container">
      <button className="close-button card-button-secondary" onClick={handleShowMDSyntax}>
        <i class="fa-solid fa-xmark"></i>
      </button>
      <h2>Basic Markdown syntax</h2>
      <div className="md-headings-section">
        <div className="heading-plus-description">
          <h3>Headings</h3>
          <p>
            To create a heading, add number signs (#) in front of a word or
            phrase. The number of number signs you use should correspond to the
            heading level. For example, to create a heading level three
            (&lt;h3&gt;), use three number signs (e.g., ### My Header).
          </p>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <p>Markdown</p>
                </th>
                <th>
                  <p>Rendered Output</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p># Heading level 1</p>
                </td>
                <td>
                  <h1>Heading level 1</h1>
                </td>
              </tr>
              <tr>
                <td>
                  <p># Heading level 2</p>
                </td>
                <td>
                  <h2>Heading level 2</h2>
                </td>
              </tr>
              <tr>
                <td>
                  <p># Heading level 3</p>
                </td>
                <td>
                  <h3>Heading level 3</h3>
                </td>
              </tr>
              <tr>
                <td>
                  <p># Heading level 4</p>
                </td>
                <td>
                  <h4>Heading level 4</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <p># Heading level 5</p>
                </td>
                <td>
                  <h5>Heading level 5</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <p># Heading level 6</p>
                </td>
                <td>
                  <h6>Heading level 6</h6>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="heading-plus-description">
          <h3>Bold</h3>
          <p>
            To bold text, add two asterisks or underscores before and after a
            word or phrase. To bold the middle of a word for emphasis, add two
            asterisks without spaces around the letters.
          </p>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <p>Markdown</p>
                </th>
                <th>
                  <p>Rendered Output</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>I just love **bold text**.</p>
                </td>
                <td>
                  <p>
                    I just love <strong>bold text</strong>.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Love**is**bold</p>
                </td>
                <td>
                  <p>
                    Love<strong>is</strong>bold
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="heading-plus-description">
          <h3>Italic</h3>
          <p>
            To italicize text, add one asterisk or underscore before and after a
            word or phrase. To italicize the middle of a word for emphasis, add
            one asterisk without spaces around the letters.
          </p>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <p>Markdown</p>
                </th>
                <th>
                  <p>Rendered Output</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>Italicized text is the *cat's meow*.</p>
                </td>
                <td>
                  <p>
                    Italicized text is the <i>cat's meow</i>.
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>A*cat*meow</p>
                </td>
                <td>
                  <p>
                    A<i>cat</i>meow
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <div className="heading-plus-description">
          <h3>Blockquotes</h3>
          <p>To create a blockquote, add a &gt; in front of a paragraph.</p>
        </div>
        <div>
          <p>&gt; Dorothy followed her through many of the beautiful rooms in her castle.</p>
          <p>The rendered output looks like this:</p>
          <Markdown>
            {"> Dorothy followed her through many of the beautiful rooms in her castle."}
          </Markdown>
        </div> */}

        <div className="heading-plus-description">
          <h3>Unordered Lists</h3>
          <p>
            To create an unordered list, add dashes (-), or asterisks (*) in
            front of line items. Indent one or more items to create a nested
            list.
          </p>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <p>Markdown</p>
                </th>
                <th>
                  <p>Rendered Output</p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>- First item</p>
                </td>
                <td>
                  {/* <p> */}
                    <Markdown>{"- First item"}</Markdown>
                  {/* </p> */}
                </td>
              </tr>
              <tr>
                <td>
                  <p>* Second item</p>
                </td>
                <td>
                  {/* <p> */}
                    <Markdown>{"* Second item"}</Markdown>
                  {/* </p> */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <p>
        If you need more information about Markdown syntax - check{" "}
        <a>https://www.markdownguide.org/basic-syntax/</a>
      </p>

      <div className="md-headings-section"></div>
    </div>
  );
}
