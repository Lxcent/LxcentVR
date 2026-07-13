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

document.querySelectorAll('.package-dropdown').forEach((dropdown) => {
  dropdown.addEventListener('change', (event) => {
    const selected = event.target.value;
    const container = event.target.closest('.pricing-panel');

    container.querySelectorAll('.package-details').forEach((detail) => {
      const shouldShow = detail.dataset.package === selected;
      detail.removeAttribute('hidden');
      detail.style.display = shouldShow ? 'block' : 'none';
    });
  });
});
