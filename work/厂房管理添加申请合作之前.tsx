import CustomerLayout from "@/components/CustomerLayout";
import CustomerLeftMenu, { ProcessType } from "@/components/CustomerLeftMenu";
import React, { useCallback, useMemo, useState } from "react";
import { Tabs } from "ym-web-view";
import CooperateFactoryPanel from "./panel";
import './index.less';
import { submitStatus } from "@/utils/type";

export const CooperateFactoryManage: React.FC = () => {
    const [activeKey, setActiveKey] = useState<string>(submitStatus.submitted);
    
    
    const SubmittedPanelRender = useMemo(() => {
        return (
            <CooperateFactoryPanel
                activeKey={submitStatus.submitted}
            ></CooperateFactoryPanel>
        )
    }, [])
    
    const UnSubmitPanelRender = useMemo(() => {
        return (
            <CooperateFactoryPanel
                activeKey={submitStatus.unSubmitted}
            ></CooperateFactoryPanel>
        )
    }, [])

    const handleTabsChange = useCallback(value => {
        setActiveKey(value);
    }, []);

    return useMemo(() => {
        const tabsData = [
            {
              tab: '已提交',
              key: submitStatus.submitted,
              content: SubmittedPanelRender
            },
            {
              tab: '未提交',
              key: submitStatus.unSubmitted,
              content: UnSubmitPanelRender
            }
        ];
        return (
            <CustomerLeftMenu title={'我要合作'} selectedPath={'/cooperateEquipment'} type={ProcessType.COOPERATE}>
                <CustomerLayout breadData={[{ name: '操作台', url: '/' }, { name: '厂房管理' }]}>
                    <div className="factory">
                    <Tabs data={tabsData} activeKey={activeKey} tabsParams={{ destroyInactiveTabPane: true }} onChange={handleTabsChange} />
                    
                    </div>
                </CustomerLayout>
            </CustomerLeftMenu>
        )
    }, [SubmittedPanelRender, UnSubmitPanelRender, activeKey, handleTabsChange])
};

export default CooperateFactoryManage;