import { Button } from "@nextui-org/react";
import JoditEditor from "jodit-react";
import { useMemo } from "react";

const TextEditor = ({ editor, content, setContent }) => {
  // Define Jodit editor configuration
  const config = useMemo(
    () => ({
      theme: "dark",
      readonly: false,
    }),
    []
  );

  return (
    <div className="no-tailwindcss">
      <JoditEditor
        ref={editor}
        config={config}
        value={content}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
        onChange={(newContent) => setContent(newContent)}
        options={{
          theme: "dark",
        }}
      />
      <Button
        color="primary"
        onPress={() => {
          console.log(content);
        }}
      >
        Button
      </Button>
    </div>
  );
};

export default TextEditor;
