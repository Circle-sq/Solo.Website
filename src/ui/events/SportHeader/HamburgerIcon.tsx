interface PropsType {
    color?: string;
}

const HamburgerIcon = ({ color = '#D6D6D6' }: PropsType) => (
    <svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='none'>
        <path
            d='M2.75 4.6875H17.75M2.75 10.3125H17.75M2.75 15.9375H17.75'
            stroke={color}
            strokeWidth='2.67'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>
);

export default HamburgerIcon;
