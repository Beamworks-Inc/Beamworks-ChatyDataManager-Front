import React from 'react';

// material-ui
import { Box, Button, Grid, Typography } from '@mui/material';
import { TreeItem, TreeView } from '@mui/lab';
import { DataGrid, GridToolbarQuickFilter, GridLinkOperator } from '@mui/x-data-grid';

// project import
import MainCard from 'components/MainCard';

// icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useNavigate, useParams } from 'react-router-dom';

// ==============================|| Content List Page ||============================== //

function QuickSearchToolbar() {
    // TODO: make it search by date too
    return (
        <Box
            sx={{
                p: 0.5,
                pb: 0,
                ml: 0.5
            }}
        >
            <GridToolbarQuickFilter
                quickFilterParser={(searchInput) =>
                    searchInput
                        .split(',')
                        .map((value) => value.trim())
                        .filter((value) => value !== '')
                }
            />
        </Box>
    );
}

const ContentList = () => {
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const navigate = useNavigate();

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
        // if nodeIds not in categoryNodes, then navigate
        if (nodeIds.length === 1 && !categoryNodes.includes(nodeIds[0])) navigate('/content/' + nodeIds[0]);
        // if (nodeIds.length === 1 && !categoryNodes.includes(nodeIds[0])) navigate('/content/' + nodeIds);
    };

    const categoryNodes = ['1', '2', '5'];
    const allNodes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const handleExpandClick = () => {
        setExpanded((oldExpanded) => (oldExpanded.length === 0 ? categoryNodes : []));
    };

    const handleSelectClick = () => {
        setSelected((oldSelected) => (oldSelected.length === 0 ? allNodes : []));
    };

    const columns = [
        // 1. 특정 칼럼의 값을 다른 칼럼을 통해 계산할 수 있습니다.
        // valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
        // 2. 마우스 오버시 툴팁을 표시할 수 있습니다.
        // description: 'This column has a value getter and is not sortable.',
        { field: 'id', headerName: 'ID', width: 90, sortable: false },
        {
            field: 'question',
            headerName: 'Question',
            width: 200,
            sortable: false,
            editable: true
        },
        {
            field: 'answer',
            headerName: 'Answer',
            width: 200,
            sortable: false,
            editable: true
        },
        {
            field: 'reference',
            headerName: 'Reference',
            width: 110,
            editable: false,
            description: '논문 서치 정보, 웹페이지 링크등을 사용합니다.',
            renderCell: (params) => <a href={params.row.referenceLink}>{params.row.reference}</a>
        },
        {
            field: 'referenceLink',
            headerName: 'reference link',
            width: 200,
            hide: true
        },
        {
            field: 'rationale',
            headerName: 'Rationale',
            width: 110,
            editable: false,
            description: 'A에 대한 부가 자료 (Link, Image, Movie)',
            renderCell: (params) => <a href={params.row.rationaleLink}>{params.row.rationale}</a>
        },
        {
            field: 'rationaleLink',
            headerName: 'rationale link',
            width: 200,
            hide: true
        },
        {
            field: 'writer',
            headerName: 'Writer',
            width: 110,
            editable: false
        },
        {
            field: 'writeDate',
            headerName: 'write date',
            type: 'date',
            width: 110,
            editable: false
        },
        {
            field: 'reviewer',
            headerName: 'Reviewer',
            width: 110,
            editable: false
        },
        {
            field: 'reviewDate',
            headerName: 'review date',
            type: 'date',
            width: 110,
            editable: false
        }
        // {
        //     field: 'fullName',
        //     headerName: 'Full name',
        //     sortable: false,
        //     width: 160,
        //     valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
        // }
    ];

    const rows = [
        {
            id: 1,
            question: '코피가 나고 있을땐 어떻게 하나요?',
            answer: '가장먼저, 코피가 나고 있는지 확인해야합니다. 코피가 나고 있으면 코피를 물로 씻어주세요.',
            reference: '준응급교본',
            referenceLink: 'https://www.dbpia.co.kr',
            rationale: '코피사진',
            rationaleLink: 'https://blog.kakaocdn.net/dn/b0bEe7/btrFVv1atKF/K3TEq3U4gL7TbfppkWFJu0/img.png',
            writer: 'cherryme',
            writeDate: '2022-12-21',
            reviewer: 'Santa Claus',
            reviewDate: '2022-12-25'
        },
        {
            id: 2,
            question: '코피가 날때 코를 풀어도 괜찮은가요?',
            answer: '코피가 나고 있는 상태에서 코를 풀어도 괜찮습니다. 왜냐하면 코피가 나고 있는 상태에서 코를 풀면 코피가 더 잘 나오기 때문입니다.',
            reference: '준응급교본',
            referenceLink: 'https://www.dbpia.co.kr',
            rationale: '코피사진',
            rationaleLink: 'https://blog.kakaocdn.net/dn/b0bEe7/btrFVv1atKF/K3TEq3U4gL7TbfppkWFJu0/img.png',
            writer: 'cherryme',
            writeDate: '2022-12-22',
            reviewer: 'Santa Claus',
            reviewDate: '2022-12-25'
        },
        {
            id: 3,
            question: '코피가 나고 있을땐 어떻게 하나요?',
            answer: '가장먼저, 코피가 나고 있는지 확인해야합니다. 코피가 나고 있으면 코피를 물로 씻어주세요.',
            reference: '삐뽀삐뽀소아과',
            referenceLink: 'https://www.dbpia.co.kr',
            rationale: '코피사진',
            rationaleLink: 'https://blog.kakaocdn.net/dn/b0bEe7/btrFVv1atKF/K3TEq3U4gL7TbfppkWFJu0/img.png',
            writer: 'cherryme',
            writeDate: '2022-12-23',
            reviewer: 'Santa Claus',
            reviewDate: '2022-12-25'
        },
        {
            id: 4,
            question: '코피가 날때 코를 풀어도 괜찮은가요?',
            answer: '코피가 나고 있는 상태에서 코를 풀어도 괜찮습니다. 왜냐하면 코피가 나고 있는 상태에서 코를 풀면 코피가 더 잘 나오기 때문입니다.',
            reference: '삐뽀삐뽀소아과',
            referenceLink: 'https://www.dbpia.co.kr',
            rationale: '코피사진',
            rationaleLink: 'https://blog.kakaocdn.net/dn/b0bEe7/btrFVv1atKF/K3TEq3U4gL7TbfppkWFJu0/img.png',
            writer: 'cherryme',
            writeDate: '2022-12-24',
            reviewer: 'Santa Claus',
            reviewDate: '2022-12-25'
        }
    ];

    // get route params
    const { id } = useParams();

    const getBreadcrumbsById = (id) => {
        if (id === '3') return ['준응급', '코피', '응급처치'].join(' - ');
        else if (id === '4') return ['준응급', '코피', '예방수칙'].join(' - ');
        else if (id === '6') return ['준응급', '찰과상', '응급처치'].join(' - ');
        else if (id === '7') return ['준응급', '찰과상', '예방수칙'].join(' - ');
        // const breadcrumbs = [];
        // const category = categories.find((category) => category.id === id);
        // breadcrumbs.push(category);
        // if (category.parentId) {
        //     breadcrumbs.push(...getBreadcrumbsById(category.parentId));
        // }
        // return breadcrumbs;
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sm={2}>
                <MainCard title="Content Category" content={false}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <Box sx={{ height: 550, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
                            {/* make it center */}
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Button onClick={handleExpandClick}>{expanded.length === 0 ? 'Expand all' : 'Collapse all'}</Button>
                                <Button onClick={handleSelectClick}>{selected.length === 0 ? 'Select all' : 'Unselect all'}</Button>
                            </Box>
                            <TreeView
                                width="100%"
                                aria-label="controlled"
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                                expanded={expanded}
                                selected={selected}
                                onNodeToggle={handleToggle}
                                onNodeSelect={handleSelect}
                                multiSelect
                            >
                                <TreeItem nodeId="1" label="준응급">
                                    <TreeItem nodeId="2" label="코피">
                                        <TreeItem nodeId="3" label="응급처치" />
                                        <TreeItem nodeId="4" label="예방수칙" />
                                    </TreeItem>
                                    <TreeItem nodeId="5" label="찰과상">
                                        <TreeItem nodeId="6" label="응급처치" />
                                        <TreeItem nodeId="7" label="예방수칙" />
                                    </TreeItem>
                                </TreeItem>
                            </TreeView>
                        </Box>
                    </Typography>
                </MainCard>
            </Grid>
            <Grid item xs={12} sm={10}>
                <MainCard sx={{ position: 'relative' }} title={id ? getBreadcrumbsById(id) : 'Content List'} content={false}>
                    {/* position it at the top right */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', top: 12, right: 12 }}>
                        <Button variant="contained" color="secondary" onClick={() => navigate('/create')}>
                            create
                        </Button>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        <Box sx={{ height: 550, width: '100%' }}>
                            <DataGrid
                                initialState={{
                                    filter: {
                                        filterModel: {
                                            items: [],
                                            quickFilterLogicOperator: GridLinkOperator.Or
                                        }
                                    }
                                }}
                                components={{ Toolbar: QuickSearchToolbar }}
                                sx={{
                                    '& .MuiDataGrid-row.Mui-even': {
                                        backgroundColor: '#ffffff'
                                    },
                                    '& .MuiDataGrid-row.Mui-even:hover': {
                                        backgroundColor: '#e0e0e0'
                                    },
                                    '& .MuiDataGrid-row.Mui-odd': {
                                        backgroundColor: '#f0f0f0'
                                    },
                                    '& .MuiDataGrid-row.Mui-odd:hover': {
                                        backgroundColor: '#e0e0e0'
                                    }
                                }}
                                getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'Mui-even' : 'Mui-odd')}
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                disableSelectionOnClick
                                experimentalFeatures={{ newEditingApi: true }}
                            />
                        </Box>
                    </Typography>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default ContentList;
