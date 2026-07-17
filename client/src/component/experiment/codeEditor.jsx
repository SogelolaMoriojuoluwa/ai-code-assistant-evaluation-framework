import Editor from "@monaco-editor/react";

export default function CodeEditor({
  code,
  setCode,
  disabled,
}) {
  return (
    <Editor
      height="450px"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={code}
      onChange={(value) => setCode(value)}
      options={{
        minimap: {
          enabled: false,
        },
        fontSize: 15,
        readOnly: disabled,
        scrollBeyondLastLine: false,
      }}
    />
  );
}