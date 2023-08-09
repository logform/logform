import Link from "next/link";
import { useState, DragEvent, ReactNode } from "react";
import { BiPlus } from "react-icons/bi";
import { FaShareNodes } from "react-icons/fa6";
import {
  MdAlternateEmail,
  MdArrowBack,
  MdOutlineCloudUpload,
  MdShortText,
} from "react-icons/md";
import { LuText } from "react-icons/lu";
import { BsImages, BsListCheck } from "react-icons/bs";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FieldTypeProps, FieldTypes, QuestionProps } from "@/interfaces";

const Create = () => {
  const [sidebarTabType, setSidebarTabType] = useState<
    "question" | "field-types"
  >("question");

  const [questions, setQuestion] = useState<QuestionProps[]>([
    {
      index: 1,
      type: "short-text",
      label: "What is your name?",
      required: true,
    },
    {
      index: 2,
      type: "email",
      label: "Enter your email",
      required: false,
    },
  ]);

  const fieldTypes: FieldTypeProps[] = [
    {
      icon: <MdShortText />,
      text: "Short text",
      color: "#fcbf16",
      type: "short-text",
    },
    {
      icon: <LuText />,
      text: "Long text",
      color: "#237add",
      type: "long-text",
    },
    {
      icon: <BsListCheck />,
      text: "Multiple choice",
      color: "#e8023f",
      type: "multiple-choice",
    },
    {
      icon: <MdOutlineCloudUpload />,
      text: "File upload",
      color: "#2853c9",
      type: "file-upload",
    },
    {
      icon: <MdAlternateEmail />,
      text: "Email",
      color: "#a9f931",
      type: "email",
    },
    {
      icon: <BsImages />,
      text: "Picture choice",
      color: "#d82bb8",
      type: "picture-choice",
    },
  ];

  const [selectedQuestion, setSelectedQuestion] = useState<QuestionProps>(
    questions[0]
  );

  const switchIconCase = (type: FieldTypes) => {
    switch (type) {
      case "short-text":
        return <MdShortText />;
      case "long-text":
        return <LuText />;
      case "multiple-choice":
        return <BsListCheck />;
      case "file-upload":
        return <MdOutlineCloudUpload />;
      case "email":
        return <MdAlternateEmail />;
      case "picture-choice":
        return <BsImages />;
      default:
        return <MdShortText />;
    }
  };

  const switchBackgroundColorCase = (type: FieldTypes) => {
    switch (type) {
      case "short-text":
        return "#fcbf16";
      case "long-text":
        return "#237add";
      case "multiple-choice":
        return "#e8023f";
      case "file-upload":
        return "#2853c9";
      case "email":
        return "#a9f931";
      case "picture-choice":
        return "#d82bb8";
      default:
        return "#fcbf16";
    }
  };
  const handleOnDrag = (e: DragEvent, fieldType: FieldTypes) => {
    e.dataTransfer?.setData("fieldType", fieldType);
  };

  const [grabbing, setGrabbing] = useState(false);

  const hanldeOnDrop = (e: DragEvent) => {
    const fieldType = e.dataTransfer?.getData("fieldType") as FieldTypes;
    if (fieldType) {
      setQuestion([
        ...questions,
        {
          index: questions.length + 1,
          type: fieldType,
          label: "",
          required: false,
        },
      ]);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setGrabbing(true);
  };

  return (
    <>
      <div className="px-4 border-b-2 border-gray-500/40 flex items-center justify-between h-20">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/forms" className="">
            <MdArrowBack className="text-4xl bg-gray-500/40 rounded-full p-2" />
          </Link>
          <input
            type="text"
            placeholder="Title"
            className="text-lg font-semibold outline-gray-500 pl-2"
          />
        </div>
        <div className="flex items-center gap-5 font-semibold">
          <button>
            <FaShareNodes />
          </button>
          <button>Preview</button>
          <button className="bg-black/80 rounded-full px-6 py-2 text-white">
            Publish
          </button>
        </div>
      </div>
      <div className="w-full flex gap-2 h-[calc(100vh-5rem)]">
        <div className="px-2 w-[20%] border-r-2 border-gray-200 h-full">
          <div className="flex items-center justify-between px-2 py-3">
            <button
              onClick={() =>
                sidebarTabType === "field-types" &&
                setSidebarTabType("question")
              }
              className={`${
                sidebarTabType === "question"
                  ? "border-black"
                  : "border-transparent hover:border-black/30"
              } border-b-2 px-5 transition-colors font-semibold text-sm`}
            >
              Questions
            </button>
            <button
              onClick={() =>
                sidebarTabType === "question" &&
                setSidebarTabType("field-types")
              }
              className={`${
                sidebarTabType === "field-types"
                  ? "border-black"
                  : "border-transparent hover:border-black/30"
              } border-b-2 px-5 transition-colors font-semibold text-sm`}
            >
              Field Types
            </button>
          </div>
          {sidebarTabType === "question" && (
            <>
              {questions.map((question, i) => (
                <button
                  key={i}
                  className="flex w-full items-center gap-3 px-2 py-2 text-sm bg-gray-100 my-2 rounded-md font-semibold"
                >
                  <div
                    className="p-2 rounded-md text-lg relative"
                    style={{
                      backgroundColor: switchBackgroundColorCase(question.type),
                    }}
                  >
                    {switchIconCase(question.type)}
                    <small className="absolute top-[1px] left-[2px] text-xs">
                      {question.index}
                      {question.required ? "*" : ""}
                    </small>
                  </div>
                  {question.label}
                </button>
              ))}
            </>
          )}
          {sidebarTabType === "field-types" && (
            <>
              {fieldTypes.map((field, i) => (
                <button
                  key={i}
                  className="flex w-full items-center gap-3 px-2 py-2 text-sm bg-gray-100 my-2 rounded-md font-semibold hover:cursor-grab focus"
                  draggable
                  onDragStart={(e) => handleOnDrag(e, field.type)}
                >
                  <div
                    className="p-2 rounded-md text-lg"
                    style={{
                      backgroundColor: field.color,
                    }}
                  >
                    {field.icon}
                  </div>
                  {field.text}
                </button>
              ))}
            </>
          )}
        </div>
        <div
          className="w-[55%] h-full"
          onDrop={hanldeOnDrop}
          onDragOver={handleDragOver}
        >
          Main area
        </div>
        <div className="w-[25%] h-full">options</div>
      </div>
    </>
  );
};

export default Create;
