import React from 'react';
import {Button, Dialog, DialogTitle} from "@mui/material";
import {useDispatch} from "react-redux";
import {UserAction} from "./UserReducer";

const RoleSelectDialog=()=>{
    const dispatch=useDispatch()
    const navigateToMain=()=>{
        window.location.href="/"
    }
    const handleCreatorButton=()=>{
        dispatch(UserAction.setUserRole("USER"))
        navigateToMain()
    }
    const handleReviewerButton=()=>{
        dispatch(UserAction.setUserRole("REVIEWER"))
        navigateToMain()
    }
    return(
        <Dialog open={true}>
            <DialogTitle>Choose Role</DialogTitle>
            <Button onClick={handleCreatorButton}> Creator</Button>
            <Button onClick={handleReviewerButton}> Reviewer</Button>
        </Dialog>
    )
}

export default RoleSelectDialog