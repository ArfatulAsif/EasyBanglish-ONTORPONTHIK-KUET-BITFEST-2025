import JoditEditor from "jodit-react";
import { useMemo } from "react";

const TextEditor = ({ editor, content, setContent }) => {
  // Define Jodit editor configuration
  const config = useMemo(
    () => ({
      theme: "dark",
      readonly: false,
      height: 300,
      controls: {
        font: {
          list: {
            Kalpurush: "Kalpurush",
            "Adorsho Lipi": "adorsho-lipi",
            BenSen: "BenSen",
            "BenSen Handwriting": "BenSenHandwriting",
            Mitra: "Mitra",
            Mukti: "Mukti",
            Lohit: "Lohit",
            "Nikosh Light": "Nikosh Light",
            "Noto Sans Bengali": "Noto Sans Bengali",
            Arial: "Arial",
            "Courier New": "Courier New",
          },
        },
      },
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
    </div>
  );
};

export default TextEditor;
