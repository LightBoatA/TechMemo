import React, { useMemo } from 'react';
import './index.less';
interface IProps {

}
export const 组件名: React.FC<IProps> = props => {
  const {} = props;
  return useMemo(() => {
    return (
      <div className="组件类名">

      </div>
    );
  }, []);

};

export default 组件名;