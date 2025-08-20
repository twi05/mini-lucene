
export function stem(word: string): string {
    if (word.length < 3) return word;

    const endings: { [key: string]: string } = {
        'ies': 'i', 'sses': 'ss', 's': '', 'ing': '', 'ed': '', 'ly': '',
        'ational': 'ate', 'tional': 'tion', 'enci': 'ence', 'anci': 'ance',
        'izer': 'ize', 'bli': 'ble', 'alli': 'al', 'entli': 'ent', 'eli': 'e',
        'ousli': 'ous', 'ization': 'ize', 'ation': 'ate', 'ator': 'ate',
    };

    for (const ending in endings) {
        if (word.endsWith(ending)) {
            return word.slice(0, -ending.length) + endings[ending];
        }
    }
    return word;
}