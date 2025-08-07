export default function parse(competition) {
    if (competition.id) {
        competition.id = +competition.id;
    }

    return competition;
}
