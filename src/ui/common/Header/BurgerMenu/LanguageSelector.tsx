import { useChineseLangSupportFlag, useJapaneseLangSupportFlag } from '@solo-feature-flags';
import filter from 'lodash/filter';
import map from 'lodash/map';
import { memo, useState } from 'react';
import type { MultiValue, SingleValue } from 'react-select';

import type { MediaOption } from '@solo-media/ui/videoStream/dropdown/types';

import { useAppStateContext } from 'src/appState/AppState';
import China from 'src/assets/countries_flags/china_flag_24px.svg';
import GreatBritain from 'src/assets/countries_flags/gb_flag_24px.svg';
import Japan from 'src/assets/countries_flags/japan_flag_24px.svg';
import KoreaSouth from 'src/assets/countries_flags/southkorea_flag_24px.svg';
import { DropdownMenuPlacement, ThemeNames } from 'src/common/enums';
import DropdownSelect from 'src/ui/common/DropdownSelect/DropdownSelect';
import { S_Icon, S_Option } from 'src/ui/common/Header/BurgerMenu/styled';
import { I18n } from 'src/ui/common/Language/I18n';
import type { Option } from 'src/common/types/option';
import { LANGUAGES } from 'src/utils/constants';

interface Props {
    menuPlacement?: DropdownMenuPlacement;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
}

const propsAreEqual = (prevProps: Props, nextProps: Props) => prevProps.menuPlacement === nextProps.menuPlacement;

const LanguageSelector = ({ menuPlacement = DropdownMenuPlacement.Auto, onMenuOpen, onMenuClose }: Props) => {
    const {
        language: { userLang, setUserLang },
        language,
    } = useAppStateContext();
    const chineseLangSupportFlag = useChineseLangSupportFlag();
    const japaneseLangSupportFlag = useJapaneseLangSupportFlag();

    const options: Option[] = [
        {
            label: (
                <S_Option>
                    <S_Icon src={GreatBritain} />
                    <I18n langKey={`lang.${LANGUAGES.english}`} defaultText='English' />
                </S_Option>
            ),
            value: LANGUAGES.english,
        },
        {
            label: (
                <S_Option>
                    <S_Icon src={KoreaSouth} />
                    <I18n langKey={`lang.${LANGUAGES.korean}`} defaultText='Korean' />
                </S_Option>
            ),
            value: LANGUAGES.korean,
        },
        {
            label: (
                <S_Option>
                    <S_Icon src={Japan} />
                    <I18n langKey={`lang.${LANGUAGES.japanese}`} defaultText='Japanese' />
                </S_Option>
            ),
            value: LANGUAGES.japanese,
            disabled: !japaneseLangSupportFlag,
        },
        {
            label: (
                <S_Option>
                    <S_Icon src={China} />
                    <I18n langKey={`lang.${LANGUAGES.chinese}`} defaultText='Chinese' />
                </S_Option>
            ),
            value: LANGUAGES.chinese,
            disabled: !chineseLangSupportFlag,
        },
    ];

    const availableLanguages = map(language.getLanguages(), 'id');
    const supportedLanguages = filter(
        options,
        ({ value, disabled = false }) => availableLanguages.includes(value) && !disabled,
    );

    const defaultOption = supportedLanguages.find((language) => language.value === userLang);

    const [value, setValue] = useState<Option | undefined>(defaultOption);

    const onChangeDropdownSelect = (data: SingleValue<Option | MediaOption> | MultiValue<Option | MediaOption>) => {
        setValue(data as Option);
        setUserLang((data as Option).value);
        window.location.reload();
    };

    return (
        <DropdownSelect
            isOptionDisabled={(option) => option.value === userLang}
            customTheme={ThemeNames.Dark2}
            value={value}
            options={supportedLanguages}
            showAllItems={true}
            onMenuClose={onMenuClose}
            onMenuOpen={onMenuOpen}
            onChange={onChangeDropdownSelect}
            menuPlacement={menuPlacement}
        />
    );
};

export default memo(LanguageSelector, propsAreEqual);
