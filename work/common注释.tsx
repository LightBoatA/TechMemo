import React from 'react';
import { WorkOrderStatusList, WorkOrderStatus, EquipmentStatusList, EquipmentStatus, EquipmentProductProcessingList, WorkOrderStatusAuditList } from '@/utils/type';
import { conversionStatus, dealDate, dealTime, emptyFormat, getColumnItem } from '@/utils/utils';
import { IOptions, getChooseTableParams, propertyTypeEnum } from 'ym-web-view';
import ColumnLayout from './ColumnLayout';
import ColumnImg from './ColumnImg';
import Tag from './Tag';

export interface FilterSearchOptions {
  isDate?: boolean;
  isProcessModule?: boolean;
  isDeviceType?: boolean;
  isWorkOrderStatus?: boolean;
  isStatus?: boolean;
  isProductProcessing?: boolean;
  isSearchField?: boolean;
  isAuditStatus?: boolean;
}

export const defaultFilterSearchOptions: FilterSearchOptions = {
  isDate: true,
  isProcessModule: true,
  isDeviceType: true,
  isWorkOrderStatus: true,
  isStatus: true,
  isProductProcessing: true,
  isSearchField: true,
  isAuditStatus: true
};

export enum EquipmentPanelKey {
  'Submitted' = 'Submitted',
  'NotCommitted' = 'NotCommitted',
  'Live' = 'Live',
  'NotOnline' = 'NotOnline',
  'Reviewed' = 'Reviewed',
  'Audited' = 'Audited'
}

export const initWorkOrderStatus = (activeKey: string) => {
    // 切换tab页时，“状态”下拉框的选项不同
  if (activeKey === EquipmentPanelKey.Submitted) {
    return [WorkOrderStatus.PENDING, WorkOrderStatus.APPROVED];
  }
  if (activeKey === EquipmentPanelKey.NotCommitted) {
    return [WorkOrderStatus.TO_SUBMIT, WorkOrderStatus.REJECTED];
  }
  if (activeKey === EquipmentPanelKey.Live) {
    return [WorkOrderStatus.APPROVED];
  }
  if (activeKey === EquipmentPanelKey.NotOnline) {
    return [WorkOrderStatus.PENDING, WorkOrderStatus.REJECTED, WorkOrderStatus.TO_SUBMIT];
  }
  if (activeKey === EquipmentPanelKey.Reviewed) {
    return [WorkOrderStatus.PENDING];
  }
  if (activeKey === EquipmentPanelKey.Audited) {
    return [WorkOrderStatus.APPROVED, WorkOrderStatus.REJECTED];
  }
  return [];
};

// 获取指定的工艺模块和设备类型
export const handleFilterDeviceType = (data, singleProcessModule) => {
  if (!singleProcessModule)
    return {
      modules: [],
      devices: []
    };
  const _modules: { text: string; value: string }[] = [];
  let _devices: { text: string; value: string }[] = [];
  data?.module?.forEach(item => {
    _modules.push({ text: item.name, value: item.name });
    if (item.name === singleProcessModule) {
      item?.children?.forEach(i => {
        _devices.push({ text: i, value: i });
      });
    }
  });
  return {
    modules: _modules,
    devices: _devices
  };
};

