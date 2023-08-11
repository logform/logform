import type { NextApiRequest } from "next";
import type { ReactNode } from "react";

export interface ExtendedRequest extends NextApiRequest {
  userId: string;
  expired: Boolean;
}

export type FieldTypes =
  | "short-text"
  | "long-text"
  | "multiple-choice"
  | "email"
  | "picture-choice"
  | "file-upload"
  | "yes-no";

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
    label: string;
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
