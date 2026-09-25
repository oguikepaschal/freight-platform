/**
 * Extends an element's tap area 6px above and below without changing its
 * layout, so a 32px `sm` button reaches 44px on touch (40px `md` reaches
 * 52px). The visible control keeps its size; only the invisible ::after
 * box grows. Horizontal extent is untouched, so neighbouring buttons in a
 * row never overlap hit areas.
 *
 * Kept out of Button.tsx on purpose: portal and admin import
 * `buttonClassName`, and this is an apps/web adjustment.
 */
export const touchTarget = "relative after:absolute after:inset-x-0 after:-inset-y-1.5 after:content-['']";
