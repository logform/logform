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
      id: string;
      index: number;
      label: string;
      type: "short_text";
      required: boolean;
    } & TextProps)
  | ({
      id: string;
      index: number;
      label: string;
      type: "long_text";
      required: boolean;
    } & TextProps)
  | {
      id: string;
      index: number;
      label: string;
      type: "email";
      required: boolean;
    }
  | {
      id: string;
      index: number;
      label: string;
      type: "yes_no";
      required: boolean;
    }
  | ({
      id: string;
      index: number;
      label: string;
      type: "multiple_choice";
      required: boolean;
    } & MultipleChoiceProps)
  | ({
      id: string;
      index: number;
      label: string;
      type: "picture_choice";
      required: boolean;
    } & PictureChoiceProps)
  | ({
      id: string;
      index: number;
      label: string;
      type: "file_upload";
      required: boolean;
    } & FileUploadProps);

export interface ShortTextSubmissionProps {
  value: string;
}
export interface LongTextSubmissionProps {
  value: string;
}
export interface MultipleChoiceSubmissionProps {
  multipleChoiceValue: string[];
}

export type SubmissionProps =
  | ({
      questionId: string;
      submissionId: string;
      type: "SHORT_TEXT";
    } & ShortTextSubmissionProps)
  | ({
      questionId: string;
      submissionId: string;
      type: "LONG_TEXT";
    } & LongTextSubmissionProps)
  | ({
      questionId: string;
      submissionId: string;
      type: "MULTIPLE_CHOICE";
    } & MultipleChoiceSubmissionProps);
