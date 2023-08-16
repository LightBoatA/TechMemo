import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGraphQLTable } from '@/hooks/useGraphQLTable';
import { Table, SearchBar, ExportFile } from 'ym-web-view';
import { FilterColumns, FilterSearchOptions, defalutFilterColumns, defaultFilterSearchOptions, getTResult, handleFilterDeviceType, initColumns, initSearchOptions, initWorkOrderStatus } from './common';
import { Button } from 'antd';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { useProcessingModules } from '@/hooks/useProcessingModules';
import moment from 'moment';
import { getColumnItem } from '@/utils/utils';
import DownloadFile from '@/components/DownloadFile';
import axios from '@/model/axios/axios';
import { ProcessType } from '@/components/CustomerLeftMenu';
import { QueryFields, QueryTableName, queryByObjectType } from '@/model/graphsq/customer';
import { WorkOrderStatus, WorkOrderType } from '@/utils/type';
import './index.less';

interface IProps {
  activeKey: string;
  exportUrl?: string;
  cache?: string;
  queryTableName?: string;
  filterSearchOptions?: FilterSearchOptions;
  isDownLoadBtn?: boolean;
  isBatchImportBtn?: boolean;
  isAddBtn?: boolean;
  isCooperateBtn?: boolean;
  isImport?: boolean;
  filterColumns?: FilterColumns;
  actionRender: (text: any, record: any, paramsTable: any) => React.ReactNode;
  handleCooperateClick?: () => void;
  handleEquimentAdd?: () => void;
  handleBatchImport?: () => void;
  getParamsTable: (paramsTable: any) => void;
  isCustomer?: boolean;
  downloadFileUrl?: string;
}

interface ApiAttr {
  id: string;
  status: string;
  lastCommitContent: {
    contactName: string;
    contactPhone: string;
    businessLicensePicture: string;
  };
  rejectReason: string;
  lastModifiedDate: number;
  workOrderToEnterprise: {
    id: string;
    name: string;
    phone: string;
    authorizedEnterprisesOperate: boolean;
  };
}

