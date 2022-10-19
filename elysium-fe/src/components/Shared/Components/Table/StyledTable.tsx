import {TitleWithSeparator} from "../Section";
import {SeparatorType} from "../Separator";
import {
    AbsoluteBorderRadius,
    Color,
    DEFAULT_BUTTON_SIZE,
    FLEX_CENTERED_CONTAINER,
    FontSize,
    fontSizeToPixels,
    FULL_SIZE,
    NO_USER_SELECT,
    Spacing
} from "../../Constants/StylesConstants";
import styled from "styled-components";
import {LargeSpinner} from "../ElysiumSpinner";
import {DataTable, DataTablePFSEvent} from "primereact/datatable";
import {ReactNode, useCallback, useEffect, useState} from "react";
import {PageResponse} from "../../Models/Request/PageResponse";
import {doWithMounted} from "../../Utils/ComponentUtils";
import {
    PaginatorCurrentPageReportType,
    PaginatorNextPageLinkType,
    PaginatorPrevPageLinkType
} from 'primereact/paginator';
import {ThemeButton} from "../StyledButton";

const DEFAULT_ROWS = 10;

type TableState = {
    totalRecords: number,
}

type FilterState = {
    first: number,
    page: number,
    rows: number,
}

const TableContainer = styled.div`
    ${FLEX_CENTERED_CONTAINER}
    flex: 1;
    overflow-y: auto;
`

const StyledDataTable = styled(DataTable)`
    ${FULL_SIZE}
    ${FLEX_CENTERED_CONTAINER};
    justify-content: stretch;
    align-items: stretch;
    flex-direction: column;
    
    .p-datatable-wrapper {
        flex: 1 !important;
    }
    
    th {
        font-size: ${fontSizeToPixels(FontSize.SMALLER)} !important;
    }
    
    td {
        font-size: ${fontSizeToPixels(FontSize.SMALL_TO_MEDIUM)} !important;
    }
    
    td, th, tr, .p-paginator {
        border: none !important;
        color: ${Color.WHITE} !important;
        background-color: ${Color.TRANSPARENT} !important;
    }
    
    td:last-child, th:last-child { 
        * {
            text-align: end !important;
            justify-content: flex-end; 
        }
    }
    
    tbody tr:nth-child(odd) {
        background-color: ${Color.TRANSPARENT_DARKENED_GREY} !important;
        
        td:first-child { 
            border-top-left-radius: ${AbsoluteBorderRadius.TINY}; 
            border-bottom-left-radius: ${AbsoluteBorderRadius.TINY}; 
        }
        td:last-child { 
            border-top-right-radius: ${AbsoluteBorderRadius.TINY}; 
            border-bottom-right-radius: ${AbsoluteBorderRadius.TINY}; 
        }
    }
    
    .p-datatable-emptymessage td {
        text-align: center !important;
    }
`

const PageReport = styled.span`
    ${NO_USER_SELECT}
`

const CurrentPage = styled.span`
    color: ${Color.WHITE};
    text-align: center;
`

const TotalPages = styled.span`
    color: ${Color.BACKGROUND_DARKER};
`

const NavigationButton = styled(ThemeButton)`
    ${DEFAULT_BUTTON_SIZE}
    color: ${Color.WHITE} !important;
    margin: ${Spacing.SECOND} !important;
    border-radius: ${AbsoluteBorderRadius.TINY} !important;
`

const getDefaultTableState = (): TableState => ({totalRecords: 0})

const getDefaultFilterState = (): FilterState => ({first: 0, page: 0, rows: DEFAULT_ROWS})

const paginationTemplate: {
    layout: string,
    CurrentPageReport: PaginatorCurrentPageReportType,
    PrevPageLink: PaginatorPrevPageLinkType,
    NextPageLink: PaginatorNextPageLinkType,
} = {
    layout: 'PrevPageLink CurrentPageReport NextPageLink',
    CurrentPageReport: options => <PageReport>
        <CurrentPage>{options.currentPage}</CurrentPage><TotalPages>/{options.totalPages}</TotalPages>
    </PageReport>,
    PrevPageLink: options => <NavigationButton
        icon="pi pi-angle-left" className={options.className}
        onClick={options.onClick} disabled={options.disabled}/>,
    NextPageLink: options => <NavigationButton
        icon="pi pi-angle-right" className={options.className}
        onClick={options.onClick} disabled={options.disabled}/>,
}

function StyledTable<T>({title, emptyMessage, children, getData}: {
    title: ReactNode,  emptyMessage: string, children: ReactNode,
    getData: (page: number, size: number) => Promise<PageResponse<T> | undefined>
}) {
    const [loadingPage, setLoadingPage] = useState(true)
    const [loadingState, setLoadingState] = useState(true)

    const [data, setData] = useState<T[]>([])
    const [tableState, setTableState] = useState<TableState>(getDefaultTableState)
    const [filterState, setFilterState] = useState<FilterState>(getDefaultFilterState)

    const refreshLeaderboard = useCallback(() => doWithMounted(isMounted => {
        setLoadingPage(true);
        getData(filterState.page, filterState.rows).then(foundData => {
            isMounted.isMounted && setData(foundData?.content || [])
            isMounted.isMounted && setTableState({totalRecords: foundData?.totalElements || 0})
        }).finally(() => {
            isMounted.isMounted && setLoadingPage(false)
            isMounted.isMounted && setLoadingState(false)
        }).catch(() => {})
    }), [getData, filterState])
    useEffect(() => refreshLeaderboard(), [refreshLeaderboard])

    const onPageChange = useCallback((event: DataTablePFSEvent) => setFilterState({
        first: event.first, page: event.page || 0, rows: event.rows
    }), [])

    return <>
        <TitleWithSeparator title={title} separatorType={SeparatorType.THEME_LARGE}/>
        <TableContainer>
            <LargeSpinner loading={loadingState}/>
            {!loadingState && <StyledDataTable
                value={data} responsiveLayout="scroll" lazy loading={loadingPage}
                paginator paginatorTemplate={paginationTemplate as any} onPage={onPageChange}
                first={filterState.first} totalRecords={tableState.totalRecords} rows={DEFAULT_ROWS}
                emptyMessage={emptyMessage}>
                {children}
            </StyledDataTable>}
        </TableContainer>
    </>
}

export default StyledTable