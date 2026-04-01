const KEYWORDS = ['int', 'print', 'float', 'string', 'bool', 'if', 'else', 'while', 'for', 'return', 'assert'];
const TYPES = ['int', 'float', 'string', 'bool', 'void'];
const BUILTINS = ['print'];

export const tokenize = (code) => {
    const tokens = [];
    const patterns = [
        { type: 'comment', regex: /\/\/.*$/gm },
        { type: 'string', regex: /"[^"]*"/g },
        { type: 'number', regex: /\b\d+\b/g },
        { type: 'keyword', regex: new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g') },
        { type: 'builtin', regex: new RegExp(`\\b(${BUILTINS.join('|')})\\b`, 'g') },
        { type: 'type', regex: new RegExp(`\\b(${TYPES.join('|')})\\b`, 'g') },
        { type: 'operator', regex: /[+\-*/=<>!&|]+/g },
        { type: 'bracket', regex: /[{}()\[\]]/g },
        { type: 'punctuation', regex: /[;,.:]/g },
        { type: 'identifier', regex: /\b[a-zA-Z_]\w*\b/g },
    ];
    return patterns;
};

export const highlightCode = (code) => {
    if (!code) return '';
    
    let html = escapeHtml(code);
    
    // Apply syntax highlighting via regex replacement
    const rules = [
        { regex: /(\/\/.*$)/gm, cls: 'syn-comment' },
        { regex: /("(?:[^"\\]|\\.)*")/g, cls: 'syn-string' },
        { regex: /\b(\d+)\b/g, cls: 'syn-number' },
        { regex: new RegExp(`\\b(${KEYWORDS.join('|')})\\b`, 'g'), cls: 'syn-keyword' },
        { regex: /([+\-*/=<>!]+)/g, cls: 'syn-operator' },
        { regex: /([{}()])/g, cls: 'syn-bracket' },
        { regex: /([;,])/g, cls: 'syn-punctuation' },
    ];
    
    // Simple non-overlapping highlight
    let segments = [{ text: html, highlighted: false }];
    
    for (const rule of rules) {
        const newSegments = [];
        for (const seg of segments) {
            if (seg.highlighted) {
                newSegments.push(seg);
                continue;
            }
            let lastIndex = 0;
            const matches = [...seg.text.matchAll(new RegExp(rule.regex.source, rule.regex.flags))];
            for (const match of matches) {
                if (match.index > lastIndex) {
                    newSegments.push({ text: seg.text.slice(lastIndex, match.index), highlighted: false });
                }
                newSegments.push({ text: `<span class="${rule.cls}">${match[0]}</span>`, highlighted: true });
                lastIndex = match.index + match[0].length;
            }
            if (lastIndex < seg.text.length) {
                newSegments.push({ text: seg.text.slice(lastIndex), highlighted: false });
            }
        }
        segments = newSegments;
    }
    
    return segments.map(s => s.text).join('');
};

export const highlightMIPS = (code) => {
    if (!code) return '';
    let html = escapeHtml(code);
    
    // MIPS highlights
    html = html.replace(/(#.*$)/gm, '<span class="syn-comment">$1</span>');
    html = html.replace(/\b(li|la|add|sub|mul|div|mflo|syscall|\.data|\.text|\.globl|\.asciiz)\b/g, '<span class="syn-keyword">$1</span>');
    html = html.replace(/(\$[a-z]\d+|\$[a-z]{2,})/g, '<span class="syn-register">$1</span>');
    html = html.replace(/\b(main:)/g, '<span class="syn-label">$1</span>');
    html = html.replace(/("(?:[^"\\]|\\.)*")/g, '<span class="syn-string">$1</span>');
    
    return html;
};

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
