import React from 'react';
import {Button, Dialog, DialogTitle} from "@mui/material";
import {useDispatch} from "react-redux";
import {UserAction} from "./UserReducer";
import AuthAPI, {Role} from "../../../apis/Auth";

const RoleSelectDialog=()=>{
    const dispatch=useDispatch()
    const navigateToMain=()=>{
        window.location.href="/"
    }
    const setRole=(role: Role)=>()=>{
        AuthAPI.updateUserRole(role)
            .then(response=>{
                dispatch(UserAction.setUserRole(role))
                navigateToMain()
            })
            .catch(error=>{
                alert('사용자 정보 업로드 실패')
            })
    }
    return(
        <Dialog open={true}>
            <DialogTitle>Choose Role</DialogTitle>
            <Button onClick={setRole("USER")}> Creator</Button>
            <Button onClick={setRole("REVIEWER")}> Reviewer</Button>
        </Dialog>
    )
}

export default RoleSelectDialog