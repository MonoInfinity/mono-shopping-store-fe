import { useTranslation } from 'react-i18next';
import { LocaleKey } from '../interface/locale.interface';

export interface UseTranslateProps {}

export function useTranslate() {
        const { t } = useTranslation();

        const translate = (key: LocaleKey | string, context?: {}) => {
                return t(`${String(key)}`, { context });
        };

        return translate;
}
