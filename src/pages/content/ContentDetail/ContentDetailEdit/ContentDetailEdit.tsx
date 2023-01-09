import {IContent} from "../../../../interfaces/Content.interface";
import React from "react";
import {Box, Grid} from "@mui/material";
import MainCard from "../../../../components/MainCard";
import {ContentApplyAndReviewButton} from "./ContentApplyAndReview/ContentApplyAndReviewButton";
import {QuestionEditText} from "./QuestionEditText";
import {AnswerEditText} from "./AnswerEditText";
import {KeywordEditBox} from "./KeywordEditBox";
import {ReferenceEditBox} from "./ReferenceEditBox";
import {RationalEditBox} from "./RationalEditBox";
import {ContentAction} from "../../../../store/reducers/ContentReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";

export function ContentDetailEdit(props: {  content: IContent}) {

    const dispatch=useDispatch()
    const content = useSelector(
        (state: RootState) => state.ContentReducer.currentContent
    ) as IContent;

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputLabel = e.currentTarget.id;
        dispatch(
            ContentAction.setCurrentContent({
                ...content,
                [inputLabel]: e.currentTarget.value,
            })
        );
    };

    return <Grid item xs={12} sm={9}>
        {/*@ts-ignore*/}
        <MainCard
            sx={{position: "relative"}}
            title="Content Detail"
            content={false}
        >
            <ContentApplyAndReviewButton />

            <Box
                sx={{
                    // height: 550,
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    gap: 3,
                    overflowY: "auto",
                    padding: 3,
                }}
            >
                <QuestionEditText content={props.content} handleTextChange={handleTextChange}/>
                <AnswerEditText content={props.content} handleTextChange={handleTextChange}/>
                <KeywordEditBox content={props.content} />
                <ReferenceEditBox/>
                <RationalEditBox content={props.content} />
            </Box>
        </MainCard>
    </Grid>;
}