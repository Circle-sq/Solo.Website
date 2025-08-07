interface Props {
    defaultText: string;
}

export const I18n = ({ defaultText }: Props) => {
    if (!defaultText) {
        throw 'No defaultText prop was provided';
    }

    return <>{defaultText}</>;
};
