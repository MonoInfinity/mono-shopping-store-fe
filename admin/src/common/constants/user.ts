import { OptionItem } from '../../components/form/formSelect';
import { UserRole } from '../interface/user.interface';

export const roleOptions: OptionItem[] = [
        {
                value: UserRole.CUSTOMER,
                label: 'user-role-customer',
        },
        {
                value: UserRole.SHIPPER,
                label: 'user-role-shipper',
        },
        {
                value: UserRole.CASHIER,
                label: 'user-role-cashier',
        },
        {
                value: UserRole.MANAGER,
                label: 'user-role-manager',
        },
        {
                value: UserRole.OWNER,
                label: 'user-role-owner',
        },
];
