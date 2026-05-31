// TV Remote / D-pad Spatial Navigation Hook
// Enables arrow-key navigation between all interactive elements on the page

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  'details > summary',
].join(', ');

function getRect(el: Element) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2, rect: r };
}

function findNearest(
  current: Element,
  all: Element[],
  dir: 'up' | 'down' | 'left' | 'right'
): Element | null {
  const { x: cx, y: cy } = getRect(current);
  let best: Element | null = null;
  let bestScore = Infinity;

  for (const el of all) {
    if (el === current) continue;
    const { x: ex, y: ey } = getRect(el);
    const dx = ex - cx;
    const dy = ey - cy;

    let primary = 0;
    let secondary = 0;
    let valid = false;

    switch (dir) {
      case 'right': valid = dx > 8;  primary = dx;  secondary = Math.abs(dy); break;
      case 'left':  valid = dx < -8; primary = -dx; secondary = Math.abs(dy); break;
      case 'down':  valid = dy > 8;  primary = dy;  secondary = Math.abs(dx); break;
      case 'up':    valid = dy < -8; primary = -dy; secondary = Math.abs(dx); break;
    }

    if (!valid) continue;

    // Score: primary direction distance + penalty for cross-axis offset
    const score = primary + secondary * 0.4;
    if (score < bestScore) {
      bestScore = score;
      best = el;
    }
  }
  return best;
}

export function useTVNav() {
  if (typeof window === 'undefined') return;

  const handleKeyDown = (e: KeyboardEvent) => {
    const dirMap: Record<string, 'up' | 'down' | 'left' | 'right'> = {
      ArrowUp: 'up', ArrowDown: 'down',
      ArrowLeft: 'left', ArrowRight: 'right',
    };

    const dir = dirMap[e.key];
    if (!dir) return;

    // Only intercept arrow keys when not typing in an input
    const tag = (document.activeElement as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    e.preventDefault();

    const all = Array.from(document.querySelectorAll<Element>(FOCUSABLE))
      .filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0; // only visible elements
      });

    const current = document.activeElement;

    if (!current || !document.body.contains(current) || !all.includes(current)) {
      // No current focus — focus first visible element
      (all[0] as HTMLElement)?.focus();
      return;
    }

    const next = findNearest(current, all, dir);
    if (next) {
      (next as HTMLElement).focus();
      next.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  // Auto-focus first element after a short delay
  setTimeout(() => {
    const all = Array.from(document.querySelectorAll<Element>(FOCUSABLE));
    if (all.length > 0 && !document.activeElement?.matches(FOCUSABLE)) {
      (all[0] as HTMLElement)?.focus();
    }
  }, 500);

  return () => window.removeEventListener('keydown', handleKeyDown);
}
