import {Box, Button} from "@mui/material";
import {ReviewDialog} from "./ReviewDialog";
import React, {useState} from "react";
import ContentsAPI from "../../../../../apis/content";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../store";
import {IContent} from "../../../../../interfaces/Content.interface";

export function ContentApplyAndReviewButton() {
    const [open,setOpen]=useState(false)
    const content = useSelector(
        (state: RootState) => state.ContentReducer.currentContent
    ) as IContent;

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }


    function applyContentDetail() {
        ContentsAPI.update(content)
            .then(response => {
                alert("컨텐츠가 정상적으로 업데이트 되었습니다.")
            } )
            .catch(error=>{
                alert("컨텐츠 업데이트에 실패했습니다.")
            })
    }


    return <Box
        sx={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            top: 12,
            right: 12,
            gap: 1,
        }}
    >
        <Button variant="contained" color="secondary" onClick={applyContentDetail}>
            apply
        </Button>
        <Button variant="contained" color="secondary" onClick={handleOpen}>
            review
        </Button>
        <ReviewDialog open={open} handleOpen={handleOpen} handleClose={handleClose}/>
    </Box>;
}