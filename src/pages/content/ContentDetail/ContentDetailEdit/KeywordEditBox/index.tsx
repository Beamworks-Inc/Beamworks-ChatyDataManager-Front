import { KeywordDto } from "interfaces/Content.interface";
import {
	Box,
	styled,
	Tooltip,
	Typography,
	useAutocomplete,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import ContentsAPI from "apis/content";
import { AxiosError, AxiosResponse } from "axios";
import { ContentAction } from "store/reducers/ContentReducer";
import { useEffect } from "react";
import { Listbox } from "./Listbox";
import { StyledTag } from "./StyledTag";
import { InputWrapper } from "./InputWrapper";

const Root = styled("div")(
	({ theme }) => `
	color: ${
		theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
	};
	font-size: 14px;
  `
);

const Label = styled("label")`
	padding: 0 0 4px;
	line-height: 1.5;
	display: block;
`;

export function KeywordEditBox() {
	// states
	const keywords = useSelector(
		(state: RootState) => state.ContentReducer.currentContent.keyword
	);
	const keywordCategories = useSelector(
		(state: RootState) => state.ContentReducer.keywordCategories
	) as KeywordDto[];

	const dispatch = useDispatch();

	const handleOnChange = (event: React.ChangeEvent<{}>, value: string[]) => {
		dispatch(ContentAction.setCurrentContentKeywords(value));
	};

	useEffect(() => {
		if (keywordCategories?.length === 0) {
			ContentsAPI.findAllKeywordList()
				.then((res: AxiosResponse) => {
					dispatch(ContentAction.setKeywordCategories(res.data));
				})
				.catch((err: AxiosError) => {
					alert(`findAllKeywordList error, code:(${err})`);
				});
		}
	}, [keywordCategories]);

	const {
		getRootProps,
		getInputLabelProps,
		getInputProps,
		getTagProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
		value,
		focused,
		setAnchorEl,
	} = useAutocomplete({
		id: "keyword-autocomplete",
		defaultValue: keywords,
		multiple: true,
		onChange: handleOnChange,
		freeSolo: true,
		options: keywordCategories.map((option) => option.name),
		getOptionLabel: (option) => option,
	});

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Typography variant="h4" sx={{}}>
				<Tooltip
					title="컨텐츠의 전체적인 주제, Question, Answer을 대표하는 키워드를 의미합니다."
					placement="top"
					arrow
				>
					<span>Keywords</span>
				</Tooltip>
			</Typography>
			<Box sx={{ display: "flex", gap: 1 }}>
				{
					<Root>
						<div {...getRootProps()}>
							<Label {...getInputLabelProps()} />
							<InputWrapper
								ref={setAnchorEl}
								className={focused ? "focused" : ""}
							>
								{value.map((option: string, index: number) => (
									<StyledTag label={option} {...getTagProps({ index })} />
								))}
								<input {...getInputProps()} />
							</InputWrapper>
						</div>
						{groupedOptions.length > 0 ? (
							<Listbox {...getListboxProps()}>
								{groupedOptions.map((option, index) => (
									<li {...getOptionProps({ option, index })}>
										<span>{option}</span>
										<CheckIcon fontSize="small" />
									</li>
								))}
							</Listbox>
						) : null}
					</Root>
				}
			</Box>
		</Box>
	);
}
