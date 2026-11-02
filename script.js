const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggle-btn');
const strengthBar = document.getElementById('strength-bar');
const strengthLabel = document.getElementById('strength-label').querySelector('span');

// Rule Elements
const rules = {
  length: document.getElementById('rule-length'),
  upper: document.getElementById('rule-upper'),
  lower: document.getElementById('rule-lower'),
  number: document.getElementById('rule-number'),
  special: document.getElementById('rule-special')
};

// Toggle password visibility
toggleBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  toggleBtn.textContent = isPassword ? 'Hide' : 'Show';
});

// Real-time strength check
passwordInput.addEventListener('input', () => {
  const val = passwordInput.value;

  // Validation criteria (Regex)
  const checks = {
    length: val.length >= 8,
    upper: /[A-Z]/.test(val),
    lower: /[a-z]/.test(val),
    number: /[0-9]/.test(val),
    special: /[^A-Za-z0-9]/.test(val)
  };

  // Update checklist items
  let passedCount = 0;
  for (const [key, passed] of Object.entries(checks)) {
    if (passed) {
      rules[key].classList.add('valid');
      rules[key].textContent = rules[key].textContent.replace('❌', '✅');
      passedCount++;
    } else {
      rules[key].classList.remove('valid');
      rules[key].textContent = rules[key].textContent.replace('✅', '❌');
    }
  }

  // Calculate Strength Bar Percentage & Status
  if (val.length === 0) {
    strengthBar.style.width = '0%';
    strengthBar.style.backgroundColor = 'transparent';
    strengthLabel.textContent = 'Empty';
    strengthLabel.style.color = 'inherit';
  } else if (passedCount <= 2) {
    strengthBar.style.width = '33%';
    strengthBar.style.backgroundColor = 'var(--red)';
    strengthLabel.textContent = 'Weak 🔴';
    strengthLabel.style.color = 'var(--red)';
  } else if (passedCount <= 4) {
    strengthBar.style.width = '66%';
    strengthBar.style.backgroundColor = 'var(--yellow)';
    strengthLabel.textContent = 'Medium 🟡';
    strengthLabel.style.color = 'var(--yellow)';
  } else {
    strengthBar.style.width = '100%';
    strengthBar.style.backgroundColor = 'var(--green)';
    strengthLabel.textContent = 'Strong 🟢';
    strengthLabel.style.color = 'var(--green)';
  }
});
