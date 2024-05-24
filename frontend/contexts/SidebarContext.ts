'use client'
import { Dispatch, SetStateAction, createContext } from "react"


export const SidebarContext = createContext<Array<Dispatch<SetStateAction<string>> | string >>([])