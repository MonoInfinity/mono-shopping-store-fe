import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { AuthState, UserRole } from '../interface/user.interface';

export interface DisplayByRoleProps {
        acceptRole: UserRole[];
        Component: React.ReactElement;
}

const DisplayByRole: React.FC<DisplayByRoleProps> = ({ Component, acceptRole }) => {
        const authState = useSelector<RootState, AuthState>((state) => state.auth);
        return acceptRole.includes(authState.role) ? Component : null;
};

export default DisplayByRole;
