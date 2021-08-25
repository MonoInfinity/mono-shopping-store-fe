import * as React from 'react';
import { useSelector } from 'react-redux';

import { RootState, store } from '../../store';
import { apiActions } from '../../store/api';
import { ApiState } from '../interface/api.interface';

export function useFormError<T>(defaultValues: T) {
        const [errors, setErrors] = React.useState<T>(defaultValues);
        const apiState = useSelector<RootState, ApiState>((state) => state.api);

        React.useEffect(() => {
                const { isError, errorDetails } = apiState;

                if (isError) setErrors({ ...defaultValues, ...errorDetails });
                else setErrors(defaultValues);
        }, [apiState, defaultValues]);

        React.useEffect(() => {
                return () => {
                        store.dispatch(apiActions.resetState());
                };
        }, []);

        return errors;
}

export default useFormError;
