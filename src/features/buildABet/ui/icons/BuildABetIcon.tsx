import { BAB_ICON_SIZES } from 'src/utils/constants';

interface Props {
    className?: string;
    width?: string | number;
    height?: string | number;
}

const { height: defaultHeight, width: defaultWidth } = BAB_ICON_SIZES.sm;

const BuildABetIcon = ({ className, width = defaultWidth, height = defaultHeight }: Props) => (
    <svg
        data-testid='buildABetIcon'
        className={className}
        width={width}
        height={height}
        viewBox='0 0 30 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='m16.383 1.355-.652 2.014a.6.6 0 0 1-.571.413h-4.831a.606.606 0 0 1-.222-.042l-.633 1.957a.599.599 0 0 1-.551.412l-.284.873h3.015c.407 0 .696.39.572.773l-.651 2.014a.6.6 0 0 1-.572.413H7.601l-1.038 3.2h5.213c.406 0 .695.39.572.773l-.315.972h12a2.805 2.805 0 0 0 .747-.233c.232-.11.451-.238.652-.384l.015-.01.013-.01c1-.764 1.205-1.011 1.761-2.202l.755-2.371.016-.05a1.098 1.098 0 0 0 .021-.344 1.1 1.1 0 0 0-.089-.335 1.72 1.72 0 0 0-.397-.586 2.57 2.57 0 0 0-1.551-.617c.253 0 .505-.04.744-.076l.147-.023a5.163 5.163 0 0 0 .788-.16 3.037 3.037 0 0 0 .905-.425l.006-.005c.256-.191.44-.44.532-.719v-.002l.768-3.091a1.646 1.646 0 0 0 .108-.932 1.751 1.751 0 0 0-.43-.859l-.006-.006a2.625 2.625 0 0 0-.88-.425c-.327-.089-.88-.098-.88-.098l-11.366.005a.586.586 0 0 1-.03.186zm4.603 8.135c.008-.027-.016-.053-.048-.053h-5.639c-.022 0-.042.012-.048.03l-.692 2.13a.047.047 0 0 1-.034.029l-1.028.34c-.055.014-.044.084.014.084h4.85a3.264 3.264 0 0 0 .85-.083c.252-.063.486-.168.688-.31l.009-.007.006-.005c.344-.268.59-.613.71-.995l.362-1.16zm.858-2.589.003-.002.568-1.786a.383.383 0 0 0-.043-.369.421.421 0 0 0-.156-.109.492.492 0 0 0-.18-.036h-5.148c-.022 0-.041.013-.047.032l-.713 2.217c-.009.027.015.053.048.053h5.668z'
            fill='url(#a5w0r5pxfa)'
        />
        <g filter='url(#le23qb2q1b)'>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='m15.13 2.788.652-2.015A.594.594 0 0 0 15.21 0h-4.098a.6.6 0 0 0-.571.412L9.89 2.427a.594.594 0 0 0 .571.773h4.098a.6.6 0 0 0 .572-.412zM4.716 13.26l.652-2.014a.594.594 0 0 0-.572-.773h-3.44a.6.6 0 0 0-.562.386l-.756 2.015a.594.594 0 0 0 .563.799h3.544a.6.6 0 0 0 .571-.413zm7.03.313-.65 2.015a.6.6 0 0 1-.572.412H5.358a.594.594 0 0 1-.563-.798l.756-2.015a.6.6 0 0 1 .562-.387h5.062c.407 0 .695.39.572.773zm-1.028-4.385.651-2.015a.594.594 0 0 0-.572-.773H6.656a.6.6 0 0 0-.572.412l-.65 2.015a.594.594 0 0 0 .57.773h4.142a.6.6 0 0 0 .572-.412zM9.268 3.1l-.65 2.015a.6.6 0 0 1-.572.412h-4.23a.594.594 0 0 1-.571-.772l.65-2.015a.6.6 0 0 1 .572-.413h4.23c.406 0 .695.39.572.773z'
                fill='#F7A138'
            />
        </g>
        <defs>
            <radialGradient
                id='a5w0r5pxfa'
                cx='0'
                cy='0'
                r='1'
                gradientUnits='userSpaceOnUse'
                gradientTransform='rotate(-143.249 14.852 2.132) scale(18.1121 27.0111)'
            >
                <stop stopColor='#FFB545' />
                <stop offset='1' stopColor='#D74D00' />
            </radialGradient>
            <filter
                id='le23qb2q1b'
                x='0'
                y='0'
                width='18.811'
                height='19'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'
            >
                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                <feColorMatrix in='SourceAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha' />
                <feOffset dx='2' dy='2' />
                <feGaussianBlur stdDeviation='.5' />
                <feComposite in2='hardAlpha' operator='out' />
                <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
                <feBlend in2='BackgroundImageFix' result='effect1_dropShadow_1010_14301' />
                <feBlend in='SourceGraphic' in2='effect1_dropShadow_1010_14301' result='shape' />
            </filter>
        </defs>
    </svg>
);

export default BuildABetIcon;
