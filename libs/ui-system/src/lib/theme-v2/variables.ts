import { toColor } from './utilities';

export type Variable = keyof typeof variables;
const blue: Record<CSSVariable, ValidColor> = {};
const neon: Record<CSSVariable, ValidColor> = {};
const contrast: Record<CSSVariable, ValidColor> = {};

/**
 * Order variables alphabetically
 */
export const variables = {
    '--accordion-bg': {
        blue: 'darkBlue.600',
        neon: 'ioLightBlue.500',
        contrast: 'contrastRed.700',
    },
    '--accordion-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.400',
    },
    '--accordion-header-bg': {
        blue: 'darkBlue.600',
        neon: 'ioLightBlue.500',
        contrast: 'contrastRed.700',
    },
    '--accordion-header-bg-hover': {
        blue: 'darkBlue.600:90%',
        neon: 'ioLightBlue.500:90%',
        contrast: 'contrastRed.400',
    },
    '--accordion-body-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },

    '--badge-text': {
        blue: 'white',
        neon: 'white',
        contrast: 'contrastRed.900',
    },
    '--badge-error-bg': {
        blue: 'red.600',
        neon: 'red.600',
        contrast: 'contrastRed.500',
    },
    '--badge-secondary-bg': {
        blue: 'grey.50',
        neon: 'grey.50',
        contrast: 'contrastRed.50',
    },
    '--badge-secondary-text': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },
    '--badge-generic-border': {
        blue: 'transparent',
        neon: 'transparent',
        contrast: 'transparent',
    },

    '--button-outlined-default-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.600',
        contrast: 'contrastRed.500',
    },

    '--button-contained-betslip-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },
    '--button-contained-betslip-hover-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--button-contained-betslip-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },
    '--button-outlined-betslip-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--button-outlined-betslip-border': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.500',
    },
    '--button-disabled-betslip-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.500:60%',
        contrast: 'contrastRed.400',
    },
    '--button-disabled-betslip-border': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.500:60%',
        contrast: 'contrastRed.400',
    },

    '--box-default-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--box-default-border': {
        blue: 'darkBlue.600',
        neon: 'debugMint.600',
        contrast: 'contrastRed.600',
    },
    '--box-secondary-border': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },
    '--box-default-shadow': {
        blue: 'darkBlue.900',
        neon: 'debugMint.900',
        contrast: 'contrastRed.900',
    },
    '--box-secondary-bg': {
        blue: 'darkBlue.600',
        neon: 'ioLightBlue.500',
        contrast: 'contrastRed.600',
    },

    '--table-cell-shadow': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },

    '--account-dev-text': {
        blue: 'white',
        neon: 'white',
        contrast: 'contrastRed.50',
    },

    '--alert-error-bg': {
        blue: 'red.900',
        neon: 'red.900',
        contrast: 'contrastRed.900',
    },
    '--alert-error-text': {
        blue: 'red.700',
        neon: 'red.600',
        contrast: 'contrastRed.700',
    },
    '--alert-info-bg': {
        blue: 'orange.50',
        neon: 'orange.50',
        contrast: 'contrastRed.900',
    },
    '--alert-info-text': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.200',
    },
    '--alert-success-bg': {
        blue: 'green.700',
        neon: 'green.700',
        contrast: 'contrastRed.700',
    },
    '--alert-success-text': {
        blue: 'green.500',
        neon: 'green.500',
        contrast: 'contrastRed.100',
    },
    '--alert-warning-bg': {
        blue: 'yellow.600',
        neon: 'yellow.600',
        contrast: 'contrastRed.600',
    },
    '--alert-warning-text': {
        blue: 'yellow.400',
        neon: 'yellow.300',
        contrast: 'contrastRed.400',
    },
    '--alert-primary-text': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },
    '--alert-secondary-text': {
        blue: 'orange.200',
        neon: 'orange.200',
        contrast: 'contrastRed.300',
    },

    '--alert-inline-success-color': {
        blue: 'green.600',
        neon: 'green.600',
        contrast: 'contrastRed.100',
    },
    '--alert-inline-success-bg': {
        blue: 'green.700',
        neon: 'green.700',
        contrast: 'contrastRed.200',
    },
    '--alert-inline-success-icon-color': {
        blue: 'green.500',
        neon: 'green.500',
        contrast: 'contrastRed.50',
    },

    '--badge-default-border': {
        blue: 'darkBlue.600',
        neon: 'darkBlue.600',
        contrast: 'contrastRed.600',
    },
    '--badge-default-bg': {
        blue: 'darkBlue.800',
        neon: 'darkBlue.800',
        contrast: 'contrastRed.800',
    },

    '--body-bg': {
        blue: 'darkBlue.900',
        neon: 'ioDarkBlue.900',
        contrast: 'contrastRed.900',
    },
    '--body-text': {
        blue: 'grey.50',
        neon: 'grey.50',
        contrast: 'contrastRed.50',
    },

    '--button-disabled-border': {
        blue: 'orange.500',
        neon: 'orange.500',
        contrast: 'contrastRed.50',
    },
    '--button-disabled-bg': {
        blue: 'orange.700',
        neon: 'orange.700',
        contrast: 'contrastRed.700',
    },
    '--button-brand-disabled-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.900',
    },
    '--button-brand-disabled-border': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.900',
    },

    '--button-base-bg': {
        blue: 'grey.900',
        neon: 'grey.900',
        contrast: 'contrastRed.900',
    },
    '--button-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },
    '--button-active-bg': {
        blue: 'darkBlue.500',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.400',
    },
    '--button-hover-bg': {
        blue: 'darkBlue.400',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.300',
    },
    '--button-contained-default-bg': {
        blue: 'white:20%',
        neon: 'white:20%',
        contrast: 'contrastRed.100:20%',
    },
    '--button-disabled-hover-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },
    '--button-selected-bg': {
        blue: 'orange.800',
        neon: 'orange.800',
        contrast: 'contrastRed.A700',
    },

    '--button-selected-hover-bg': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.A200',
    },

    '--box-selection-header-hover-bg': {
        blue: 'white:10%',
        neon: 'white:10%',
        contrast: 'contrastRed.400',
    },

    '--box-primary-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--box-primary-border': {
        blue: 'grey.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.100',
    },

    '--button-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.100',
    },
    '--button-warning-bg': {
        blue: 'yellow.700',
        neon: 'yellow.700',
        contrast: 'contrastRed.900',
    },
    '--button-warning-hover-bg': {
        blue: 'yellow.500',
        neon: 'yellow.500',
        contrast: 'contrastRed.500',
    },

    '--modal-header-bg': {
        blue: 'darkBlue.600',
        neon: 'ioLightBlue.500',
        contrast: 'contrastRed.600',
    },
    '--modal-body-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },

    '--button-DatePicker-today-border': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.200',
    },
    '--button-DatePicker-arrow-bg-hover': {
        blue: 'darkBlue.300:20%',
        neon: 'darkBlue.300:20%',
        contrast: 'contrastRed.300:20%',
    },
    '--button-DatePicker-bg-selected': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },
    '--button-DatePicker-bg-hover': {
        blue: 'orange.A100',
        neon: 'orange.A100',
        contrast: 'contrastRed.400:30%',
    },
    '--button-close-bg': {
        blue: 'transparent',
        neon: 'transparent',
        contrast: 'contrastRed.100:50%',
    },

    '--button-primary-bg': {
        blue: 'lightBlue.500',
        neon: 'lightBlue.500',
        contrast: 'contrastRed.500',
    },

    '--button-primary-hover-bg': {
        blue: 'lightBlue.300',
        neon: 'lightBlue.300',
        contrast: 'contrastRed.300',
    },

    '--button-contained-hover': {
        blue: 'darkBlue.500',
        neon: 'ioLightBlue.400',
        contrast: 'contrastRed.700',
    },

    '--chip-contained-default-bg': {
        blue: 'darkBlue.800:90%',
        neon: 'ioDarkBlue.600',
        contrast: 'contrastRed.600',
    },
    '--chip-contained-default-border': {
        blue: 'darkBlue.600',
        neon: 'darkBlue.700',
        contrast: 'contrastRed.400',
    },
    '--chip-large-outlined-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },
    '--chip-large-active-bg': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.400',
    },
    '--chip-large-outlined-hover-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },
    '--chip-large-active-hover-bg': {
        blue: 'orange.400',
        neon: 'orange.400',
        contrast: 'contrastRed.300',
    },
    '--chip-large-outlined-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.400',
    },
    '--chip-large-active-border': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.400',
    },
    '--chip-large-active-hover-border': {
        blue: 'orange.400',
        neon: 'orange.400',
        contrast: 'contrastRed.300',
    },
    '--chip-warning-color': {
        blue: 'white',
        neon: 'white',
        contrast: 'contrastRed.100',
    },

    '--checkbox-bg': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },
    '--checkbox-color': {
        blue: 'grey.600',
        neon: 'grey.600',
        contrast: 'contrastRed.600',
    },
    '--checkbox-border': {
        blue: 'grey.600',
        neon: 'grey.600',
        contrast: 'contrastRed.600',
    },
    '--checkbox-generic-border': {
        blue: 'transparent',
        neon: 'transparent',
        contrast: 'contrastRed.50',
    },
    '--checkbox-generic-bg': {
        blue: 'transparent',
        neon: 'transparent',
        contrast: 'contrastRed.50',
    },
    '--checkbox-default-border': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },

    '--button-numpad-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.800',
    },
    '--button-numpad-active-bg': {
        blue: 'darkBlue.400',
        neon: 'darkBlue.400',
        contrast: 'contrastRed.400',
    },
    '--button-numpad-hover-bg': {
        blue: 'darkBlue.400',
        neon: 'darkBlue.400',
        contrast: 'contrastRed.400',
    },

    '--button-preset-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.800',
    },
    '--button-preset-border': {
        blue: 'transparent',
        neon: 'transparent',
        contrast: 'transparent',
    },
    '--button-preset-hover-bg': {
        blue: 'orange.800',
        neon: 'orange.800',
        contrast: 'contrastRed.800',
    },

    '--button-max-stake-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },
    '--button-max-stake-disabled-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },
    '--button-max-stake-disabled-border': {
        blue: 'grey.50',
        neon: 'lightBlue.300',
        contrast: 'contrastRed.50',
    },
    '--button-max-stake-disabled-text': {
        blue: 'grey.50',
        neon: 'lightBlue.300',
        contrast: 'contrastRed.50',
    },

    '--button-default-bg': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.400',
    },
    '--button-default-border': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.400',
    },
    '--button-default-hover-bg': {
        blue: 'orange.400',
        neon: 'orange.400',
        contrast: 'contrastRed.400',
    },
    '--button-secondary-border': {
        blue: 'transparent',
        neon: 'transparent',
        contrast: 'contrastRed.300',
    },

    '--card-betslip-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.600',
    },
    '--card-betslip-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.400',
    },

    '--button-disabled-text': {
        blue: 'orange.100:65%',
        neon: 'orange.100:65%',
        contrast: 'contrastRed.100',
    },
    '--button-text': {
        blue: 'transparent',
        neon: 'transparent',
        contrast: 'contrastRed.50:50%',
    },
    '--button-success-bg': {
        blue: 'green.700',
        neon: 'green.500',
        contrast: 'contrastRed.200',
    },

    '--card-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },
    '--card-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.400',
    },

    '--chip-bg': {
        blue: 'darkBlue.400',
        neon: 'darkBlue.400',
        contrast: 'contrastRed.600',
    },
    '--chip-betslip-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },
    '--chip-betslip-disabled-bg': {
        blue: 'darkBlue.300',
        neon: 'debugMint.600',
        contrast: 'contrastRed.300',
    },

    '--chip-filters-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },
    '--chip-filters-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.500',
    },
    '--chip-filters-active-bg': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.400',
    },
    '--chip-filters-active-border': {
        blue: 'lightBlue.700',
        neon: 'ioLightBlue.300',
        contrast: 'contrastRed.400',
    },
    '--chip-freebet-bg': {
        blue: 'yellow.300',
        neon: 'yellow.300',
        contrast: 'contrastRed.200',
    },
    '--chip-freebet-text': {
        blue: 'darkBlue.900',
        neon: 'ioDarkBlue.900',
        contrast: 'contrastRed.900',
    },
    '--chip-default-border': {
        blue: 'grey.900',
        neon: 'grey.900',
        contrast: 'contrastRed.900',
    },
    '--chip-highlight-color': {
        blue: 'transparent',
        neon: 'transparent',
        contrast: 'contrastRed.50:50%',
    },

    '--chip-default-bg': {
        blue: 'darkBlue.400',
        neon: 'darkBlue.400',
        contrast: 'contrastRed.400',
    },
    '--chip-warning-bg': {
        blue: 'yellow.400',
        neon: 'yellow.400',
        contrast: 'contrastRed.200',
    },
    '--chip-primary-bg': {
        blue: 'lightBlue.400',
        neon: 'lightBlue.400',
        contrast: 'contrastRed.600',
    },
    '--chip-success-bg': {
        blue: 'green.600',
        neon: 'green.600',
        contrast: 'contrastRed.900',
    },
    '--chip-info-bg': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.700',
    },
    '--chip-small-bg': {
        blue: 'darkBlue.600',
        neon: 'debugMint.A100',
        contrast: 'contrastRed.600',
    },

    '--checkbox-warning-color': {
        blue: 'yellow.300',
        neon: 'debugMint.A100',
        contrast: 'contrastRed.300',
    },
    '--checkbox-warning-border': {
        blue: 'yellow.300',
        neon: 'yellow.300',
        contrast: 'contrastRed.300',
    },
    '--checkbox-warning-hover-border': {
        blue: 'yellow.400',
        neon: 'yellow.300',
        contrast: 'contrastRed.400',
    },
    '--checkbox-text': {
        blue: 'transparent',
        neon: 'transparent',
        contrast: 'contrastRed.50:50%',
    },

    '--chip-az-bg': {
        blue: 'darkBlue.500',
        neon: 'darkBlue.500',
        contrast: 'contrastRed.500',
    },

    '--box-betslip-header-border': {
        blue: 'grey.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.400',
    },

    '--box-betslip-footer-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.600',
    },

    '--divider-default-color': {
        blue: 'grey.50',
        neon: 'grey.50',
        contrast: 'contrastRed.100',
    },
    '--divider-primary-color': {
        blue: 'grey.400',
        neon: 'ioDarkBlue.300',
        contrast: 'contrastRed.300',
    },

    '--icon-color': {
        blue: 'darkBlue.400',
        neon: 'darkBlue.400',
        contrast: 'contrastRed.400',
    },
    '--icon-default-color': {
        blue: 'grey.400',
        neon: 'grey.400',
        contrast: 'contrastRed.A100',
    },
    '--icon-light-color': {
        blue: 'white',
        neon: 'white',
        contrast: 'contrastRed.100',
    },
    '--icon-active-color': {
        blue: 'lightBlue.500',
        neon: 'lightBlue.500',
        contrast: 'contrastRed.500',
    },
    '--icon-warning-color': {
        blue: 'yellow.300',
        neon: 'debugMint.600',
        contrast: 'contrastRed.300',
    },
    '--icon-selected-bg': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.500',
    },
    '--icon-chain-border': {
        blue: 'grey.400',
        neon: 'darkBlue.300',
        contrast: 'contrastRed.400',
    },

    '--input-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--input-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.400',
    },

    '--label-contained-bg': {
        blue: 'white',
        neon: 'white',
        contrast: 'contrastRed.200',
    },
    '--label-score-text': {
        blue: 'darkBlue.400',
        neon: 'ioDarkBlue.300',
        contrast: 'contrastRed.400',
    },

    '--link-text': {
        blue: 'white',
        neon: 'white',
        contrast: 'white',
    },
    '--link-selected-bg': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.600',
    },
    '--link-active-text': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.600',
    },
    '--link-hover-text': {
        blue: 'orange.200',
        neon: 'orange.200',
        contrast: 'contrastRed.800',
    },

    '--card-marquee-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--card-marquee-border': {
        blue: 'darkBlue.600',
        neon: 'darkBlue.600',
        contrast: 'contrastRed.600',
    },
    '--card-marquee-header-text': {
        blue: 'grey.200',
        neon: 'grey.200',
        contrast: 'contrastRed.200',
    },
    '--card-marquee-market-text': {
        blue: 'darkBlue.400',
        neon: 'darkBlue.400',
        contrast: 'contrastRed.400',
    },
    '--card-marquee-selection-name-bg': {
        blue: 'darkBlue.800',
        neon: 'darkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--card-marquee-selection-name-border': {
        blue: 'grey.600',
        neon: 'darkBlue.600',
        contrast: 'contrastRed.600',
    },

    '--divider-search-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.600',
        contrast: 'contrastRed.600',
    },
    '--dropdown-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },
    '--dropdown-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.400',
    },
    '--dropdown-shadow': {
        blue: 'darkBlue.900',
        neon: 'ioDarkBlue.900',
        contrast: 'contrastRed.900',
    },
    '--dropdown-hover-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.400',
    },
    '--dropdown-language-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },
    '--dropdown-language-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },
    '--dropdown-language-hover-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },
    '--dropdown-mini-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },

    '--dropdown-mini-disabled-bg': {
        blue: 'darkBlue.500',
        neon: 'debugMint.500',
        contrast: 'contrastRed.500',
    },
    '--dropdown-mini-disabled-text': {
        blue: 'darkBlue.500',
        neon: 'debugMint.500',
        contrast: 'contrastRed.500',
    },

    '--dropdown-option-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.900',
        contrast: 'contrastRed.900',
    },
    '--dropdown-option-active-bg': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.400',
    },
    '--dropdown-option-hover-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },

    '--input-DatePicker-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--input-DatePicker-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.600',
    },

    '--input-focused-border': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },

    '--icon-DatePicker-bg-hover': {
        blue: 'darkBlue.300:20%',
        neon: 'ioDarkBlue.300:20%',
        contrast: 'contrastRed.300:20%',
    },
    '--icon-DatePicker-fill': {
        blue: 'darkBlue.400',
        neon: 'darkBlue.400',
        contrast: 'contrastRed.400',
    },

    '--text-highlight-bg': {
        blue: 'lightBlue.400',
        neon: 'ioLightBlue.400',
        contrast: 'contrastRed.400',
    },

    '--input-search-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.600',
    },

    '--link-search-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },

    '--list-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--list-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },
    '--list-active-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },
    '--list-active-border': {
        blue: 'lightBlue.500',
        neon: 'lightBlue.500',
        contrast: 'contrastRed.200',
    },
    '--list-item-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.900',
    },
    '--list-item-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.700',
    },
    '--list-item-hover-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.600',
        contrast: 'contrastRed.700',
    },
    '--list-primary-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.600',
    },
    '--list-primary-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.600',
    },
    '--list-primary-header-bg': {
        blue: 'darkBlue.600',
        neon: 'ioLightBlue.500',
        contrast: 'contrastRed.600',
    },
    '--list-primary-body-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--list-primary-item-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },
    '--list-primary-item-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.600',
    },
    '--list-lhn-border': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--list-lhn-header-bg': {
        blue: 'darkBlue.600',
        neon: 'ioLightBlue.500',
        contrast: 'contrastRed.700',
    },
    '--list-lhn-header-hover-bg': {
        blue: 'darkBlue.500',
        neon: 'ioLightBlue.400',
        contrast: 'contrastRed.600',
    },
    '--list-lhn-item-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--list-lhn-item-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.900',
        contrast: 'contrastRed.900',
    },
    '--list-lhn-item-hover-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },
    '--list-lhn-item-hover-border': {
        blue: 'transparent',
        neon: 'ioDarkBlue.900',
        contrast: 'contrastRed.900',
    },
    '--list-lhn-item-active-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },
    '--list-lhn-item-active-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.900',
        contrast: 'contrastRed.900',
    },
    '--list-lhn-item-highlight-border': {
        blue: 'lightBlue.500',
        neon: 'lightBlue.500',
        contrast: 'contrastRed.500',
    },
    '--list-lhn-item-time': {
        blue: 'grey.300',
        neon: 'ioDarkBlue.200',
        contrast: 'contrastRed.200',
    },

    '--list-selection-item-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.100',
    },

    '--list-az-item-border': {
        blue: 'darkBlue.600',
        neon: 'darkBlue.600',
        contrast: 'contrastRed.600',
    },
    '--list-az-item-hover-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.700',
    },

    '--input-placeholder-color': {
        blue: 'darkBlue.400',
        neon: 'ioDarkBlue.300',
        contrast: 'contrastRed.400',
    },

    '--icon-price-up-border': {
        blue: 'red.500',
        neon: 'red.500',
        contrast: 'contrastRed.500',
    },
    '--icon-price-down-border': {
        blue: 'lightBlue.100',
        neon: 'lightBlue.100',
        contrast: 'contrastRed.100',
    },
    '--box-selection-status-closed-bg': {
        blue: 'darkBlue.400',
        neon: 'debugMint.600',
        contrast: 'contrastRed.400',
    },

    '--box-media-header-bg': {
        blue: 'darkBlue.600',
        neon: 'ioLightBlue.500',
        contrast: 'contrastRed.400',
    },
    '--box-media-header-text': {
        blue: 'white',
        neon: 'white',
        contrast: 'contrastRed.50',
    },

    '--box-speedbet-label-bg': {
        blue: 'white:15%',
        neon: 'white:15%',
        contrast: 'contrastRed.50:15%',
    },
    '--box-speedbet-label-text': {
        blue: 'white:80%',
        neon: 'white:80%',
        contrast: 'contrastRed.50:80%',
    },

    '--dropdown-group-title-text': {
        blue: 'white',
        neon: 'white',
        contrast: 'contrastRed.50',
    },

    '--toggle-default-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--toggle-active-bg': {
        blue: 'yellow.600',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.600',
    },

    '--spinner-primary-color': {
        blue: 'orange.100',
        neon: 'orange.100',
        contrast: 'contrastRed.100',
    },
    '--spinner-secondary-color': {
        blue: 'orange.200',
        neon: 'orange.200',
        contrast: 'contrastRed.200',
    },
    '--spinner-tertiary-color': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },

    '--switch-default-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },
    '--switch-warning-active-bg': {
        blue: 'yellow.500:50%',
        neon: 'yellow.500:50%',
        contrast: 'contrastRed.700:50%',
    },
    '--switch-thumb-warning-bg': {
        blue: 'darkBlue.300',
        neon: 'ioDarkBlue.300',
        contrast: 'contrastRed.300',
    },
    '--switch-thumb-warning-active-bg': {
        blue: 'yellow.300',
        neon: 'yellow.300',
        contrast: 'contrastRed.900',
    },

    '--switch-thumb-primary-bg': {
        blue: 'grey.200',
        neon: 'grey.200',
        contrast: 'contrastRed.200',
    },
    '--switch-primary-active-bg': {
        blue: 'lightBlue.700',
        neon: 'ioLightBlue.300',
        contrast: 'contrastRed.400',
    },
    '--switch-primary-disabled-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },

    '--navlink-text': {
        blue: 'grey.50',
        neon: 'grey.50',
        contrast: 'contrastRed.50',
    },
    '--navlink-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--navlink-active-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.600',
    },

    '--overlay-bg': {
        blue: 'darkBlue.900:92%',
        neon: 'darkBlue.900:90%',
        contrast: 'contrastRed.900:92%',
    },
    '--popper-DatePicker-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },
    '--popper-DatePicker-text': {
        blue: 'white',
        neon: 'white',
        contrast: 'contrastRed.100',
    },

    '--button-outlined-primary-hover-bg': {
        blue: 'orange.A100',
        neon: 'orange.A100',
        contrast: 'contrastRed.400:10%',
    },
    '--button-outlined-primary-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },

    '--button-contained-secondary-hover-bg': {
        blue: 'darkBlue.500',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.400',
    },

    '--icon-arrow-right-color': {
        blue: 'darkBlue.400',
        neon: 'ioDarkBlue.300',
        contrast: 'contrastRed.400',
    },

    '--progressbar-first-bg': {
        blue: 'orange.900',
        neon: 'orange.900',
        contrast: 'contrastRed.900',
    },
    '--progressbar-second-bg': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },
    '--popup-default-bg': {
        blue: 'darkBlue.800',
        neon: 'debugMint.800',
        contrast: 'contrastRed.800',
    },

    '--panel-primary-body-bg': {
        blue: 'darkBlue.800',
        neon: 'debugMint.600',
        contrast: 'contrastRed.800',
    },
    '--panel-secondary-body-bg': {
        blue: 'darkBlue.800:50%',
        neon: 'debugMint.600:50%',
        contrast: 'contrastRed.800:50%',
    },
    '--panel-primary-header-bg': {
        blue: 'darkBlue.500',
        neon: 'debugMint.600',
        contrast: 'contrastRed.500',
    },
    '--panel-secondary-header-bg': {
        blue: 'darkBlue.600',
        neon: 'debugMint.600',
        contrast: 'contrastRed.600',
    },

    '--popup-header-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },

    '--popup-header-text': {
        blue: 'white',
        neon: 'white',
        contrast: 'contrastRed.50',
    },

    '--popup-header-close-color': {
        blue: 'darkBlue.400',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.400',
    },

    '--radio-primary-bg': {
        blue: 'darkBlue.400',
        neon: 'darkBlue.400',
        contrast: 'contrastRed.400',
    },
    '--radio-secondary-bg': {
        blue: 'darkBlue.800',
        neon: 'darkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--radio-border': {
        blue: 'darkBlue.600',
        neon: 'darkBlue.600',
        contrast: 'contrastRed.600',
    },
    '--radio-hover-border': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.500',
    },
    '--radio-active-bg': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },
    '--radio-active-border': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },
    '--radio-active-shadow': {
        blue: 'darkBlue.800',
        neon: 'darkBlue.800',
        contrast: 'contrastRed.800',
    },

    '--modal-search-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },

    '--scrollbar-thumb-color': {
        blue: 'darkBlue.500',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.400',
    },

    '--scrollbar-bg': {
        blue: 'darkBlue.800',
        neon: 'darkBlue.800',
        contrast: 'contrastRed.400',
    },

    '--speedbet-back-button-border': {
        blue: 'grey.50:50%',
        neon: 'grey.50:50%',
        contrast: 'contrastRed.50:50%',
    },
    '--speedbet-back-button-hover': {
        blue: 'grey.50:10%',
        neon: 'grey.50:10%',
        contrast: 'contrastRed.50:10%',
    },
    '--speedbet-back-button-active': {
        blue: 'grey.50:30%',
        neon: 'grey.50:30%',
        contrast: 'contrastRed.50:30%',
    },
    '--speedbet-confirm-button-disabled': {
        blue: 'grey.50:50%',
        neon: 'grey.50:50%',
        contrast: 'contrastRed.50:50%',
    },
    '--speedbet-confirm-button-disabled-bg': {
        blue: 'grey.50:20%',
        neon: 'grey.50:20%',
        contrast: 'contrastRed.50:20%',
    },
    '--speedbet-confirm-button-loading-border': {
        blue: 'lightBlue.500',
        neon: 'lightBlue.500',
        contrast: 'contrastRed.50',
    },
    '--speedbet-confirm-button-loading-bg': {
        blue: 'lightBlue.500:10%',
        neon: 'lightBlue.500:10%',
        contrast: 'contrastRed.50:10%',
    },
    '--speedbet-confirm-button-bg': {
        blue: 'lightBlue.500',
        neon: 'lightBlue.500',
        contrast: 'contrastRed.50',
    },
    '--speedbet-confirm-button-bg-hover': {
        blue: 'lightBlue.300',
        neon: 'lightBlue.300',
        contrast: 'contrastRed.50',
    },
    '--speedbet-confirm-button-bg-active': {
        blue: 'lightBlue.200',
        neon: 'lightBlue.200',
        contrast: 'contrastRed.50',
    },
    '--speedbet-confirm-button-border': {
        blue: 'transparent',
        neon: 'transparent',
        contrast: 'transparent',
    },

    '--swiper-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },

    '--swiper-slide-active-border-bottom': {
        blue: 'lightBlue.500',
        neon: 'lightBlue.500',
        contrast: 'contrastRed.500',
    },

    '--swiper-slide-active-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.500',
    },

    '--table-data-border': {
        blue: 'darkBlue.700:60%',
        neon: 'debugMint.700:60%',
        contrast: 'contrastRed.700:60%',
    },
    '--table-data-secondary-border': {
        blue: 'darkBlue.700',
        neon: 'debugMint.700',
        contrast: 'contrastRed.700',
    },
    '--tabs-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },
    '--tabs-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.600',
    },
    '--tabs-shadow': {
        blue: 'black:20%',
        neon: 'black:20%',
        contrast: 'contrastRed.900:20%',
    },
    '--tabs-active-bg': {
        blue: 'darkBlue.800',
        neon: 'ioLightBlue.500',
        contrast: 'contrastRed.800',
    },
    '--tabs-active-border': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },
    '--tabs-hover-bg': {
        blue: 'darkBlue.800',
        neon: 'ioLightBlue.500',
        contrast: 'contrastRed.800',
    },
    '--tab-primary-bg': {
        blue: 'darkBlue.600',
        neon: 'ioLightBlue.500',
        contrast: 'contrastRed.700',
    },
    '--tabs-secondary-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.900',
    },
    '--tabs-secondary-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.700',
    },
    '--tabs-secondary-active-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },
    '--tabs-tertiary-active-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.700',
    },
    '--tabs-tertiary-hover-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.700',
    },
    '--tabs-default-active-border': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },

    '--tab-betting-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.400',
    },
    '--tab-betting-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },
    '--tab-betting-active-bg': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.400',
    },

    '--text-primary': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.300',
    },
    '--text-secondary': {
        blue: 'grey.400',
        neon: 'darkBlue.300',
        contrast: 'contrastRed.A100',
    },
    '--text-tertiary': {
        blue: 'grey.300',
        neon: 'grey.300',
        contrast: 'contrastRed.300',
    },
    '--text-quaternary': {
        blue: 'grey.400',
        neon: 'grey.50',
        contrast: 'contrastRed.50',
    },
    '--text-info-color': {
        blue: 'white',
        neon: 'white',
        contrast: 'contrastRed.50',
    },
    '--text-muted': {
        blue: 'darkBlue.300',
        neon: 'darkBlue.300',
        contrast: 'contrastRed.300',
    },
    '--text-error': {
        blue: 'red.500',
        neon: 'red.500',
        contrast: 'contrastRed.50',
    },
    '--text-live': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'white',
    },
    '--text-success': {
        blue: 'green.500',
        neon: 'green.500',
        contrast: 'contrastRed.100',
    },
    '--text-contained-success': {
        blue: 'green.500',
        neon: 'green.700',
        contrast: 'contrastRed.700',
    },
    '--icon-generic-color': {
        blue: 'grey.50',
        neon: 'grey.50',
        contrast: 'contrastRed.100',
    },
    '--icon-disabled-color': {
        blue: 'grey.300',
        neon: 'darkBlue.400',
        contrast: 'contrastRed.400',
    },
    '--icon-success-color': {
        blue: 'green.500',
        neon: 'green.500',
        contrast: 'contrastRed.500',
    },
    '--icon-primary-color': {
        blue: 'darkBlue.300',
        neon: 'darkBlue.300',
        contrast: 'contrastRed.300',
    },
    '--icon-secondary-color': {
        blue: 'darkBlue.400',
        neon: 'darkBlue.400',
        contrast: 'contrastRed.400',
    },
    '--icon-tertiary-color': {
        blue: 'lightBlue.200',
        neon: 'debugMint.600',
        contrast: 'contrastRed.200',
    },
    '--icon-warning-fill-color': {
        blue: 'yellow.600',
        neon: 'yellow.600',
        contrast: 'contrastRed.600',
    },
    '--icon-warning-stroke-color': {
        blue: 'yellow.500',
        neon: 'yellow.500',
        contrast: 'contrastRed.500',
    },
    '--icon-arrow-primary-color': {
        blue: 'grey.900',
        neon: 'grey.900',
        contrast: 'contrastRed.900',
    },
    '--icon-chain-link-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.700',
        contrast: 'contrastRed.700',
    },
    '--icon-chain-link-stroke': {
        blue: 'darkBlue.300',
        neon: 'darkBlue.300',
        contrast: 'contrastRed.100',
    },
    '--icon-chain-link-secondary-bg': {
        blue: 'transparent',
        neon: 'transparent',
        contrast: 'contrastRed.50:50%',
    },

    '--text-hover': {
        blue: 'white',
        neon: 'white',
        contrast: 'contrastRed.100',
    },
    '--text-warning-color': {
        blue: 'yellow.300',
        neon: 'yellow.300',
        contrast: 'contrastRed.300',
    },
    '--text-default-color': {
        blue: 'grey.50:85%',
        neon: 'grey.50:85%',
        contrast: 'contrastRed.100:85%',
    },

    '--tab-border': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.100',
    },
    '--tab-bg': {
        blue: 'darkBlue.700',
        neon: 'transparent',
        contrast: 'transparent',
    },
    '--tab-bg-hover': {
        blue: 'darkBlue.800',
        neon: 'ioLightBlue.800',
        contrast: 'contrastRed.600',
    },
    '--tab-bg-active': {
        blue: 'darkBlue.800',
        neon: 'ioLightBlue.800',
        contrast: 'contrastRed.600',
    },
    '--tab-border-active': {
        blue: 'lightBlue.500',
        neon: 'lightBlue.500',
        contrast: 'contrastRed.200',
    },
    '--tabs-inline-active-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--alert-warning-filled-color': {
        blue: 'yellow.300',
        neon: 'yellow.400',
        contrast: 'contrastRed.400',
    },
    '--alert-warning-filled-bg': {
        blue: 'yellow.600',
        neon: 'yellow.600',
        contrast: 'contrastRed.600',
    },

    '--tooltip-default-bg': {
        blue: 'grey.50',
        neon: 'grey.50',
        contrast: 'contrastRed.50',
    },
    '--tooltip-default-text': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.600',
        contrast: 'contrastRed.500',
    },

    '--widget-statistics-border-color': {
        blue: 'darkBlue.700',
        neon: 'darkBlue.600',
        contrast: 'contrastRed.600',
    },
    '--icon-info-color': {
        blue: 'orange.300',
        neon: 'orange.300',
        contrast: 'contrastRed.600',
    },
    '--icon-arrow-color': {
        blue: 'grey.400',
        neon: 'grey.50',
        contrast: 'contrastRed.400',
    },
    '--popover-shadow-color': {
        blue: 'darkBlue.900',
        neon: 'ioDarkBlue.900:70%',
        contrast: 'contrastRed.900',
    },
    '--popover-header-bg': {
        blue: 'darkBlue.700',
        neon: 'ioDarkBlue.500',
        contrast: 'contrastRed.800',
    },
    '--popover-bg': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.50',
    },
    '--popover-text-color': {
        blue: 'grey.50',
        neon: 'white',
        contrast: 'contrastRed.50',
    },
    '--popover-close-button-color': {
        blue: 'grey.50',
        neon: 'darkBlue.400',
        contrast: 'contrastRed.800',
    },
    '--label-primary-text': {
        blue: 'grey.50',
        neon: 'white',
        contrast: 'contrastRed.500',
    },
    '--label-default-text': {
        blue: 'darkBlue.300',
        neon: 'darkBlue.300',
        contrast: 'contrastRed.300',
    },
    '--stake-input-bg-disabled': {
        blue: 'darkBlue.800',
        neon: 'ioDarkBlue.800',
        contrast: 'contrastRed.800',
    },

    '--overlay-secondary-bg': {
        blue: 'black:80%',
        neon: 'black:50%',
        contrast: 'contrastRed.900:20%',
    },
    '--scrollbar-thumb-bg': {
        blue: 'darkBlue.600',
        neon: 'darkBlue.600',
        contrast: 'contrastRed.400',
    },
    '--scrollbar-track-color': {
        blue: 'darkBlue.800',
        neon: 'darkBlue.800',
        contrast: 'contrastRed.800',
    },
    '--list-item-secondary-bg': {
        blue: 'darkBlue.600',
        neon: 'ioDarkBlue.600',
        contrast: 'contrastRed.600',
    },
    '--list-item-secondary-bg-hover': {
        blue: 'darkBlue.500',
        neon: 'ioDarkBlue.400',
        contrast: 'contrastRed.600',
    },
} as const satisfies ColorVariables;

for (const key in variables) {
    const variableKey = key as Variable;

    const value = variables[variableKey];
    blue[variableKey] = toColor(value.blue);
    neon[variableKey] = toColor(value.neon);
    contrast[variableKey] = toColor(value.contrast);
}

export { blue, contrast, neon };
