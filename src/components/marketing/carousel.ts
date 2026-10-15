/**
 * Card rows that become a swipeable snap carousel on mobile and a grid from md up.
 * Keeps long card lists from turning the mobile page into an endless scroll.
 */
export const MOBILE_CAROUSEL =
  "flex md:grid gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 pt-6 pb-4 md:pb-0"

export const MOBILE_CAROUSEL_ITEM = "shrink-0 w-[82%] sm:w-[55%] md:w-auto snap-center"
