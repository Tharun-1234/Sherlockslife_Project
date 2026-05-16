// Common validation functions

function setWarning(message, container) {
    let warn = container.querySelector('.step-warning');
    if (!warn) {
        warn = document.createElement('p');
        warn.className = 'step-warning';
        container.appendChild(warn);
    }
    warn.textContent = message;
    warn.style.display = 'block';
}

function clearWarning(container) {
    const warn = container.querySelector('.step-warning');
    if (warn) warn.style.display = 'none';
}

// Step 1 validation (Target Details)
function validateStep1() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="url"]');
    const [targetName, maskedId, targetUrl] = inputs;

    const missing = [];
    if (!targetName || !String(targetName.value || '').trim()) missing.push('Target Name');
    if (!maskedId || !String(maskedId.value || '').trim()) missing.push('Target ID');
    if (!targetUrl || !String(targetUrl.value || '').trim()) missing.push('Instagram URL');

    if (missing.length) {
        setWarning('Please fill all details compulsorily. Missing: ' + missing.join(', ') + '.', document.querySelector('.form-box'));
        return false;
    }

    clearWarning(document.querySelector('.form-box'));
    return true;
}

// Step 2 validation (Personal Information)
function validateStep2() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    const [maskedPersonalId, yourName, yourEmail] = inputs;

    const missing = [];
    if (!maskedPersonalId || !String(maskedPersonalId.value || '').trim()) missing.push('Personal ID');
    if (!yourName || !String(yourName.value || '').trim()) missing.push('Your Name');
    if (!yourEmail || !String(yourEmail.value || '').trim()) missing.push('Email');

    if (missing.length) {
        setWarning('Please fill all details compulsorily. Missing: ' + missing.join(', ') + '.', document.querySelector('.form-box'));
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(yourEmail.value)) {
        setWarning('Please enter a valid email address.', document.querySelector('.form-box'));
        return false;
    }

    // Phone number validation (assuming Indian mobile number: 10 digits starting with 6-9)
    const phoneValue = maskedPersonalId.value.replace(/\D/g, ''); // Remove non-digits
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneValue)) {
        setWarning('Please enter a valid 10-digit phone number starting with 6-9.', document.querySelector('.form-box'));
        return false;
    }

    clearWarning(document.querySelector('.form-box'));
    return true;
}

// Upload functionality for subsidy.html
function initUpload() {
    const upload = document.getElementById('id-upload');
    const warning = document.getElementById('upload-warning');
    const uploadPreview = document.getElementById('upload-preview');
    const previewImage = document.getElementById('preview-image');
    const previewName = document.getElementById('preview-name');
    const previewRemove = document.getElementById('preview-remove');

    if (!upload) return;

    function showPreview(file) {
        if (!file || !file.type.startsWith('image/')) {
            uploadPreview.classList.add('is-hidden');
            return;
        }
        previewImage.src = URL.createObjectURL(file);
        previewName.textContent = file.name;
        uploadPreview.classList.remove('is-hidden');
    }

    function clearPreview() {
        uploadPreview.classList.add('is-hidden');
        previewImage.src = '';
        previewName.textContent = '';
        upload.value = '';
    }

    upload.addEventListener('change', () => {
        warning.classList.add('is-hidden');
        const file = upload.files[0];
        if (!file) {
            clearPreview();
            return;
        }
        if (!file.type.startsWith('image/')) {
            warning.textContent = 'Please choose a valid image file.';
            warning.classList.remove('is-hidden');
            clearPreview();
            return;
        }
        showPreview(file);
    });

    if (previewRemove) {
        previewRemove.addEventListener('click', () => {
            clearPreview();
        });
    }
}

