import React, { useCallback, useMemo } from 'react';
import './index.less';
import HeaderLayout from '@/components/HeaderLayout';
import { useTable } from 'ym-web-view';
import { columns, tableTestData } from './common';
import { getActionCol } from '@/utils/utils';
import { IAction } from '@/utils/type';
import { Table } from 'antd';
interface IProps {

}
export const Login: React.FC<IProps> = props => {
    const paramsTable = useTable('', undefined, 3, true, true);

    const handleView = useCallback((record: any) => {

    }, [])
    const handleEdit = useCallback((record: any) => {

    }, [])
    const handlePrintCode = useCallback((record: any) => {

    }, [])

    const tableColumns = useMemo(() => {
        const actions: IAction[] = [
            { text: '查看', handler: handleView },
            { text: '编辑', handler: handleEdit },
            { text: '打印二维码', handler: handlePrintCode },
        ]
        return [...columns, getActionCol(actions)]
    }, [handleEdit, handlePrintCode, handleView])

    return useMemo(() => {

        return (
            <HeaderLayout
                children={
                    <div className='page-dashboard flex-col-100  '>
                        <div className="map mb15 bttt">
                            地图
                        </div>
                        <div className="table p15 bttt">
                            <Table
                                {...paramsTable}
                                columns={tableColumns}
                                dataSource={tableTestData}
                            />
                        </div>
                    </div>
                }
            />
        )
    }, [paramsTable, tableColumns])

}

export default Login;
