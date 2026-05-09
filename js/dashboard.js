document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('appeals-table')) return;
    
    renderAppealsTable(MOCK_APPEALS);
    setupFilters();
});

function getRiskBadgeClass(risk) {
    switch(risk) {
        case 'Low': return 'badge-success';
        case 'Medium': return 'badge-warning';
        case 'High': return 'badge-danger';
        case 'Toxic': return 'badge-danger';
        default: return 'badge-neutral';
    }
}

function getConfidenceColor(confidence) {
    if (confidence >= 90) return 'var(--success)';
    if (confidence >= 75) return 'var(--warning)';
    return 'var(--danger)';
}

function renderAppealsTable(appeals) {
    const tbody = document.getElementById('appeals-tbody');
    tbody.innerHTML = '';
    
    appeals.forEach(appeal => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.onclick = () => window.location.href = `appeal-details.html?id=${appeal.id}`;
        
        tr.innerHTML = `
            <td>
                <div class="user-cell">
                    <div class="avatar">${appeal.username.charAt(2).toUpperCase()}</div>
                    <div class="user-cell-info">
                        <span class="user-name-link">${appeal.username}</span>
                        <span class="user-meta">${appeal.accountAge} • ${appeal.karma} karma</span>
                    </div>
                </div>
            </td>
            <td>
                <div class="user-cell-info">
                    <span class="font-medium">${appeal.subreddit}</span>
                    <span class="badge ${getRiskBadgeClass(appeal.riskScore)} mt-1">${appeal.riskScore} Risk</span>
                </div>
            </td>
            <td>
                <div class="user-cell-info">
                    <span class="font-medium">${appeal.aiConfidence}%</span>
                    <div class="score-bar mt-1">
                        <div class="score-fill" style="width: ${appeal.aiConfidence}%; background: ${getConfidenceColor(appeal.aiConfidence)}"></div>
                    </div>
                </div>
            </td>
            <td>
                <span class="badge badge-warning">${appeal.status}</span>
            </td>
            <td>
                <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); window.location.href='appeal-details.html?id=${appeal.id}'">Review</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function setupFilters() {
    const tabs = document.querySelectorAll('.queue-filters .tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            const filter = e.target.getAttribute('data-filter');
            
            if (filter === 'all') {
                renderAppealsTable(MOCK_APPEALS);
            } else {
                let filtered = [];
                if (filter === 'low-risk') filtered = MOCK_APPEALS.filter(a => a.riskScore === 'Low');
                if (filter === 'medium-risk') filtered = MOCK_APPEALS.filter(a => a.riskScore === 'Medium');
                if (filter === 'high-risk') filtered = MOCK_APPEALS.filter(a => a.riskScore === 'High');
                if (filter === 'toxic') filtered = MOCK_APPEALS.filter(a => a.riskScore === 'Toxic');
                
                renderAppealsTable(filtered);
            }
        });
    });
}