export const initSearchOptions = (filterSearchOptions: FilterSearchOptions, activeKey: string, filterProcessModules, filterDevices) => {
  const _WorkOrderStatusList = WorkOrderStatusList.filter(item => {
    if (activeKey === EquipmentPanelKey.Submitted) {
      return item.value.includes(WorkOrderStatus.APPROVED) || item.value.includes(WorkOrderStatus.PENDING);
    }
    if (activeKey === EquipmentPanelKey.NotCommitted) {
      return item.value.includes(WorkOrderStatus.REJECTED) || item.value.includes(WorkOrderStatus.TO_SUBMIT);
    }
    if (activeKey === EquipmentPanelKey.NotOnline) {
      return item.value.includes(WorkOrderStatus.REJECTED) || item.value.includes(WorkOrderStatus.TO_SUBMIT) || item.value.includes(WorkOrderStatus.PENDING);
    }
    return true;
  });
  const searchOptions: IOptions[] = [];
  const isReviewed = activeKey === EquipmentPanelKey.Reviewed;
  const _placeholder = isReviewed ? ['申请开始日期', '申请结束日期'] : ['审核开始日期', '审核结束日期'] 
  const { isDate, isProcessModule, isDeviceType, isWorkOrderStatus, isStatus, isProductProcessing, isSearchField, isAuditStatus } = filterSearchOptions;
  isDate && searchOptions.push({ type: propertyTypeEnum.rangeDate, name: 'date', placeholder: _placeholder, width: '350px' });
  isProcessModule &&
    searchOptions.push({
      type: propertyTypeEnum.select,
      name: 'processModule',
      placeholder: '请选择工艺模块',
      availableOptions: filterProcessModules,
      width: '200px',
      aliasText: 'text',
      aliasValue: 'value'
    });
  isDeviceType &&
    searchOptions.push({
      type: propertyTypeEnum.select,
      name: 'deviceType',
      placeholder: '请选择设备类型',
      availableOptions: filterDevices,
      width: '200px',
      aliasText: 'text',
      aliasValue: 'value'
    });
  isWorkOrderStatus &&
    searchOptions.push({
      type: propertyTypeEnum.select,
      name: 'status',
      placeholder: '请选择上线状态',
      availableOptions: _WorkOrderStatusList,
      width: '200px',
      aliasText: 'text',
      aliasValue: 'value'
    });
  isStatus &&
    searchOptions.push({
      type: propertyTypeEnum.select,
      name: 'deviceStatus',
      placeholder: '请选择设备状态',
      availableOptions: EquipmentStatusList,
      width: '200px',
      aliasText: 'text',
      aliasValue: 'value'
    });
  isProductProcessing &&
    searchOptions.push({
      type: propertyTypeEnum.select,
      name: 'productProcessing',
      placeholder: '请选择生产加工',
      availableOptions: EquipmentProductProcessingList,
      width: '200px',
      aliasText: 'text',
      aliasValue: 'value'
    });
  isAuditStatus &&
    searchOptions.push({
      type: propertyTypeEnum.select,
      name: 'status',
      placeholder: '请选择审核状态',
      availableOptions: WorkOrderStatusAuditList,
      width: '200px',
      aliasText: 'text',
      aliasValue: 'value'
    });
  isSearchField &&
    searchOptions.push({
      type: propertyTypeEnum.search,
      name: 'searchField',
      placeholder: '请输入系统ID或设备名称或设备型号',
      width: '260px'
    });
  return searchOptions;
};

export interface FilterColumns {
  isId?: boolean;
  isPicture?: boolean;
  isName?: boolean;
  isProcessModule?: boolean;
  isDeviceToEnterprise?: boolean;
  isNumber?: boolean;
  isDeviceModel?: boolean;
  isDeviceToWorkOrder?: boolean;
  isStatus?: boolean;
  isWorkOrderAndDevice?: boolean;
  isWorkOrderAudit?: boolean;
}

export const defalutFilterColumns: FilterColumns = {
  isId: true,
  isPicture: true,
  isName: true,
  isProcessModule: true,
  isDeviceToEnterprise: true,
  isNumber: true,
  isDeviceModel: true,
  isDeviceToWorkOrder: true,
  isStatus: true,
  isWorkOrderAndDevice: true,
  isWorkOrderAudit: true
};

