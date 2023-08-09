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
  | "file-upload";

export interface FieldTypeProps {
  icon: ReactNode;
  text: string;
  color: string;
  type: FieldTypes;
}

export interface QuestionProps {
  index: number;
  label: string;
  type: FieldTypes;
  required: boolean;
}
