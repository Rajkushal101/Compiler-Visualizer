import React from 'react';

const DocumentationPanel = ({ markdownContent }) => {
    const renderMarkdown = (md) => {
        if (!md) return '';
        let html = md;
        // Headers
        html = html.replace(/^### (.+)$/gm, '<h4 class="doc-h4">$1</h4>');
        html = html.replace(/^## (.+)$/gm, '<h3 class="doc-h3">$1</h3>');
        html = html.replace(/^# (.+)$/gm, '<h2 class="doc-h2">$1</h2>');
        // Code blocks
        html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="doc-code doc-code-$1"><code>$2</code></pre>');
        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code class="doc-inline-code">$1</code>');
        // Bold
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Lists
        html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul class="doc-list">$&</ul>');
        // Horizontal rules
        html = html.replace(/^---$/gm, '<hr class="doc-hr"/>');
        // Tables
        html = html.replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g, (match, header, body) => {
            const headers = header.split('|').filter(h => h.trim()).map(h => `<th>${h.trim()}</th>`).join('');
            const rows = body.trim().split('\n').map(row => {
                const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
                return `<tr>${cells}</tr>`;
            }).join('');
            return `<table class="styled-table doc-table"><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
        });
        // Paragraphs
        html = html.replace(/\n\n/g, '</p><p>');
        // Italics
        html = html.replace(/_(.+?)_/g, '<em>$1</em>');
        return html;
    };

    return (
        <div className="panel documentation-panel">
            <h3 className="panel-title">📚 Self-Generated Documentation</h3>
            <p className="panel-description">Auto-generated compilation report from AST, symbol table, and optimization passes.</p>
            
            {markdownContent ? (
                <div className="doc-rendered glass-card" 
                     dangerouslySetInnerHTML={{ __html: renderMarkdown(markdownContent) }} />
            ) : (
                <p className="empty-state">No documentation generated. Enable the documentation flag to generate.</p>
            )}
        </div>
    );
};

export default DocumentationPanel;