export const initColumns = (filterColumns: FilterColumns, activeKey) => {
  const isAudited = activeKey === EquipmentPanelKey.Audited;
  const columns: any[] = [];
  if (!filterColumns) return columns;
  const { isId, isPicture, isName, isProcessModule, isDeviceToEnterprise, isNumber, isDeviceModel, isDeviceToWorkOrder, isStatus, isWorkOrderAndDevice, isWorkOrderAudit } = filterColumns;
  isId &&
    columns.push(
      getColumnItem('系统ID及日期', 'systemId', 'systemId', 'center', '', (_, record) => {
        return <ColumnLayout topText={emptyFormat(record.systemId)} bottomText={emptyFormat(dealDate(record.createdDate))} />;
      })
    );
  isPicture &&
    columns.push(
      getColumnItem('设备图片', 'picture', 'picture', 'center', '', text => {
        return <ColumnImg url={text} />;
      })
    );
  isName &&
    columns.push(
      getColumnItem('设备名称及型号', 'name', 'name', 'center', '', (text, record) => {
        return <ColumnLayout topText={emptyFormat(record.name)} bottomText={emptyFormat(record.model)} />;
      })
    );
  isProcessModule &&
    columns.push(
      getColumnItem('工艺模块及设备类型', 'processModule', 'processModule', 'center', '', (text, record) => {
        return <ColumnLayout topText={emptyFormat(record.processModule)} bottomText={emptyFormat(record.deviceType)} />;
      })
    );
  isDeviceToEnterprise &&
    columns.push(
      getColumnItem('客户及联系电话', 'deviceToEnterprise', 'deviceToEnterprise', 'center', '', (text, record) => {
        return <ColumnLayout topText={emptyFormat(record.deviceToEnterprise?.name)} bottomText={emptyFormat(record.deviceToEnterprise?.contact?.phone)} />;
      })
    );
  isNumber &&
    columns.push(
      getColumnItem('设备编号及生产加工', 'number', 'number', 'center', '', (text, record) => {
        return <ColumnLayout topText={emptyFormat(record.number)} bottomText={emptyFormat(record.productProcessing ? '支持生产加工' : '不支持生产加工')} />;
      })
    );
  isDeviceModel &&
    columns.push(
      getColumnItem('绑定模型及厂房', 'deviceModel', 'deviceModel', 'center', '', (text, record) => {
        return emptyFormat('');
      })
    );
  isDeviceToWorkOrder &&
    columns.push(
      getColumnItem('上线状态及添加人', 'deviceToWorkOrder', 'deviceToWorkOrder', 'center', '', (text, record) => {
        const _status = record.deviceToWorkOrder?.status;
        const _text = conversionStatus(WorkOrderStatusList, record.deviceToWorkOrder?.status);
        const _name = record.deviceToUserAccount?.name;
        if (_status === WorkOrderStatus.TO_SUBMIT || _status === WorkOrderStatus.PENDING) {
          return <ColumnLayout isTopTooltip={false} topText={<Tag text={_text} bgColor="#FDDEB3" color="#F99204" />} bottomText={emptyFormat(_name)} />;
        }
        if (_status === WorkOrderStatus.APPROVED) {
          return <ColumnLayout isTopTooltip={false} topText={<Tag text={_text} bgColor="#E2EFFF" color="#2F8EFF" />} bottomText={emptyFormat(_name)} />;
        }
        if (_status === WorkOrderStatus.REJECTED) {
          return <ColumnLayout isTopTooltip={false} topText={<Tag text={_text} bgColor="#FFEEEE" color="#EF1313" />} bottomText={emptyFormat(_name)} />;
        }
        return emptyFormat('');
      })
    );
  isStatus &&
    columns.push(
      getColumnItem('设备状态', 'deviceStatus', 'deviceStatus', 'center', '', (text, record) => {
        const _status = record.deviceStatus;
        const _text = conversionStatus(EquipmentStatusList, _status);
        if (_status === EquipmentStatus.NORMAL) {
          return (
            <div className="flex flex-h-center">
              <Tag text={_text} bgColor="#E5FFE5" color="#2FE830" />
            </div>
          );
        }
        if (_status === EquipmentStatus.MAINTENANCE) {
          return (
            <div className="flex flex-h-center">
              <Tag text={_text} bgColor="#FFF4E5" color="#F99204" />
            </div>
          );
        }
        if (_status === EquipmentStatus.OVERHAUL) {
          return (
            <div className="flex flex-h-center">
              <Tag text={_text} bgColor="#FFEEEE" color="#EF1313" />
            </div>
          );
        }
        return emptyFormat('');
      })
    );
  isWorkOrderAndDevice &&
    columns.push(
      getColumnItem('上线状态及设备状态', 'workOrderAndDevice', 'workOrderAndDevice', 'center', '', (_, record) => {
        if (record.status && record.deviceToWorkOrder) {
          const _status = record.deviceStatus;
          const _text = conversionStatus(EquipmentStatusList, _status);
          const _workOrderstatus = record.deviceToWorkOrder.status;
          const _workOrdertext = conversionStatus(WorkOrderStatusList, record.deviceToWorkOrder.status);
          let topNode: React.ReactNode = '';
          let bottomNode: React.ReactNode = '';
          if (_status === EquipmentStatus.NORMAL) {
            bottomNode = <Tag text={_text} bgColor="#E5FFE5" color="#2FE830" />;
          }
          if (_status === EquipmentStatus.MAINTENANCE) {
            bottomNode = <Tag text={_text} bgColor="#FFF4E5" color="#F99204" />;
          }
          if (_status === EquipmentStatus.OVERHAUL) {
            bottomNode = <Tag text={_text} bgColor="#FFEEEE" color="#EF1313" />;
          }
          if (_workOrderstatus === WorkOrderStatus.TO_SUBMIT || _workOrderstatus === WorkOrderStatus.PENDING) {
            topNode = <Tag text={_workOrdertext} bgColor="#FDDEB3" color="#F99204" />;
          }
          if (_workOrderstatus === WorkOrderStatus.APPROVED) {
            topNode = <Tag text={_workOrdertext} bgColor="#E2EFFF" color="#2F8EFF" />;
          }
          if (_workOrderstatus === WorkOrderStatus.REJECTED) {
            topNode = <Tag text={_workOrdertext} bgColor="#FFEEEE" color="#EF1313" />;
          }
          return <ColumnLayout isBottomTooltip={false} isTopTooltip={false} topText={topNode} bottomText={bottomNode} />;
        }
        return emptyFormat('');
      })
    );
  (isWorkOrderAudit && isAudited) &&
    columns.push(
      getColumnItem('审核日期及状态', 'audit', 'audit', 'center', '', (text, record) => {
        if (record.deviceToWorkOrder) {
          const _workOrderstatus = record.deviceToWorkOrder.status;
          const _workOrdertext = conversionStatus(WorkOrderStatusAuditList, record.deviceToWorkOrder.status);
          let topNode: React.ReactNode = dealTime(record.deviceToWorkOrder.lastModifiedDate) || emptyFormat('');
          let bottomNode: React.ReactNode = '';
          if (_workOrderstatus === WorkOrderStatus.APPROVED) {
            bottomNode = <Tag text={_workOrdertext} bgColor="#E2EFFF" color="#2F8EFF" />;
          }
          if (_workOrderstatus === WorkOrderStatus.REJECTED) {
            bottomNode = <Tag text={_workOrdertext} bgColor="#FFEEEE" color="#EF1313" />;
          }
          return <ColumnLayout isBottomTooltip={false} topText={topNode} bottomText={bottomNode} />;
        }
        return emptyFormat('');
      })
    );
  return columns;
};

export const getTResult = (key: string) => {
  const _result: any = {};
  const result = getChooseTableParams(key);
  console.log('zss-result:', result);
  
  if (Object.keys(result).length === 0) return {};
  if (result.searchCondition?.processModule && Array.isArray(result.searchCondition?.processModule)) {
    _result.processModule = result.searchCondition?.processModule[0];
  }
  if (result.searchCondition?.deviceType) {
    _result.deviceType = result.searchCondition?.deviceType;
  }
  if (result.searchCondition?.status && Array.isArray(result.searchCondition?.status) && result.searchCondition?.status.length === 1) {
    _result.status = result.searchCondition?.status[0];
  }
  if (result.searchCondition?.deviceStatus) {
    _result.deviceStatus = result.searchCondition?.deviceStatus;
  }
  if (result.searchCondition?.searchField) {
    _result.searchField = result.searchCondition?.searchField;
  }
  if (Object.keys(_result).length) {
    return _result;
  }
  return {};
};
