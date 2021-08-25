import * as React from 'react';
import { RootState } from '../../../store';

import locales from './locales.json';
import ViewMyProfilePresentation from './presentation';

import { AuthState } from '../../../common/interface/user.interface';
import { useSelector } from 'react-redux';
import { useTranslate } from '../../../common/hooks/useTranslate';

export type LocaleKey = keyof typeof locales.en;

const ViewMyProfileContainer: React.FC = () => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const translate = useTranslate<LocaleKey>({ dictionary: locales, name: 'viewMyProfilePage' });

        return <ViewMyProfilePresentation authState={authState} translate={translate} />;
};

export default ViewMyProfileContainer;
