const FastTimeIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            className={className}
            fill='#fff'
            xmlns='http://www.w3.org/2000/svg'
            width={32}
            height={24}
            viewBox='0 0 32 24'
        >
            <path d='M24 1H18V3H24V1ZM20 14H22V8H20V14ZM28.03 7.39L29.45 5.97C29.02 5.46 28.55 4.98 28.04 4.56L26.62 5.98C25.07 4.74 23.12 4 21 4C16.03 4 12 8.03 12 13C12 17.97 16.02 22 21 22C25.98 22 30 17.97 30 13C30 10.88 29.26 8.93 28.03 7.39ZM21 20C17.13 20 14 16.87 14 13C14 9.13 17.13 6 21 6C24.87 6 28 9.13 28 13C28 16.87 24.87 20 21 20Z' />
            <rect x='2' y='6' width='9' height='2' rx='1' fill='#fff' />
            <rect y='12' width='9' height='2' rx='1' fill='#fff' />
            <rect x='2' y='18' width='9' height='2' rx='1' fill='#fff' />
        </svg>
    );
};

export default FastTimeIcon;
