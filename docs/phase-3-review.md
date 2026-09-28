# Phase 3 — corrected scroll entrance

Supersedes the earlier click-to-enter implementation. User correction: show only the garden and locked gate at first; scrolling opens it, then Anshul Mehra and portfolio content appear.

The home route begins with a full viewport of garden and the closed gate. A small scroll cue is the only visible text. The name, description, links, site header and navigation do not appear in the first viewport. Scrolling turns the two gate leaves, passes through the entrance, and then reveals the identity. Continuing scroll reaches the navigation and remaining portfolio. Scrolling back reverses the sequence. No Enter or Replay button, timer, or remembered visit skips this sequence.

Native document scrolling drives a sticky scene via requestAnimationFrame only on scroll/resize. No wheel interception or scroll lock. The scene itself contains the reveal, avoiding a jump to another section. Hidden tabs stop frame scheduling; listeners and callbacks are cleaned up.

Reduced motion and low-effects preferences show a still entrance followed by identity in normal flow. Reading mode bypasses the entrance. Missing main/gate art uses readable content immediately. A no-JavaScript stylesheet keeps prerendered content visible. Keyboard users retain the focus-only Skip to content link.

Verified desktop states: scroll 0 has a closed gate, hidden identity and header below the scene; intermediate scroll opens the gate while identity stays hidden; later scroll fully reveals the name with the gate open. Portrait composition checked in a 390 by 844 iframe, not a physical device. Production build and eight-route foundation checks pass. Field performance and physical-device audits remain pending.

The prior Phase 3 desktop image shows the superseded button-driven behavior; phase-3-scroll-entrance.jpg is the corrected first screen.
