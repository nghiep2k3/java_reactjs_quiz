import React, { useState, useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { autocompletion, completeFromList } from "@codemirror/autocomplete";

// Danh sách gợi ý API JavaScript
const jsCompletions = completeFromList([
  { label: "alert()", type: "function", detail: "Hiển thị hộp thoại cảnh báo" },
  { label: "console.log()", type: "function", detail: "In dữ liệu ra console" },
  { label: "setTimeout()", type: "function", detail: "Hàm hẹn giờ" },
  { label: "setInterval()", type: "function", detail: "Hàm chạy lặp sau khoảng thời gian" },
  { label: "document.getElementById()", type: "function", detail: "Tìm phần tử theo ID" },
]);

const CodeEditor = () => {
  const [code, setCode] = useState("// Viết code tại đây...");
  const [output, setOutput] = useState("");
  const iframeRef = useRef(null);

  // Xử lý thay đổi code
  const onChange = (value) => {
    setCode(value);
  };

  // Chạy code và hiển thị kết quả
  const runCode = () => {
    try {
      // Tạo iframe để chạy code an toàn
      const iframe = iframeRef.current;
      const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      
      // Xóa output cũ
      iframeDocument.open();
      iframeDocument.write(`
        <html>
          <body>
            <script>
              try {
                const consoleLog = [];
                const originalConsoleLog = console.log;
                
                console.log = function (...args) {
                  consoleLog.push(args.join(' '));
                  originalConsoleLog.apply(console, args);
                };

                ${code}

                document.body.innerHTML = "<pre>" + consoleLog.join('\\n') + "</pre>";
              } catch (err) {
                document.body.innerHTML = "<pre style='color: red;'>Lỗi: " + err.message + "</pre>";
              }
            <\/script>
          </body>
        </html>
      `);
      iframeDocument.close();
    } catch (err) {
      setOutput("Lỗi: " + err.message);
    }
  };

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", padding: "10px" }}>
      {/* Code Editor */}
      <div style={{ flex: 1, borderRight: "1px solid #ccc", paddingRight: "10px" }}>
        <h3>JavaScript Editor</h3>
        <CodeMirror
          value={code}
          height="400px"
          theme={oneDark}
          extensions={[javascript({ jsx: true }), autocompletion({ override: [jsCompletions] })]}
          onChange={onChange}
        />
        <button onClick={runCode} style={{ marginTop: "10px", padding: "8px 12px", cursor: "pointer" }}>
          Chạy Code
        </button>
      </div>

      {/* Kết quả biên dịch */}
      <div style={{ flex: 1, paddingLeft: "10px" }}>
        <h3>Output</h3>
        <iframe ref={iframeRef} style={{ width: "100%", height: "400px", border: "1px solid #ccc" }}></iframe>
      </div>
    </div>
  );
};

export default CodeEditor;
