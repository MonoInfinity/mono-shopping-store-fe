import * as React from 'react';
import { RootState } from '../../../store';

import ViewMyProfilePresentation from './presentation';

import { AuthState } from '../../../common/interface/user.interface';
import { useSelector } from 'react-redux';
import { useTranslate } from '../../../common/hooks/useTranslate';

const ViewMyProfileContainer: React.FC = () => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const translate = useTranslate();

        return <ViewMyProfilePresentation authState={authState} translate={translate} />;
};

export default ViewMyProfileContainer;
