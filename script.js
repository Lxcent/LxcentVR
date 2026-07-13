const root = document.documentElement;
let pointerFrame = null;

const updatePointer = (event) => {
  if (pointerFrame) {
    cancelAnimationFrame(pointerFrame);
  }

  pointerFrame = requestAnimationFrame(() => {
    const x = event.clientX;
    const y = event.clientY;
    const dx = x / window.innerWidth - 0.5;
    const dy = y / window.innerHeight - 0.5;
    const distance = Math.min(1, Math.sqrt(dx * dx + dy * dy) * 1.8);
    const brightness = (1 - distance) * 0.7 + 0.3;

    root.style.setProperty('--pointer-x', `${x}px`);
    root.style.setProperty('--pointer-y', `${y}px`);
    root.style.setProperty('--star-brightness', brightness.toFixed(3));
  });
};

document.addEventListener('pointermove', updatePointer);
document.addEventListener('pointerdown', updatePointer);
window.addEventListener('pointerleave', () => root.style.setProperty('--star-brightness', '0.3'));
window.addEventListener('resize', () => {
  root.style.setProperty('--pointer-x', '50vw');
  root.style.setProperty('--pointer-y', '50vh');
  root.style.setProperty('--star-brightness', '0.35');
});

const syncPackageDetails = (dropdown) => {
  const selected = dropdown.value;
  const container = dropdown.closest('.pricing-panel');

  if (!container) {
    return;
  }

  container.querySelectorAll('.package-details').forEach((detail) => {
    const shouldShow = detail.dataset.package === selected;
    detail.style.display = shouldShow ? 'block' : 'none';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.package-dropdown').forEach((dropdown) => {
    syncPackageDetails(dropdown);
    dropdown.addEventListener('change', () => syncPackageDetails(dropdown));
  });

  document.querySelectorAll('.email-button').forEach((button) => {
    const emailAddress = button.dataset.email || 'contact.lxcent@gmail.com';
    const parent = button.parentElement;
    let copyBubble = parent?.querySelector('.copy-bubble');

    if (!copyBubble) {
      copyBubble = document.createElement('span');
      copyBubble.className = 'copy-bubble';
      parent?.appendChild(copyBubble);
    }

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        button.innerHTML = '✓ Copied';
        copyBubble.textContent = 'Email copied!';
      } catch (error) {
        button.innerHTML = '✉️ Email';
        copyBubble.textContent = emailAddress;
      }

      copyBubble.classList.add('visible');
      clearTimeout(button.copyBubbleTimer);
      button.copyBubbleTimer = window.setTimeout(() => {
        copyBubble.classList.remove('visible');
        button.innerHTML = '✉️ Email';
      }, 1800);
    });
  });
});
