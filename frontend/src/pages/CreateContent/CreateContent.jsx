import { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { TiDocumentAdd } from "react-icons/ti";
import TextEditor from "./TextEditor";
import SpeechRecognition from "./SpeechRecognition";
import { Button } from "@nextui-org/react";
import axiosInstance from "../../utils/axiosInstance";
import { MdErrorOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router";

const CreateContent = () => {
  const [loading, setLoading] = useState();
  const [spellingMistakes, setSpellingMistakes] = useState([]);

  // Breadcrumb links
  const breadcrumbLinks = [
    {
      text: "Content Management",
      to: "/dashboard/content-management",
      icon: MdOutlineDocumentScanner,
    },
    {
      text: "Create New Content",
      to: "/dashboard/content-management/new-content",
      icon: TiDocumentAdd,
    },
  ];

  // Refs
  const editor = useRef(null);

  // States
  const [content, setContent] = useState("");
  const { id } = useParams();

  // hooks
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
  }, [id]);

  const handleTranslate = () => {
    setLoading(true);

    axiosInstance
      .post(`/ai/content-convert?token=${localStorage.getItem("token")}`, {
        prompt: content,
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setContent(res.data.bangla);
        setSpellingMistakes(res.data.spelling || null);
        toast.success("Content translated successfully.");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleSaveAndExport = () => {
    setLoading(true);

    console.log(content);
    axiosInstance
      .post(`/ai/generate-pdf?token=${localStorage.getItem("token")}`, {
        text: JSON.stringify(content),
        tags: [],
        visibility: "public",
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        toast.success("Content saved and exported!");
        navigate("/dashboard/content-management/all-contents");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      <div>
        <PageHeader breadcrumbLinks={breadcrumbLinks} />
      </div>

      <div className="p-4">
        <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
          <MdOutlineDocumentScanner className="text-3xl text-primary" />
          <span className="font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Create New Content
          </span>
        </h1>
        <div>
          <SpeechRecognition content={content} setContent={setContent} />
        </div>
        <TextEditor editor={editor} content={content} setContent={setContent} />

        <div className="flex gap-2 items-center my-6 justify-end">
          <Button
            isLoading={loading}
            color="primary"
            onPress={() => {
              handleTranslate();
            }}
          >
            Translate
          </Button>
          <Button
            isLoading={loading}
            color="primary"
            variant="shadow"
            onPress={() => {
              handleSaveAndExport();
            }}
          >
            Save
          </Button>
        </div>

        {spellingMistakes && spellingMistakes.length > 0 && (
          <div>
            <h1 className="text-xl flex gap-3 items-center justify-center h-full mt-4 mb-8">
              <MdErrorOutline className="text-3xl text-primary" />
              <span className="font-bold bg-gradient-to-r from-amber-500 to-red-500  bg-clip-text text-transparent">
                Spelling Mistakes
              </span>
            </h1>
            <p>
              {spellingMistakes.map((sm, idx) => {
                return (
                  <h2 key={sm.wrong}>
                    <span className="text-primary font-bold">{idx + 1}</span> -
                    Wrong: <span className="text-warning">{sm.wrong}</span>{" "}
                    Correction:{" "}
                    <span className="text-green-500"> {sm.correction}</span>
                  </h2>
                );
              })}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateContent;
