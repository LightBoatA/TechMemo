import { Button } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SearchBar } from "ym-web-view";
import { DEFAULT_FACTORY_SEARCH_RESULT, IFactory, DEFAULT_PAGINATION, DEFAULT_SEARCH_OPTIONS, FACTORY_STATUS_OPTIONS_SUBMITTED, FACTORY_STATUS_OPTIONS_UNSUBMIT, DEFAULT_FACTORY_PAGING } from "./common";
import CardList from "../cardList";
import { getFactoryList } from "@/model/graphsq/factory";
import { FactoryCardInfo } from "../cardList/factoryCardInfo";
import { dateFormat } from "@/utils/utils";
import moment from "moment";
import { submitStatus } from "@/utils/type";

interface IProps {
    activeKey: string;
}

export const CooperateFactoryPanel: React.FC<IProps> = props => {
    const {
        activeKey,
    } = props;

    const [factoryList, setFactoryList] = useState<IFactory[]>([]);
    const [searchOptions, setSearchOptions] = useState<any>([]);
    const [searchTResult, setSearchTResult] = useState<any>({}); // searchBar
    const [searchResult, setSearchResult] = useState<any>(DEFAULT_FACTORY_SEARCH_RESULT) // 查询
    const [pagination, setPagination] = useState<any>(DEFAULT_PAGINATION); // list分页信息
    // const [currentPage, setCurrentPage] = useState<any>(1);

    useEffect(() => {
        setSearchOptions(DEFAULT_SEARCH_OPTIONS.map(option => {
            if (option.name === 'status') {
                return activeKey === submitStatus.submitted ? 
                    {
                        ...option,
                        availableOptions: FACTORY_STATUS_OPTIONS_SUBMITTED,
                    } :
                    {
                        ...option,
                        availableOptions: FACTORY_STATUS_OPTIONS_UNSUBMIT,
                    }
            } else return option;
            
        }))
    }, [activeKey])

    const setPaginationByType = useCallback((p:any, type: string, value: number) => {
        type === 'current' ? 
            setPagination({
                ...p,
                current: value,
            }) :
            setPagination({
                ...p,
                total: value,
            })
    },[])
    
    const getQuerySearch = useCallback(result => {
        let search: any = {};
        if (result.createdTimeRange) {
            search.createdTimeStart = moment(result.createdTimeRange[0]).unix();
            search.createdTimeEnd = moment(result.createdTimeRange[1]).unix();
        }
        if (result.modifyTimeRange) {
            search.modifyTimeStart = moment(result.modifyTimeRange[0]).unix();
            search.modifyTimeEnd = moment(result.modifyTimeRange[1]).unix();
        }
        // 厂房状态：为空则设置为默认选项
        search.status = result.status ? result.status : DEFAULT_FACTORY_SEARCH_RESULT.status;
        if (result.searchField) {
            search.searchField = result.searchField;
        }
        
        return search;
    }, [])

    const getQueryPaging = useCallback((p) => {
        return {
            page: p.current,
            size: p.pageSize,
        }
    }, [])
    // const getQueryPaging = useCallback((curPage) => {
    //     return {
    //         page: pagination.current,
    //         size: p.pageSize,
    //     }
    // }, [])
    const currentPage = pagination.current;
    useEffect(() => {
        async function fetchData() {
            const res = await getFactoryList(searchResult, getQueryPaging(pagination))
            if (res) {
                setFactoryList(res.factoryPage.content);
                if (pagination.total !== res.factoryPage.totalElements) {
                    setPagination({
                        ...pagination,
                        total: res.factoryPage.totalElements,
                    })
                }
            }
        }
        fetchData();
    }, [searchResult, pagination, getQueryPaging])

    
    return useMemo(() => {
        console.log('组件渲染');
        
        const showFactoryList = factoryList.map(item => {
            return {
                title: item.name,
                picture: item.picture,
                status: item.status,
                infoCard: <FactoryCardInfo
                    area={item.area}
                    number={item.number}
                    createdDate={dateFormat(item.createdDate, 'yyyy-MM-dd')}
                    lastModifiedDate={dateFormat(item.lastModifiedDate, 'yyyy-MM-dd')}
                    accountName={item.factoryToUserAccount.accountName}
                ></FactoryCardInfo>
            }
        })

        return (
            <div className="factory-panel">
                <div className="flex flex-h-end mb10">
                    <SearchBar
                        options={searchOptions}
                        result={searchTResult}
                        onWatch={(result: any) => {
                            setSearchTResult(result);
                            setSearchResult(getQuerySearch(result));
                            setPaginationByType(pagination,'current', 1)
                        }}
                    />
                    <Button
                        type="primary"
                        className="ml10"
                        onClick={() => {
                            
                        }}>
                        新增
                    </Button>
                    <Button
                        style={{ backgroundColor: '#F99204', color: 'white', border: '1px solid #F99204' }}
                        className="ml10"
                        onClick={() => {
                            
                        }}>
                        申请合作
                    </Button>
                </div>
                <CardList
                    listData={showFactoryList}
                    pagination={{
                        ...pagination,
                        onChange: page => setPaginationByType(pagination,'current', page),
                    }}
                ></CardList>
            </div>
            
        )
    }, [factoryList, getQuerySearch, pagination, searchOptions, searchTResult, setPaginationByType])
}

export default CooperateFactoryPanel;