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
      type: "short-text";
      required: boolean;
    } & TextProps)
  | ({
      index: number;
      label: string;
      type: "long-text";
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
      type: "yes-no";
      required: boolean;
    }
  | ({
      index: number;
      label: string;
      type: "multiple-choice";
      required: boolean;
    } & MultipleChoiceProps)
  | ({
      index: number;
      label: string;
      type: "picture-choice";
      required: boolean;
    } & PictureChoiceProps)
  | ({
      index: number;
      label: string;
      type: "file-upload";
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
