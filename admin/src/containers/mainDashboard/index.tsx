import * as React from 'react';
import MainDashboardPresentation from './presentation';

import { useTranslate } from '../../common/hooks/useTranslate';
import { RouteProtectedWrapper } from '../../common/HOC/routerProtectedWrapper';

const MainDashboardContainer: React.FC = () => {
        const translate = useTranslate();

        return (
                <RouteProtectedWrapper isNeedLogin>
                        <MainDashboardPresentation translate={translate} />
                </RouteProtectedWrapper>
        );
};

export default MainDashboardContainer;
