import map from 'lodash/map';

import type { Notification as Banner } from 'src/appState/redux/types';

import { formatDate, showETA } from '../utils/helpers';

interface Props {
    banners: Banner[];
    earliestToExpire?: number;
    onClose: () => void;
}

const DebugBanners = ({ banners, earliestToExpire, onClose }: Props) => {
    const formatUrl = (d: string): string => d && d.slice(d.indexOf('images/'));

    return (
        <div style={{ color: 'white', backgroundColor: 'red' }}>
            <table style={{ backgroundColor: 'salmonred' }} data-testid='bannersDebugTable'>
                <tbody>
                    <tr>
                        <td>id</td>
                        <td>order</td>
                        <td>start</td>
                        <td>img</td>
                        <td>url</td>
                        <td>expire (days)</td>
                        <td>
                            <button onClick={onClose} style={{ fontSize: '2rem' }}>
                                &times;
                            </button>
                        </td>
                    </tr>
                    {map(banners, ({ id, displayOrder, dateStart, dateStop, background }, index) => (
                        <tr key={id}>
                            <td data-testid={`banner-${index}-index`}>{id}</td>
                            <td data-testid={`banner-${index}-displayOrder`}>{displayOrder}</td>
                            <td data-testid={`banner-${index}-dateStart`}>{formatDate(dateStart)}</td>
                            <td>{background?.url && <img loading='lazy' src={background?.url} width='64' />}</td>
                            <td>{formatUrl(background?.url)}</td>
                            <td colSpan={2}>{showETA(dateStop, earliestToExpire)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DebugBanners;
