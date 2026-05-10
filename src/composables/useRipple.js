export function useRipple() {
  function createRipple(e) {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const ripple = document.createElement('span')
    const size = Math.max(rect.width, rect.height) * 2
    ripple.style.cssText = `
      position:absolute;
      width:${size}px;
      height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      background:radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
      border-radius:50%;
      transform:scale(0);
      animation:ripple-effect 0.6s ease-out forwards;
      pointer-events:none;
    `
    el.style.position = el.style.position || 'relative'
    el.style.overflow = 'hidden'
    el.appendChild(ripple)
    setTimeout(() => ripple.remove(), 700)
  }

  return { createRipple }
}
