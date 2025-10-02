import type { SVGProps } from 'react';

import { SvgIcon } from '@solo-ui/icons/config/SvgIcon.styled';

const FormulaOneIcon = (props: SVGProps<SVGSVGElement>) => (
    <SvgIcon
        xmlns='http://www.w3.org/2000/svg'
        xmlSpace='preserve'
        viewBox='0 0 512 512'
        role='img'
        aria-label='formulaOneIcon'
        data-testid='formulaOneIcon'
        {...props}
    >
        <g fill='#fff'>
            <path d='M359.2 199.8h37.3c5.2 0 9.5-4.2 9.5-9.5V96.7c0-5.2-4.2-9.5-9.5-9.5h-37.3c-5.2 0-9.5 4.2-9.5 9.5v28.1H331v-22.2c0-18.8-15.2-34.1-34.1-34.1H215c-18.8 0-34.1 15.2-34.1 34.1v22.2h-18.8V96.7c0-5.2-4.2-9.5-9.5-9.5h-37.3c-5.2 0-9.5 4.2-9.5 9.5v93.6c0 5.2 4.2 9.5 9.5 9.5h37.3c5.2 0 9.5-4.2 9.5-9.5v-28H181v206.3h-18.8v-28.1c0-5.2-4.2-9.5-9.5-9.5h-37.3c-5.2 0-9.5 4.2-9.5 9.5V434c0 5.2 4.2 9.5 9.5 9.5h37.3c5.2 0 9.5-4.2 9.5-9.5v-28H181v3.4c0 18.8 15.2 34.1 34.1 34.1H297c18.8 0 34.1-15.2 34.1-34.1V406h18.8v28c0 5.2 4.2 9.5 9.5 9.5h37.3c5.2 0 9.5-4.2 9.5-9.5v-93.6c0-5.2-4.2-9.5-9.5-9.5h-37.3c-5.2 0-9.5 4.2-9.5 9.5v28.1H331V162.3h18.8v28c0 5.2 4.2 9.5 9.4 9.5m-65.7 75c0 41.4-16.8 75-37.5 75s-37.5-33.6-37.5-75 16.8-75 37.5-75 37.5 33.5 37.5 75' />
            <circle cx={256} cy={256} r={18.8} />
        </g>
    </SvgIcon>
);

export default FormulaOneIcon;
