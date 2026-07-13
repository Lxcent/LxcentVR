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

  const emailButton = document.querySelector('.email-button');
  const copyBubble = document.getElementById('copy-bubble');

  if (emailButton && copyBubble) {
    emailButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('contact.lxcent@gmail.com');
        copyBubble.textContent = 'Email copied!';
      } catch (error) {
        copyBubble.textContent = 'contact.lxcent@gmail.com';
      }

      copyBubble.classList.add('visible');
      clearTimeout(window.copyBubbleTimer);
      window.copyBubbleTimer = window.setTimeout(() => {
        copyBubble.classList.remove('visible');
      }, 1800);
    });
  }
});
