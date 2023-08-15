import type { NextApiRequest } from "next";
import type { ReactNode } from "react";

export interface ExtendedRequest extends NextApiRequest {
  userId: string;
  expired: Boolean;
}

export type FieldTypes =
  | "short_text"
  | "long_text"
  | "multiple_choice"
  | "email"
  | "picture_choice"
  | "file_upload"
  | "yes_no";

export interface FieldTypeProps {
  icon: ReactNode;
  text: string;
  color: string;
  type: FieldTypes;
}

export interface TextProps {
  maxCharacters?: number;
}

export interface MultipleChoiceProps {
  options: { index: number; value: string }[];
}

export interface PictureChoiceProps {
  options: {
    src: string;
    label?: string;
  }[];
}

export interface FileUploadProps {
  accept: string;
  maxFileSize: number;
}

export type QuestionProps =
  | ({
      index: number;
      label: string;
      type: "short_text";
      required: boolean;
    } & TextProps)
  | ({
      index: number;
      label: string;
      type: "long_text";
      required: boolean;
    } & TextProps)
  | {
      index: number;
      label: string;
      type: "email";
      required: boolean;
    }
  | {
      index: number;
      label: string;
      type: "yes_no";
      required: boolean;
    }
  | ({
      index: number;
      label: string;
      type: "multiple_choice";
      required: boolean;
    } & MultipleChoiceProps)
  | ({
      index: number;
      label: string;
      type: "picture_choice";
      required: boolean;
    } & PictureChoiceProps)
  | ({
      index: number;
      label: string;
      type: "file_upload";
      required: boolean;
    } & FileUploadProps);

interface QuestionSummaryProps {
  answerCount: 1;
  questionLabel: string;
  latestAnswers: [];
}

export interface SummaryProps {
  formTitle: string;
  submissionsCount: number;
  questionSummaries: QuestionSummaryProps[];
}
