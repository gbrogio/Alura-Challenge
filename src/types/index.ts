import React, { SetStateAction } from 'react';

export interface UserProps {
  email: string,
  name: string,
  photo: string,
  uid: string,
  screenName: string,
}
export interface UserConfigProps {
  isUser: UserProps,
  isLoading: boolean,
  signInGithub: () => void,
  signOut: () => void,
  deleteAccount: () => void,
}

export interface InputProps {
  isWidth?: number,
  isType: 'search' | 'select' | 'description' | React.HTMLInputTypeAttribute,
  placeHolder?: string,
  iD?: string,
  style?: React.CSSProperties,
  required?: boolean,
}
export interface ProjectProps {
  pid: string,
  pjConfig: {
    infos: {
      projectName: string,
      projectDescription: string,
      projectContent: string,
      projectLanguage: string,
      projectColor: string | string,
    },
    author: {
      userId: string,
      userPhoto: string,
      userName: string,
    },
  },
  projectLikes: number,
  projectComments: number,
  usersLike: string[],
}
export interface EditorProps {
  color: string,
  language: string | 'javascript' | 'html' | 'css' | 'text',
  disabled?: boolean,
  childrenTextData?: string,
}
export interface SignElementProps {
  isSign: boolean,
  userPhoto?: string,
  userName?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  signOut?: () => void,
  deleteAccount?: () => void,
  isWidth?: number,
}
