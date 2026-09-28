# Phase 4 — wizard cat

The corrected scroll entrance remains intact. A midnight-blue cat with amber eyes and a plum wizard hat waits on the gatepost (on the gate rail in the portrait composition). The cat fades with the gate as the visitor scrolls through. After the name reveal it appears as a small Garden guide control, available through subsequent sections and project pages.

Six original sprite poses: idle, blink, look left, look right, sleep and alert. Generated cells were inspected, their feet aligned to a common baseline and the atlas exported at 128px per frame. Master art, exact prompt and reproducible export script are preserved. Poses are a compact sprite set, not continuous locomotion animation.

Idle cycles pause off-screen and when the tab is hidden. Hover looks toward the pointer side; keyboard focus and opening the guide show the alert pose. Reduced motion, low quality and Pause effects hold a still pose. A Pause effects control is restored within Preferences. The sprite has fixed bounds and cannot shift surrounding content.

Click/tap opens a named native dialog containing six semantic destinations. Escape and Close restore trigger focus. Choosing a home-page destination closes the dialog, navigates and moves keyboard focus to that section. Project pages use normal home links. Missing sprite art leaves the text guide control functional. There is no chatbot or AI claim; the guide consumes a small allowlisted destination interface that a future assistant can use.

Browser verification: initial garden-only scene, cat scale/placement, guide visibility after reveal, menu opening, Work navigation and target focus, Escape dismissal and focus return, and reduced-motion still poses. Portrait appearance and menu checked in a 390x844 iframe; physical touch hardware and screen-reader audit remain pending. TypeScript, production build and eight-page foundation checks pass.

The lossless six-frame atlas adds 96,720 bytes. Estimated initial HTML/CSS/JS plus art is about 1.09 MB (file-size estimate, not a cold-cache network trace), roughly 9% over the provisional 1 MB target. Initial JavaScript remains about 76 KB gzip. Further asset optimization belongs to the measured performance audit.

Phase 5 remains the full map/navigation pass. Phase 4 supplies only the cat's compact shortcuts.
