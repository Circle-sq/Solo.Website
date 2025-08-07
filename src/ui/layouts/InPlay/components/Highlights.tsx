import { I18n } from 'src/ui/common/Language/I18n';
import EventsList from 'src/ui/events/EventsList';

import { S_Message, S_SportPanel } from '../styled';

const Highlights = ({ sportsCollection }: { sportsCollection: string[] }) => {
    const getCollectionId = (sport: string): string => `in-play-highlights-${sport}`;

    const getQueryParams = (sport: string): Record<string, unknown> => ({
        sport,
        perPage: 5,
    });

    if (!sportsCollection.length) {
        return (
            <S_Message>
                <I18n
                    langKey='livebetting.highlights.empty'
                    defaultText='Currently there are no live events, please check back later!'
                />
            </S_Message>
        );
    }

    return (
        <>
            {sportsCollection.map((sport) => (
                <S_SportPanel key={sport}>
                    <EventsList
                        key={sport}
                        collectionId={getCollectionId(sport)}
                        query={getQueryParams(sport)}
                        allowLoadMore={false}
                        showHeader={true}
                        triggerReloadEvents={function () {
                            throw new Error('Function not implemented.');
                        }}
                        testId={sport}
                    />
                </S_SportPanel>
            ))}
        </>
    );
};

export default Highlights;