// Combination logic for subsidy.html
function initCombinationLogic() {
    const configPathSelect = document.getElementById('config-path');
    const quotaSelect = document.getElementById('quota');
    const subcategorySelect = document.getElementById('subcategory');
    const relationSelect = document.getElementById('relation');
    const stateSelect = document.getElementById('state');
    const uploadRow = document.querySelector('.file-row');
    const uploadSection = document.getElementById('upload-section');
    const uploadLabel = uploadRow ? uploadRow.previousElementSibling : null;
    const uploadWarning = document.getElementById('upload-warning');
    const uploadPreview = document.getElementById('upload-preview');
    const eligibilityMessage = document.getElementById('eligibility-message');
    const configInfo = document.getElementById('config-info');
    const configInfoText = document.getElementById('config-info-text');

    if (!quotaSelect || !subcategorySelect || !relationSelect || !stateSelect) return;

    // Pre-defined exceptional combinations that SKIP ID requirement
    const predefinedExceptionalCombinations = [
        { quota: 'Politician', subcategory: 'MLA', relation: 'Spouse', skipID: true },
        { quota: 'Politician', subcategory: 'MLA', relation: 'Friends', skipID: true },
        { quota: 'Bureaucrat', subcategory: 'IPS', relation: 'Spouse', skipID: true },
        { quota: 'Bureaucrat', subcategory: 'IPS', relation: 'Friends', skipID: true },
        { quota: 'Bureaucrat', subcategory: 'IAS', relation: 'Spouse', skipID: true },
        { quota: 'Politician', subcategory: 'IAS', relation: 'Spouse', skipID: true },
    ];



    function getAllExceptionalCombinations() {
        return predefinedExceptionalCombinations;
    }

    function isSkipIDCombination(quota, subcategory, relation, state) {
        return getAllExceptionalCombinations().some(combo =>
            combo.quota === quota &&
            combo.subcategory === subcategory &&
            combo.relation === relation &&
            combo.skipID === true
        );
    }

    function checkCombination() {
        const selectedConfigPath = configPathSelect.value;
        const selectedQuota = quotaSelect.value;
        const selectedSubcategory = subcategorySelect.value;
        const selectedRelation = relationSelect.value;
        const selectedState = stateSelect.value;

        if (!selectedConfigPath) {
            if (uploadSection) uploadSection.classList.add('is-hidden');
            if (uploadLabel) uploadLabel.classList.add('is-hidden');
            uploadRow.classList.add('is-hidden');
            uploadPreview.classList.add('is-hidden');
            eligibilityMessage.classList.add('is-hidden');
            
            // Clear any previously uploaded file
            const uploadInput = document.getElementById('id-upload');
            if (uploadInput) {
                uploadInput.value = '';
                const previewImage = document.getElementById('preview-image');
                const previewName = document.getElementById('preview-name');
                if (previewImage) previewImage.src = '';
                if (previewName) previewName.textContent = '';
            }
            
            return;
        }

        if (selectedConfigPath === 'standard') {
            // Standard Configuration - ALWAYS requires ID
            if (uploadSection) uploadSection.classList.remove('is-hidden');
            if (uploadLabel) uploadLabel.classList.remove('is-hidden');
            uploadRow.classList.remove('is-hidden');
            eligibilityMessage.classList.add('is-hidden');
            configInfoText.textContent = '⚠️ Standard Configuration: ID proof is REQUIRED for verification.';
            configInfo.classList.remove('is-hidden');
            console.log('Standard configuration: ID proof required');
        } else if (selectedConfigPath === 'exceptional') {
            // Exceptional Combinations - Check if this combination skips ID
            if (!selectedQuota || !selectedSubcategory || !selectedRelation) {
                if (uploadLabel) uploadLabel.classList.remove('is-hidden');
                uploadRow.classList.remove('is-hidden');
                eligibilityMessage.classList.add('is-hidden');
                configInfo.classList.add('is-hidden');
                return;
            }

            const shouldSkipID = isSkipIDCombination(selectedQuota, selectedSubcategory, selectedRelation, selectedState);

            if (shouldSkipID) {
                // This combination SKIPS ID requirement
                if (uploadSection) uploadSection.classList.add('is-hidden');
                if (uploadLabel) uploadLabel.classList.add('is-hidden');
                uploadRow.classList.add('is-hidden');
                uploadWarning.classList.add('is-hidden');
                uploadPreview.classList.add('is-hidden');

                // Clear preview content so the uploaded section remains fully hidden.
                const previewImage = document.getElementById('preview-image');
                const previewName = document.getElementById('preview-name');
                if (previewImage) previewImage.src = '';
                if (previewName) previewName.textContent = '';

                eligibilityMessage.textContent = `✅ Exceptional Path: ${selectedQuota} → ${selectedSubcategory} → ${selectedRelation} is eligible for DIRECT VERIFICATION. No ID proof needed!`;
                eligibilityMessage.classList.remove('is-hidden');
                configInfoText.textContent = '✅ This exceptional combination bypasses ID verification requirement.';
                configInfo.classList.remove('is-hidden');
                console.log('Exceptional combination - ID SKIPPED:', selectedQuota, selectedSubcategory, selectedRelation);
            } else {
                // Even in exceptional path, if combination not in exception list, ID is required
                if (uploadSection) uploadSection.classList.remove('is-hidden');
                if (uploadLabel) uploadLabel.classList.remove('is-hidden');
                uploadRow.classList.remove('is-hidden');
                eligibilityMessage.textContent = '⚠️ This combination is NOT in the exceptional list. ID proof is REQUIRED.';
                eligibilityMessage.classList.remove('is-hidden');
                configInfoText.textContent = '⚠️ This combination requires ID verification. Check available exceptional combinations.';
                configInfo.classList.remove('is-hidden');
                console.log('Exceptional path selected but combination requires ID:', selectedQuota, selectedSubcategory, selectedRelation);
            }
        }
    }

    // Event listeners
    if (configPathSelect) {
        configPathSelect.addEventListener('change', checkCombination);
    }
    quotaSelect.addEventListener('change', checkCombination);
    subcategorySelect.addEventListener('change', checkCombination);
    relationSelect.addEventListener('change', checkCombination);
    stateSelect.addEventListener('change', checkCombination);

    // Initial check
    checkCombination();


}

function validateUpload() {
    const upload = document.getElementById('id-upload');
    const warning = document.getElementById('upload-warning');
    const uploadRow = document.querySelector('.file-row');
    const configPath = document.getElementById('config-path').value;

    // If upload row is hidden, ID is not required for this combination
    if (uploadRow.classList.contains('is-hidden')) return true;

    // If configuration path is not selected, require ID
    if (!configPath) {
        warning.textContent = 'Please select a configuration path first.';
        warning.classList.remove('is-hidden');
        return false;
    }

    // If upload row is visible, ID is required
    const file = upload.files[0];
    if (!file) {
        warning.textContent = 'Upload ID is required for this configuration. Please choose an image file.';
        warning.classList.remove('is-hidden');
        return false;
    }
    if (!file.type.startsWith('image/')) {
        warning.textContent = 'Please choose a valid image file.';
        warning.classList.remove('is-hidden');
        return false;
    }
    warning.classList.add('is-hidden');
    return true;
}

// Initialize functions based on page
document.addEventListener('DOMContentLoaded', () => {
    initUpload();
    initCombinationLogic();
});