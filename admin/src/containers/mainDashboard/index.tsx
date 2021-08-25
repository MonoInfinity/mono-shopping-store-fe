import * as React from 'react';
import MainDashboardPresentation from './presentation';
import locales from './locales.json';
import { useTranslate } from '../../common/hooks/useTranslate';

export type LocaleKey = keyof typeof locales.en;

const MainDashboardContainer: React.FC = () => {
        const translate = useTranslate<LocaleKey>({ dictionary: locales, name: 'mainDashboard' });

        return <MainDashboardPresentation translate={translate} />;
};

export default MainDashboardContainer;
