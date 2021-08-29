import * as React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../store';
import { AuthState, UserRole } from '../interface/user.interface';
import { routers } from '../constants/router';

export interface RoleProtectedProps {
        acceptRole: UserRole[];
        isRedirect?: boolean;
}

const RoleProtected: React.FC<RoleProtectedProps> = ({ children, acceptRole, isRedirect = false }) => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        const router = useHistory();

        React.useEffect(() => {
                const isCorrectRole = acceptRole.includes(authState.role);

                if (!isCorrectRole && isRedirect) {
                        router.push(routers.home.link);
                }
        }, [authState]);

        return acceptRole.includes(authState.role) ? <>{children}</> : null;
};

export default RoleProtected;
