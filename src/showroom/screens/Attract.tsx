import { TvLoop } from "../tv/TvLoop";

/**
 * Idle screen for the touch kiosk: the same watchable story loop as the
 * marketing TVs, with a "Touch the screen to explore" prompt. Any touch or key
 * opens the interactive showroom.
 */
export function Attract({ onStart }: { onStart: () => void }) {
  return <TvLoop onStart={onStart} />;
}
