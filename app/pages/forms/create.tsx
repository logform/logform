import Link from "next/link";
import { useState, DragEvent } from "react";
import { FaShareNodes } from "react-icons/fa6";
import {
  MdAlternateEmail,
  MdArrowBack,
  MdOutlineCloudUpload,
  MdShortText,
} from "react-icons/md";
import { LuText } from "react-icons/lu";
import { BsImages, BsListCheck } from "react-icons/bs";
import { FieldTypeProps, FieldTypes, QuestionProps } from "@/interfaces";
import TextSettings from "@/components/dashboard/form/field-types/Text/Settings";
import Switch from "@/components/dashboard/form/Switch";
import Flex from "@/components/dashboard/form/Flex";
import { useEffect } from "react";
import useHref from "use-href";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { RxSwitch } from "react-icons/rx";
import MultipleChoice from "@/components/dashboard/form/field-types/MultipleChoice";
import _, { set } from "lodash";
import PictureChoice from "@/components/dashboard/form/field-types/PictureChoice";
import Head from "next/head";
import axios from "axios";
import { toast } from "react-toastify";

type SidebarTabTypes = "question" | "field-types";

const Create = () => {
  const [sidebarTabType, setSidebarTabType] =
    useState<SidebarTabTypes>("question");

  const { getQueryParam, addQueryParam, deleteQueryParam } = useHref();
  const [formTitle, setFormTitle] = useState<string>("");

  useEffect(() => {
    const tab = getQueryParam("tab") as SidebarTabTypes;
    setSidebarTabType(tab || "question");
  }, []);

  const [questions, setQuestions] = useState<QuestionProps[]>([
    {
      index: 1,
      type: "short_text",
      label: "",
      required: false,
    },
  ]);

  const fieldTypes: FieldTypeProps[] = [
    {
      icon: <MdShortText />,
      text: "Short text",
      color: "#fcbf16",
      type: "short_text",
    },
    {
      icon: <LuText />,
      text: "Long text",
      color: "#237add",
      type: "long_text",
    },
    {
      icon: <BsListCheck />,
      text: "Multiple choice",
      color: "#e8023f",
      type: "multiple_choice",
    },
    {
      icon: <MdOutlineCloudUpload />,
      text: "File upload",
      color: "#2853c9",
      type: "file_upload",
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
      type: "picture_choice",
    },
    {
      icon: <RxSwitch />,
      text: "Yes/No",
      color: "#b07de8",
      type: "yes_no",
    },
  ];

  const [selectedQuestion, setSelectedQuestion] = useState<QuestionProps>(
    questions[0]
  );

  const switchIconCase = (type: FieldTypes) => {
    switch (type) {
      case "short_text":
        return <MdShortText />;
      case "long_text":
        return <LuText />;
      case "multiple_choice":
        return <BsListCheck />;
      case "file_upload":
        return <MdOutlineCloudUpload />;
      case "email":
        return <MdAlternateEmail />;
      case "picture_choice":
        return <BsImages />;
      case "yes_no":
        return <RxSwitch />;
    }
  };

  const switchBackgroundColorCase = (type: FieldTypes) => {
    switch (type) {
      case "short_text":
        return "#fcbf16";
      case "long_text":
        return "#237add";
      case "multiple_choice":
        return "#e8023f";
      case "file_upload":
        return "#2853c9";
      case "email":
        return "#a9f931";
      case "picture_choice":
        return "#d82bb8";
      case "yes_no":
        return "#b07de8";
    }
  };

  const switchFieldTypeCase = (type: FieldTypes) => {
    switch (type) {
      case "short_text":
        return "Short text";
      case "long_text":
        return "Long text";
      case "multiple_choice":
        return "Multiple choice";
      case "file_upload":
        return "File upload";
      case "email":
        return "Email";
      case "picture_choice":
        return "Picture choice";
      case "yes_no":
        return "Yes/No";
    }
  };

  const [showDropZone, setShowDropZone] = useState<boolean>(false);

  const handleOnDrag = (e: DragEvent, fieldType: FieldTypes) => {
    e.dataTransfer?.setData("fieldType", fieldType);
    setShowDropZone(true);
  };

  const hanldeOnDrop = (e: DragEvent) => {
    const fieldType = e.dataTransfer?.getData("fieldType") as FieldTypes;

    const newQuestion: any = {
      index: questions.length + 1,
      label: "",
      required: false,
      type: fieldType,
      ...getSpecificQuestionProps(fieldType),
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestion(newQuestion);
  };

  const getSpecificQuestionProps = (
    type: FieldTypes
  ): Partial<QuestionProps> => {
    switch (type) {
      case "short_text":
        return {};
      case "multiple_choice":
        return {
          options: [
            {
              index: 1,
              value: "Option 1",
            },
          ],
        };
      case "yes_no":
        return {};
      case "file_upload":
        return {
          accept: "pdf",
          maxFileSize: 10,
        };
      case "email":
        return {};
      case "long_text":
        return {};
      case "picture_choice":
        return { options: [{ src: "", label: "" }] };
      default:
        return {};
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const updatedQuestions = questions.map((question) =>
      question.index === selectedQuestion.index ? selectedQuestion : question
    );

    setQuestions(updatedQuestions);
  }, [selectedQuestion]);

  const [enforceMaxCharacters, setEnforceMaxCharcters] = useState<{
    enforce: boolean;
    for: number | null;
  }>({
    enforce: false,
    for: null,
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newQuestions = Array.from(questions);

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const [draggedQuestion] = newQuestions.splice(sourceIndex, 1);
    newQuestions.splice(destinationIndex, 0, draggedQuestion);

    newQuestions.forEach((question, index) => {
      question.index = index + 1;
    });

    setQuestions(newQuestions);
  };

  const handlePublish = async () => {
    try {
      const { data } = await axios.post("/api/form/publish", {
        title: formTitle,
        questions,
      });
      toast.success("Published!!!");
      console.log(data);
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <>
      <Head>
        <title>Logform • Build</title>
      </Head>
      <div className="px-4 border-b-2 border-gray-500/40 flex items-center justify-between h-20">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/forms" className="">
            <MdArrowBack className="text-4xl bg-gray-500/40 rounded-full p-2" />
          </Link>
          <input
            type="text"
            placeholder="Title"
            className="text-lg font-semibold outline-gray-500 pl-2"
            onChange={(e) => setFormTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-5 font-semibold">
          <button>
            <FaShareNodes />
          </button>
          <button>Preview</button>
          <button
            className="bg-black/80 rounded-full px-6 py-2 text-white"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
      <div className="w-full flex gap-2 h-[calc(100vh-5rem)]">
        <div className="px-2 w-[20%] border-r-2 border-gray-200 h-full">
          <div className="flex items-center justify-between px-2 py-3">
            <button
              onClick={() => {
                sidebarTabType === "field-types" &&
                  setSidebarTabType("question");
                if (getQueryParam("tab") === "field-types") {
                  deleteQueryParam("tab");
                }
              }}
              className={`${
                sidebarTabType === "question"
                  ? "border-black"
                  : "border-transparent hover:border-black/30"
              } border-b-2 px-5 transition-colors font-semibold text-sm`}
            >
              Questions
            </button>
            <button
              onClick={() => {
                sidebarTabType === "question" &&
                  setSidebarTabType("field-types");
                addQueryParam("tab", "field-types");
              }}
              className={`${
                sidebarTabType === "field-types"
                  ? "border-black"
                  : "border-transparent hover:border-black/30"
              } border-b-2 px-5 transition-colors font-semibold text-sm`}
            >
              Field Types
            </button>
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            {sidebarTabType === "question" && (
              <div className="overflow-y-auto h-[90%] custom-scrollbar">
                <Droppable droppableId="questions">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {questions.map((question, index) => (
                        <Draggable
                          key={question.index}
                          draggableId={question.index.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              className="flex w-full items-center gap-3 px-2 py-2 text-sm bg-gray-100 my-2 rounded-md font-semibold"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() => setSelectedQuestion(question)}
                            >
                              <div
                                className="p-2 rounded-md text-lg relative"
                                style={{
                                  backgroundColor: switchBackgroundColorCase(
                                    question.type
                                  ),
                                }}
                              >
                                {switchIconCase(question.type)}
                                <small className="absolute -top-[7px] left-[2.5px] text-[10px]">
                                  {question.index}
                                  {question.required ? "*" : ""}
                                </small>
                              </div>
                              {question.label}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )}
          </DragDropContext>

          {sidebarTabType === "field-types" && (
            <>
              {fieldTypes.map((field, i) => (
                <button
                  key={i}
                  className="flex w-full items-center gap-3 px-2 py-2 text-sm bg-gray-100 my-2 rounded-md font-semibold hover:cursor-grab focus"
                  draggable
                  onDragStart={(e) => handleOnDrag(e, field.type)}
                  onDragEnd={() => setShowDropZone(false)}
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
          className="w-[55%] h-full flex items-center justify-center relative"
          onDrop={hanldeOnDrop}
          onDragOver={handleDragOver}
        >
          <div
            className={`w-full h-[98%] bg-black/10 flex items-center justify-center text-center absolute rounded-md backdrop-blur-sm pointer-events-none opacity-0 z-50 ${
              showDropZone ? "opacity-100" : ""
            }`}
          >
            <h2 className="text-3xl text-gray-500 font-semibold underline">
              Drop to add a new field
            </h2>
          </div>
          <div className="flex items-start font-semibold text-lg gap-2 w-[90%] mx-auto flex-col overflow-auto h-fit max-h-[80vh] custom-scrollbar">
            <div className="flex items-center w-full gap-2">
              <p>{selectedQuestion.index}.</p>
              <input
                type="text"
                className="border-2 border-gray-300 rounded-full text-sm w-full pl-3 py-3 transition-colors focus:border-gray-500 outline-none"
                placeholder="What's the question?"
                value={selectedQuestion?.label}
                onChange={(e) => {
                  setSelectedQuestion({
                    ...selectedQuestion,
                    label: e.target.value,
                  });
                  const updatedQuestions = questions.map((question) =>
                    question.index === selectedQuestion.index
                      ? selectedQuestion
                      : question
                  );
                  setQuestions(updatedQuestions);
                }}
              />
            </div>
            <div className="mt-5 ml-10">
              {selectedQuestion.type === "multiple_choice" && (
                <MultipleChoice
                  options={selectedQuestion?.options}
                  onClick={() => {
                    const newOption = {
                      index: selectedQuestion?.options.length + 1,
                      value: "",
                    };

                    setSelectedQuestion({
                      ...selectedQuestion,
                      options: [...selectedQuestion?.options, newOption],
                    });

                    const updatedQuestions = questions.map((question) =>
                      question.index === selectedQuestion.index
                        ? selectedQuestion
                        : question
                    );
                    setQuestions(updatedQuestions);
                  }}
                  onRemoveOption={() => {
                    setSelectedQuestion({
                      ...selectedQuestion,
                      options: selectedQuestion?.options.filter(
                        (_, i) => i !== selectedQuestion.options.length - 1
                      ),
                    });
                    const updatedQuestions = questions.map((question) =>
                      question.index === selectedQuestion.index
                        ? selectedQuestion
                        : question
                    );
                    setQuestions(updatedQuestions);
                  }}
                  onChange={(changedIndex, e) => {
                    const updatedOptions = selectedQuestion.options.map(
                      (option) =>
                        option.index === changedIndex
                          ? { ...option, value: e.target.value }
                          : option
                    );

                    setSelectedQuestion({
                      ...selectedQuestion,
                      options: updatedOptions,
                    });
                  }}
                />
              )}
              {selectedQuestion.type === "picture_choice" && (
                <PictureChoice
                  options={selectedQuestion?.options}
                  onUpdate={() => {
                    //do something
                  }}
                  addNewOption={() => {
                    setSelectedQuestion({
                      ...selectedQuestion,
                      options: [
                        ...selectedQuestion?.options,
                        { src: "", label: "" },
                      ],
                    });
                    const updatedQuestions = questions.map((question) =>
                      question.index === selectedQuestion.index
                        ? selectedQuestion
                        : question
                    );
                    setQuestions(updatedQuestions);
                  }}
                  deleteOption={() => {
                    //Timmy will do this feature, I no fee kee myself
                  }}
                  removeOptionImage={() => {}}
                  addImageToOption={() => {}}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-[25%] h-full border-l-2 border-gray-200 flex-col px-4 pt-5 text-sm">
          <p className="font-semibold text-sm mb-1">Type</p>
          <div className="">
            <div
              className="p-2 rounded-md text-lg flex items-center gap-3"
              style={{
                backgroundColor: switchBackgroundColorCase(
                  selectedQuestion.type
                ),
              }}
            >
              <small>{selectedQuestion.index}</small>
              {switchIconCase(selectedQuestion.type)}{" "}
              <span className="text-sm font-semibold">
                {switchFieldTypeCase(selectedQuestion.type)}
              </span>
            </div>
          </div>
          <p className="font-semibold text-sm my-5">Settings</p>
          <Flex>
            <p className="font-semibold">Required</p>
            <Switch
              checked={selectedQuestion.required}
              onChange={() => {
                setSelectedQuestion({
                  ...selectedQuestion,
                  required: !selectedQuestion.required,
                });
                const updatedQuestions = questions.map((question) =>
                  question.index === selectedQuestion.index
                    ? selectedQuestion
                    : question
                );

                setQuestions(updatedQuestions);
              }}
            />
          </Flex>
          {selectedQuestion.type === "short_text" ||
          selectedQuestion.type === "long_text" ? (
            <TextSettings
              maxCharacters={selectedQuestion?.maxCharacters}
              enforceMaxCharacters={
                enforceMaxCharacters.enforce &&
                enforceMaxCharacters.for === selectedQuestion.index
              }
              onChangeEnforceMaxCharacters={() => {
                setEnforceMaxCharcters({
                  enforce: !enforceMaxCharacters.enforce,
                  for: selectedQuestion.index,
                });
                setSelectedQuestion({
                  ...selectedQuestion,
                  maxCharacters: undefined,
                });
                const updatedQuestions = questions.map((question) => {
                  if (question.index === selectedQuestion.index) {
                    return {
                      ...question,
                      maxCharacters: undefined,
                    };
                  }
                  return question;
                });
                setQuestions(updatedQuestions);
              }}
              onChangeMaxCharacters={(e) => {
                setSelectedQuestion({
                  ...selectedQuestion,
                  maxCharacters: Number(e.target.value),
                });
                const updatedQuestions = questions.map((question) => {
                  if (question.index === selectedQuestion.index) {
                    return {
                      ...question,
                      maxCharacters: Number(e.target.value),
                    };
                  }
                  return question;
                });
                setQuestions(updatedQuestions);
              }}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Create;
