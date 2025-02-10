"use client";

import React, { createContext, useReducer, Dispatch, ReactNode } from "react";

// Define the Member interface
export interface IMember {
  _id: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  lga: string;
  age?: string;
  sex: string;
  countryOfOrigin: string;
  stateOfOrigin: string;
  city?: string;
  formerChurch?: string;
  invitedBy: string;
  decisionMade: string;
  department?: string;
    createdAt: Date;
    updatedAt: Date;
    __V: number;
}

// Define action types
type ActionType =
  | { type: "SET_MEMBERS"; payload: IMember[] }
  | { type: "ADD_MEMBER"; payload: IMember }
  | { type: "UPDATE_MEMBER"; payload: IMember }
  | { type: "DELETE_MEMBER"; payload: string };

// Reducer function
function memberReducer(state: IMember[], action: ActionType): IMember[] {
  switch (action.type) {
    case "SET_MEMBERS":
      return action.payload;
    case "ADD_MEMBER":
      return [...state, action.payload];
    case "UPDATE_MEMBER":
      return state.map((member) =>
        member._id === action.payload._id ? action.payload : member
      );
    case "DELETE_MEMBER":
      return state.filter((member) => member._id !== action.payload);
    default:
      return state;
  }
}

// Context interface
interface MemberContextProps {
  members: IMember[];
  dispatch: Dispatch<ActionType>;
}

// Create context
export const MemberContext = createContext<MemberContextProps>({
  members: [],
  dispatch: () => null,
});

// Provider component
export const MemberContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [members, dispatch] = useReducer(memberReducer, []);

  return (
    <MemberContext.Provider value={{ members, dispatch }}>
      {children}
    </MemberContext.Provider>
  );
};
