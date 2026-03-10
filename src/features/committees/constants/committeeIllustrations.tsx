/**
 * Committee illustration paths.
 * SVG files from undraw.co stored in public/illustrations/
 */

const ILLUSTRATIONS: Record<string, string> = {
    'electronics': '/illustrations/undraw_circuit-board_g7dc.svg',
    'embedded-systems': '/illustrations/undraw_firmware_3fxd.svg',
    'ai': '/illustrations/undraw_artificial-intelligence_43qa.svg',
    'cybersecurity': '/illustrations/undraw_security-on_3ykb.svg',
    'power': '/illustrations/undraw_wind-turbine_4z2a.svg',
    'robotics': '/illustrations/undraw_robotics_0czc.svg',
    'marketing': '/illustrations/undraw_content-creator_vuqg.svg',
    'multimedia': '/illustrations/undraw_video-files_cxl9.svg',
    'podcast': '/illustrations/undraw_podcast-listener_dpel.svg',
    'magazine': '/illustrations/undraw_reading-a-book_4cap.svg',
    'web-development': '/illustrations/undraw_web-development_f0tp.svg',
    'flutter': '/illustrations/undraw_mobile-development_tjxm.svg',
    'hr': '/illustrations/undraw_team-spirit_18vw.svg',
    'pr': '/illustrations/undraw_business-deal_nx2n.svg',
    'event-coordination': '/illustrations/undraw_booking_8vl5.svg',
};

/**
 * Get the illustration path for a committee by its slug.
 */
export function getCommitteeIllustration(slug: string): string {
    return ILLUSTRATIONS[slug] || '/illustrations/undraw_team-spirit_18vw.svg';
}
