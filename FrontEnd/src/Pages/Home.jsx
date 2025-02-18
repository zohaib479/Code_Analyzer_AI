import React, { useState } from "react";
import axios from "axios";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "prismjs/themes/prism-tomorrow.css";
import '../App.css'

function Home() {
  const [review, setReview] = useState("");
  const [code, setCode] = useState(`cout<<"WRITE YOUR CODE HERE";`);
  const [language, setLanguage] = useState("javascript");
  const [isLoading, setIsLoading] = useState(false);

  const reviewCode = async () => {
   setReview("")
    setIsLoading(true);

    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 12000); 


    await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate 2 seconds delay

    try {
      console.log("Sending Code:", code);
      const response = await axios.post("https://purebackend-production.up.railway.app/ai/get-review", { code });
      console.log("Response:", response.data);
      setReview(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setIsLoading(false);
    }
  };
  return (
    <>
      <main>
        <div className="left">
          <select onChange={(e) => setLanguage(e.target.value)} value={language}>
            <option value="cpp">C++</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
            <option value="react">React</option>
            <option value="css">CSS</option>
            <option value="r">R</option>
            <option value="react-native">React Native</option>
            <option value="c">C</option>
            <option value="dotnet">.NET Core</option>
            <option value="flutter">Flutter</option>
          </select>

          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                Prism.languages[language]
                  ? Prism.highlight(code, Prism.languages[language], language)
                  : Prism.highlight(code, Prism.languages.javascript, "javascript") // Default to JavaScript
              }
              padding={10}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 15,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "auto", // Allow dynamic height
                maxHeight: "calc(100vh - 100px)", // Adjust based on your layout
                width: "100%",
                overflow: "auto", // Enable scrolling if content exceeds max-height
              }}
            />
          </div>

          <button className="review" onClick={reviewCode}>
            {isLoading ? "Analyzing..." : "Analyze"}
          </button>
        </div>

        <div className="right">
          <div className={`loader ${isLoading ? "show" : ""}`}></div> {/* Loader element */}
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>
    </>
  );
}

export default Home;