export const CooperateEquipmentPanel: React.FC<IProps> = props => {
  const {
    activeKey, // 激活的tab页，已提交、未提交
    filterColumns, // 需要表格中的哪些列
    cache = 'CooperateEquipmentPanel', // EquipmentPanelSubmitted 或 EquipmentPanelNotCommitted （已提交、未提交）
    filterSearchOptions,
    actionRender,
    isCooperateBtn = true,
    handleCooperateClick,
    isDownLoadBtn = true,
    isBatchImportBtn = true,
    isAddBtn = true,
    isImport = true,
    handleEquimentAdd,
    getParamsTable,
    handleBatchImport,
    queryTableName,
    exportUrl = '/export/device',
    downloadFileUrl = 'device/customer_device_template.xlsx',
    isCustomer = false
  } = props;
  const [searchOptions, setSearchOptions] = useState<any>([]); // 搜索项组件配置：日期、下拉框等
  const [searchTResult, setSearchTResult] = useState<any>({}); // 搜索组件返回的部分搜索集
  const [searchResult, setSearchResult] = useState<any>({
    processModule: []
  }); // 用于查询的搜索对象
  const [processModule, setProcessModule] = useState<string>('');
  const [isCooperate, setIsCooperate] = useState<boolean>(false);
  const [columns, setColumns] = useState<any>([]); // 表格内容
  const { filterProcessModules, filterDevices, appointProcessTypes } = useProcessingModules(ProcessType.PACKAGES);
  const cacheLevel = useRef<string>(cache || 'CooperateEquipmentPanel');
  const tableName = useRef<string>(queryTableName || 'devices');
  const paramsTable = useGraphQLTable(
    {
      tableName: tableName.current,
      searchType: 'DeviceSearch',
      needReturnData: `{
            id
            enterpriseId
            name
            model
            number
            systemId
            deviceModel{
              id
              name
            }
            deviceStatus
            productProcessing
            pricingMethod
            pricing{
              mode
            }
            description
            picture
            processModule
            deviceType
            status
            remark
            parameters
            deleted
            createdBy
            createdDate
            lastModifiedBy
            lastModifiedDate
            deviceToWorkOrder{
              id
              status
              lastModifiedDate
            }
            deviceToEnterprise{
              id
              name
              phone
              contact{
                name
                phone
              }
            }
            deviceToUserAccount{
              id
              name
            }
          }`,
      cacheLevel: cacheLevel.current
    },
    searchResult,
    5
  );

  useEffect(() => {
    // 切换已提交、未提交之后触发
    if (cache) {
      const _searchTResult = getTResult(tableName.current + cache);
      // 什么时候result有值
      _searchTResult && setSearchTResult(_searchTResult);
    }
  }, [cache]);

  useEffect(() => {
    // 表格源数据(包含分页信息等)
    if (paramsTable && getParamsTable) {
      getParamsTable(paramsTable);
      // 问题：getParamsTable是什么
    }
  }, [getParamsTable, paramsTable]);

  useEffect(() => {
    // 切换tab页时
    if (activeKey) {
      setSearchResult(state => {
        // 已提交和未提交的“状态”下拉框内的内容不同
        state.status = initWorkOrderStatus(activeKey);
        return { ...state };
      });
    }
  }, [activeKey]);

  useEffect(() => {
    // 切换tab页时，表格列展示不同，重新计算表格内容
    const item = getColumnItem('操作', 'action', 'action', 'center', '', (text, record) => actionRender(text, record, paramsTable), '250px');
    if (filterColumns) {
      const _filterColumns = {
        ...defalutFilterColumns,
        ...filterColumns
      };
      setColumns([...initColumns(_filterColumns, activeKey), item]);
    } else {
      setColumns([...initColumns(defalutFilterColumns, activeKey), item]);
    }
  }, [actionRender, activeKey, filterColumns, paramsTable]);

  useEffect(() => {
    // 搜索项设置：日期、设备类型等，默认全存在，filter设置哪些部分不存在
    if (filterSearchOptions) {
      const _filterSearchOptions = { ...defaultFilterSearchOptions, ...filterSearchOptions };
      const _searchOptions = initSearchOptions(_filterSearchOptions, activeKey, filterProcessModules, []);
      setSearchOptions(_searchOptions);
    } else {
      const _searchOptions = initSearchOptions(defaultFilterSearchOptions, activeKey, filterProcessModules, []);
      setSearchOptions(_searchOptions);
    }
  }, [activeKey, filterDevices, filterProcessModules, filterSearchOptions]);

  useEffect(() => {
    // 搜索内容改变时，重置搜索项
    if (searchTResult) {
      let _filterSearchOptions = { ...defaultFilterSearchOptions };
      if (filterSearchOptions) {
        _filterSearchOptions = { ..._filterSearchOptions, ...filterSearchOptions };
      }
      const { devices } = handleFilterDeviceType(appointProcessTypes, searchTResult.processModule);
      const _searchOptions = initSearchOptions(_filterSearchOptions, activeKey, filterProcessModules, devices);
      setSearchOptions(_searchOptions);
    }
  }, [activeKey, appointProcessTypes, filterProcessModules, filterSearchOptions, searchTResult]);

  const getWorkOrderDetail = useCallback(async () => {

    try {
      const reslut = await queryByObjectType<{ data: ApiAttr | null }>(WorkOrderType.COOPERATION, QueryTableName.objectWorkOrder, QueryFields.workOrderFields);
      if (reslut.data && reslut.data.status !== WorkOrderStatus.APPROVED) {
        setIsCooperate(true);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (isCustomer) {
    // 问题：这里的作用
      getWorkOrderDetail();
    }
  }, [getWorkOrderDetail, isCustomer]);

  const searchBarMemo = useMemo(() => {
    
    return (
      <SearchBar
        options={searchOptions}
        result={searchTResult}
        onWatch={(result: any) => {
          {
            const _searchResult: any = { ...result };
            if (_searchResult.productProcessing) {
              _searchResult.productProcessing = _searchResult.productProcessing === '1' ? true : false;
            } else {
              _searchResult.productProcessing = null;
            }
            const isChange = _searchResult.processModule === processModule;
            _searchResult.deviceType = isChange ? _searchResult.deviceType : null;
            _searchResult.processModule = _searchResult.processModule ? [_searchResult.processModule] : [];
            if (_searchResult.date && Array.isArray(_searchResult.date)) {
              _searchResult.timeStart = _searchResult.date && moment(_searchResult.date[0]).unix();
              _searchResult.timeEnd = _searchResult.date && moment(_searchResult.date[1]).unix();
              delete _searchResult.date;
            } else {
              delete _searchResult.date;
              _searchResult.timeStart = null;
              _searchResult.timeEnd = null;
            }
            const list = _searchResult.status ? [_searchResult.status] : initWorkOrderStatus(activeKey);
            _searchResult.status = list;
            setSearchResult(_searchResult);
          }
          setSearchTResult(() => {
            const isChange = result.processModule === processModule;
            return {
              ...result,
              deviceType: isChange ? result.deviceType : ''
            };
          });
          if (result.processModule) {
            setProcessModule(result.processModule);
          }
        }}
      />
    );
  }, [activeKey, processModule, searchOptions, searchTResult]);

  return useMemo(() => {
    const dataSource = {
      records: paramsTable.dataSource,
      total: paramsTable.pagination.total
    };
    
    return (
      <div className="equipment-panel">
        <div className="flex flex-h-end mb10">
          {searchBarMemo}
          {isDownLoadBtn && (
            <DownloadFile rootClassName="ml10" btnType="default" fileName={downloadFileUrl}>
              <>
                <CloudDownloadOutlined className="fs14" />
                <span>下载模板</span>
              </>
            </DownloadFile>
          )}
          {isBatchImportBtn && (
            <Button
              type="primary"
              className="ml10"
              onClick={() => {
                handleBatchImport && handleBatchImport();
              }}>
              批量导入
            </Button>
          )}
          {isAddBtn && (
            <Button
              type="primary"
              className="ml10"
              onClick={() => {
                handleEquimentAdd && handleEquimentAdd();
              }}>
              新增
            </Button>
          )}
          {isCooperateBtn && !isCooperate && (
            <Button
              className="ml10"
              style={{ backgroundColor: '#F99204', color: 'white', border: '1px solid #F99204' }}
              onClick={() => {
                handleCooperateClick && handleCooperateClick();
              }}>
              申请合作
            </Button>
          )}
          {isImport && (
            <div className="ml10">
              <ExportFile
                fileName="设备列表.xlsx"
                text="导出"
                type="primary"
                handleRequest={() => {
                  try {
                    return axios.requestBlob.post(exportUrl, searchResult);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
            </div>
          )}
        </div>
        <Table 
            dataSource={dataSource} 
            columns={columns} 
            rowKey={'id'} 
            pagination={paramsTable.pagination} 
            loading={paramsTable.loading} 
        />
      </div>
    );
  }, [columns, downloadFileUrl, exportUrl, handleBatchImport, handleCooperateClick, handleEquimentAdd, isAddBtn, isBatchImportBtn, isCooperate, isCooperateBtn, isDownLoadBtn, isImport, paramsTable.dataSource, paramsTable.loading, paramsTable.pagination, searchBarMemo, searchResult]);
};

export default CooperateEquipmentPanel;
