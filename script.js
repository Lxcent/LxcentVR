const root = document.documentElement;

const updatePointer = (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  const dx = x / 100 - 0.5;
  const dy = y / 100 - 0.5;
  const distance = Math.min(1, Math.sqrt(dx * dx + dy * dy) * 1.8);
  const brightness = (1 - distance) * 0.7 + 0.3;

  root.style.setProperty('--pointer-x', `${x}%`);
  root.style.setProperty('--pointer-y', `${y}%`);
  root.style.setProperty('--star-brightness', brightness.toFixed(3));
};

document.addEventListener('pointermove', updatePointer);
document.addEventListener('pointerdown', updatePointer);
window.addEventListener('pointerleave', () => root.style.setProperty('--star-brightness', '0.3'));
window.addEventListener('resize', () => {
  const x = root.style.getPropertyValue('--pointer-x') || '50%';
  const y = root.style.getPropertyValue('--pointer-y') || '50%';
  root.style.setProperty('--pointer-x', x);
  root.style.setProperty('--pointer-y', y);
});
