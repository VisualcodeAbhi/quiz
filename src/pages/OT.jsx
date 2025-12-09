import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const books = [
    { id: 'Genesis', name: 'ఆదికాండము', file: 'Gdata' },
    { id: 'Exodus', name: 'నిర్గమకాండము', file: 'Edata' },
    { id: 'Leviticus', name: 'లేవీయకాండము', file: 'Ldata' },
    { id: 'Numbers', name: 'సంఖ్యాకాండము', file: 'Ndata' },
    { id: 'Deuteronomy', name: 'ద్వితీయోపదేశకాండము', file: 'Ddata' },
    { id: 'Joshua', name: 'యెహోషువ', file: 'Joshdata' },
    { id: 'Judges', name: 'న్యాయాధిపతులు', file: 'Judgdata' },
    { id: 'Ruth', name: 'రూతు', file: 'Ruthdata' },
    { id: '1Samuel', name: '1 సమూయేలు', file: '1Samdata' },
    { id: '2Samuel', name: '2 సమూయేలు', file: '2Samdata' },
    { id: '1Kings', name: '1 రాజులు', file: '1Kingsdata' },
    { id: '2Kings', name: '2 రాజులు', file: '2Kingsdata' },
    { id: '1Chronicles', name: '1 దినవృత్తాంతములు', file: '1Chrdata' },
    { id: '2Chronicles', name: '2 దినవృత్తాంతములు', file: '2Chrdata' },
    { id: 'Ezra', name: 'ఎజ్రా', file: 'Ezradata' },
    { id: 'Nehemiah', name: 'నెహెమ్యా', file: 'Nehdata' },
    // { id: 'Tobit', name: 'తోబితు', file: 'Tobitdata' },
    // { id: 'Judith', name: 'యూదీతు', file: 'Judithdata' },
    { id: 'Esther', name: 'ఎస్తేరు', file: 'Estherdata' },
    // { id: '1Maccabees', name: '1 మక్కబీయులు', file: '1Maccabees' },
    // { id: '2Maccabees', name: '2 మక్కబీయులు', file: '2Maccabeesdata' },
    { id: 'Job', name: 'యోబు', file: 'Jobdata' },
    { id: 'Psalms', name: 'కీర్తనల గ్రంథము', file: 'Psalmsdata' },
    { id: 'Proverbs', name: 'సామెతలు', file: 'Proverbsdata' },
    { id: 'Ecclesiastes', name: 'ప్రసంగి', file: 'Ecclesiastesdata' },
    { id: 'SongofSolomon', name: 'పరమగీతము', file: 'SongofSolomondata' },
    // { id: 'Wisdom', name: 'జ్ఞాన గ్రంథము', file: 'Wisdomdata' },
    // { id: 'Sirach', name: 'సీరా', file: 'Sirachdata' },
    { id: 'Isaiah', name: 'యెషయా', file: 'Isaiahdata' },
    { id: 'Jeremiah', name: 'యిర్మియా', file: 'Jeremiahdata' },
    { id: 'Lamentations', name: 'విలాపవాక్యములు', file: 'Lamentationsdata' },
    // { id: 'Baruch', name: 'బారూకు', file: 'Baruchdata' },
    { id: 'Ezekiel', name: 'యెహెజ్కేలు', file: 'Ezekieldata' },
    { id: 'Daniel', name: 'దానియేలు', file: 'Danieldata' },
    { id: 'Hosea', name: 'హోషేయ', file: 'Hoseadata' },
    { id: 'Joel', name: 'యోవేలు', file: 'Joeldata' },
    { id: 'Amos', name: 'ఆమోసు', file: 'Amosdata' },
    { id: 'Obadiah', name: 'ఓబద్యా', file: 'Obadiahdata' },
    { id: 'Jonah', name: 'యోనా', file: 'Jonahdata' },
    { id: 'Micah', name: 'మీకా', file: 'Micahdata' },
    { id: 'Nahum', name: 'నహూము', file: 'Nahumdata' },
    { id: 'Habakkuk', name: 'హబక్కూకు', file: 'Habakkukdata' },
    { id: 'Zephaniah', name: 'జెఫన్యా', file: 'Zephaniahdata' },
    { id: 'Haggai', name: 'హగ్గయి', file: 'Haggaidata' },
    { id: 'Zechariah', name: 'జెకర్యా', file: 'Zechariahdata' },
    { id: 'Malachi', name: 'మలాకీ', file: 'Malachidata' },
];

const OldTestament = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <header>
                <div className="menu-icon" onClick={() => navigate('/')}>&#8592;</div>
                <h1>పాత నిబంధన</h1>
            </header>
            <div style={{ width: '100%', textAlign: 'center' }}>
                {books.map((book) => (
                    <Link to={`/levels/${book.file}`} key={book.id} className="book-link box">
                        {book.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default OldTestament;
