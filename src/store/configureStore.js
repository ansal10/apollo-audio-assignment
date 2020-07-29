import  {configureStore} from "@reduxjs/toolkit";
import reducer from "./musicRedux"

export  default function () {
    return configureStore({reducer})
}
