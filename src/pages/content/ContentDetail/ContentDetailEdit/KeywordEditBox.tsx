import {IContent} from "../../../../interfaces/Content.interface";
import {Box, Typography} from "@mui/material";
import EditableChip from "../../../../components/EditableChip";
import {ContentAction} from "../../../../store/reducers/ContentReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import React from "react";


export function KeywordEditBox(props: { content: IContent, onClick: () => void }) {

    const dispatch = useDispatch();

    const content = useSelector(
        (state: RootState) => state.ContentReducer.currentContent
    ) as IContent;

    const handleTextChangeForChip = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(
            ContentAction.setCurrentContent({
                ...content,
                keywords: [...content.keywords].map((keyword, idx) => {
                    if (`keyword${idx}` === e.currentTarget.id) {
                        return e.currentTarget.value;
                    } else {
                        return keyword;
                    }
                }),
            })
        );
    };

    return <Box sx={{display: "flex", flexDirection: "column", gap: 1}}>
        <Typography variant="h4" sx={{}}>
            Keywords
        </Typography>
        <Box sx={{display: "flex", gap: 1}}>
            {props.content.keywords?.map((keyword : string,idx : number)=>{
                return (
                    <EditableChip
                        // key={idx}
                        text={keyword}
                        handleTextChange={handleTextChangeForChip}
                        label={`keyword${idx}`}
                    />
                );
            })}
            <EditableChip
                text="add keyword.."
                onClick={props.onClick}
            />
        </Box>
    </Box>;
}