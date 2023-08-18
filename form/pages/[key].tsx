import LongText from "@/components/LongText";
import MultipleChoice from "@/components/MultipleChoice";
import ShortText from "@/components/ShortText";
import { FieldTypes, QuestionProps } from "@/types";
import axios from "axios";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { toast } from "react-toastify";

const Form = ({
  form,
}: {
  form: { title: string; key: string; questions: QuestionProps[] };
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<{
    index: number;
    required: boolean;
    value: any;
  }>({
    index: form.questions[0].index,
    required: form.questions[0].required,
    value: null,
  });

  const [answers, setAnswers] = useState<
    {
      questionId: string;
      answerText?: string;
      answerChoices?: string[];
      type: FieldTypes;
      questionIndex: number;
    }[]
  >([]);

  const isFirstQuestion = currentQuestion.index === form.questions[0].index;
  const isLastQuestion =
    currentQuestion.index === form.questions[form.questions.length - 1].index;

  const handleNext = () => {
    if (currentQuestion.required && !currentQuestion.value) {
      toast("This question is required");
      return;
    }

    const currentQuestionIndex = form.questions.findIndex(
      (question) => question.index === currentQuestion.index
    );

    if (currentQuestionIndex >= 0) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = {
        questionId: form.questions[currentQuestionIndex].id,
        type: "short_text",
        questionIndex: currentQuestion.index,
        answerText: currentQuestion.value,
      };

      const nextQuestion = form.questions[currentQuestionIndex + 1];
      if (nextQuestion) {
        setCurrentQuestion({
          index: nextQuestion.index,
          required: nextQuestion.required,
          value: null,
        });
        setAnswers(updatedAnswers);
      }
    }
  };

  return (
    <div className="">
      <div className="w-full h-40 bg-pink-400 mb-10 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center mb-10">{form.title}</h1>
      </div>
      <Head>
        <title>{form.title}</title>
      </Head>

      <div className="flex flex-col text-lg items-center w-[60%] gap-2 mx-auto font-semibold">
        {form.questions.map((question) => (
          <div className="w-[450px]" key={question.id}>
            {question.index === currentQuestion.index && (
              <p className="mb-2">{question.label}</p>
            )}
            {question.type === "short_text" &&
              question.index === currentQuestion.index && (
                <ShortText
                  onChange={(e) => {
                    setCurrentQuestion({
                      ...currentQuestion,
                      value: e.target?.value,
                    });
                  }}
                />
              )}
            {question.type === "long_text" &&
              question.index === currentQuestion.index && (
                <LongText
                  onChange={(e) => {
                    setCurrentQuestion({
                      ...currentQuestion,
                      value: e.target?.value,
                    });
                  }}
                />
              )}
            {question.type === "multiple_choice" &&
              question.index === currentQuestion.index && (
                <MultipleChoice options={question.options} />
              )}
          </div>
        ))}
        <button
          className="outline-none border-2 text-white bg-black/90 hover:bg-black transition-colors rounded-full pl-3 w-[450px] py-3 font-semibold text-center flex items-center justify-center disabled:cursor-not-allowed h-12"
          onClick={handleNext}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </button>
        {!currentQuestion.required && !isLastQuestion && (
          <button onClick={() => {}}>Skip</button>
        )}
      </div>
    </div>
  );
};

export default Form;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { key } = context.query;
  console.log(key);

  const isProd = process.env.NODE_ENV === "production";

  const baseUrl = isProd
    ? "https://form-logform.vercel.app"
    : "http://localhost:5500";

  try {
    const response = await axios.get(`${baseUrl}/api/${key}`);
    const form = response.data;
    console.log(form);

    return {
      props: {
        form,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
