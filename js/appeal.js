document.addEventListener('DOMContentLoaded', () => {
    const btnApprove = document.getElementById('btn-approve');
    const btnReject = document.getElementById('btn-reject');
    
    if (btnApprove) {
        btnApprove.addEventListener('click', () => {
            btnApprove.innerHTML = '<div class="loading-spinner" style="width: 16px; height: 16px; border-width: 2px;"></div>';
            setTimeout(() => {
                ToastManager.show('Appeal Approved', 'User has been unbanned successfully.');
                btnApprove.innerHTML = 'Approved';
                btnApprove.disabled = true;
                if(btnReject) btnReject.style.display = 'none';
            }, 1000);
        });
    }
    
    if (btnReject) {
        btnReject.addEventListener('click', () => {
            btnReject.innerHTML = '<div class="loading-spinner" style="width: 16px; height: 16px; border-width: 2px;"></div>';
            setTimeout(() => {
                ToastManager.show('Appeal Rejected', 'User ban maintained.', 'error');
                btnReject.innerHTML = 'Rejected';
                btnReject.disabled = true;
                if(btnApprove) btnApprove.style.display = 'none';
            }, 1000);
        });
    }
});
