import Box from '@mui/material/Box';
import { useWindowWidth } from '@sc-hooks';
import type { ReactNode } from 'react';
import type {
    MenuPlacement,
    PropsValue,
    SelectComponentsConfig,
    ActionMeta,
    CSSObjectWithLabel,
    GroupBase,
    MultiValue,
    SingleValue,
    StylesConfig,
} from 'react-select';
import Select from 'react-select';

import type { MediaOption, MediaOptionGroup } from '@sc-media/ui/videoStream/dropdown/types';
import { DarkBluePalette, GreyPalette, GenericColors } from '@sc-ui/system';

import { ThemeNames } from 'src/common/enums';
import type { ThemeName } from 'src/typings/react-select';
import type { Option as OptionType } from 'src/ui/crossbetting/FilterDropdown/types';

import { Control, IndicatorsContainer, MenuList, Option } from './DropdownSelectComponents';

interface DropdownSelectProps {
    customTheme?: ThemeName;
    showAllItems?: boolean;
    options?: OptionType[] | MediaOptionGroup[] | undefined;
    isOptionDisabled?: (option: OptionType | MediaOption) => boolean;
    components?: SelectComponentsConfig<OptionType, boolean, GroupBase<OptionType | MediaOptionGroup>>;
    placeholder?: ReactNode | string;
    formatGroupLabel?: ((group: GroupBase<OptionType | MediaOptionGroup>) => ReactNode) | undefined;
    captureMenuScroll?: boolean;
    menuPlacement?: MenuPlacement;
    onChange?: (
        newValue: SingleValue<OptionType | MediaOption> | MultiValue<OptionType | MediaOption>,
        actionMeta: ActionMeta<OptionType | MediaOption>,
    ) => void;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
    isDisabled?: boolean;
    isMarket?: boolean;
    isLastDropdown?: boolean;
    value?: PropsValue<OptionType | MediaOption> | undefined;
    styles?: Record<string, string>;
    className?: string;
}

const baseMenuStyle = {
    zIndex: 10,
    backgroundColor: GenericColors.transparent,
    margin: 0,
    overflow: 'hidden',
    boxShadow: `0px 2px 4px 1px ${DarkBluePalette.darkBlue1}`,
};

type ReactSelectStylesConfig = StylesConfig<
    OptionType | MediaOption,
    boolean,
    GroupBase<OptionType | MediaOptionGroup>
>;

const stylesBase: ReactSelectStylesConfig = Object.freeze({
    control: () => ({
        border: '0',
    }),
    menu: (base: CSSObjectWithLabel) => ({
        ...base,
        ...baseMenuStyle,
    }),
    menuList: (base: CSSObjectWithLabel) => ({
        ...base,
        maxHeight: 'inherit',
        padding: 0,
        overflow: 'hidden',
    }),
    singleValue: (): CSSObjectWithLabel => ({
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '98%',
    }),
    clearIndicator: () => ({}),
    placeholder: () => ({
        color: GreyPalette.grey7,
    }),
});

const lastDropdownStyles: Readonly<CSSObjectWithLabel> = {
    right: 0,
};
const lastMobileDropdownStyleVariation: Readonly<ReactSelectStylesConfig> = {
    ...stylesBase,
    menu: (base: CSSObjectWithLabel) => ({ ...base, ...baseMenuStyle }),
};

const lastDesktopDropdownStyleVariation: Readonly<ReactSelectStylesConfig> = {
    ...stylesBase,
    menu: (base: CSSObjectWithLabel) => ({ ...base, ...baseMenuStyle, ...lastDropdownStyles }),
};

const DropdownSelect = (props: DropdownSelectProps & { styles?: ReactSelectStylesConfig }) => {
    const {
        options = [],
        components,
        captureMenuScroll,
        customTheme = ThemeNames.Dark2,
        isMarket = false,
        showAllItems = false,
        isLastDropdown = false,
        onChange,
        styles,
        ...selectDropdown
    } = props;
    const { isMobile } = useWindowWidth();

    const adjustedStyles = isMobile
        ? {
              ...lastMobileDropdownStyleVariation,
              ...styles,
          }
        : {
              ...lastDesktopDropdownStyleVariation,
              menu: (base: CSSObjectWithLabel) => ({
                  ...base,
                  ...baseMenuStyle,
                  ...(isLastDropdown ? lastDropdownStyles : {}),
                  width: '100%',
              }),
          };

    return (
        <Box sx={{ position: 'relative' }}>
            <Select
                classNamePrefix='filter'
                showAllItems={showAllItems}
                options={options}
                themeName={customTheme}
                isSearchable={false}
                captureMenuScroll={Boolean(captureMenuScroll)}
                menuShouldScrollIntoView={true}
                customTheme={customTheme}
                components={{
                    Control,
                    MenuList,
                    Option,
                    IndicatorsContainer,
                    ...components,
                }}
                onChange={onChange}
                isMarket={isMarket}
                styles={adjustedStyles}
                {...selectDropdown}
            />
        </Box>
    );
};

export default DropdownSelect;
