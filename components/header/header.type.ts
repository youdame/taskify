import { ReactNode } from "react";

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Member {
  nickname: string;
  id: number;
  profileImageUrl: string;
}

export interface IndexHeaderProps {
  color: "white" | "black";
}

export interface HeaderProfileProps {
  user: User;
}

export interface MembersProps {
  members: Member[];
}

export interface ProfileProps extends ProfileIconProps {
  idx?: number;
  className?: string;
}

export interface ProfileIconProps {
  member: Member;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  onTouchStart?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface ProfilePopupProps {
  member: Member | Member[];
}

export interface BoardButtonProps {
  src: string;
  alt: string;
  children: ReactNode;
}
