import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleLanguages } from '../interface/locale.interface';

export interface UseTranslateProps {
        dictionary: LocaleLanguages;
        name: string;
}

export function useTranslate<T>({ dictionary, name }: UseTranslateProps) {
        const { t, i18n } = useTranslation();

        useEffect(() => {
                i18n.addResourceBundle('en', 'translation', {
                        [`${name}`]: dictionary.en,
                });
                i18n.addResourceBundle('vi', 'translation', {
                        [`${name}`]: dictionary.vi,
                });
        }, [dictionary, i18n, name]);

        const translate = (key: T, context?: {}) => {
                return t(`${name}.${String(key)}`, { context });
        };

        return translate;
}
