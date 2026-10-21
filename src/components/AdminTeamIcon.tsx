import React from 'react';

interface AdminTeamIconProps {
  className?: string;
}

/**
 * Exact recreation of the uploaded team.png (3-person team avatar with center manager in red shirt & tie)
 */
export const AdminTeamIcon: React.FC<AdminTeamIconProps> = ({
  className = 'w-5 h-5',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="none"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* LEFT PERSON (Female Staff) */}
      {/* Hair Back */}
      <path
        d="M14 316C18 232 42 196 86 196C130 196 154 232 158 316H14Z"
        fill="#5D4442"
      />
      {/* Neck */}
      <rect x="64" y="302" width="44" height="50" fill="#DFAA78" />
      {/* Shirt */}
      <path
        d="M0 442V382C0 356 26 340 58 340H114C146 340 172 356 172 382V442H0Z"
        fill="#D5DFEE"
      />
      {/* Face */}
      <circle cx="86" cy="268" r="52" fill="#F2C18D" />
      {/* Hair Front */}
      <path
        d="M34 268C34 228 58 202 90 202C122 202 140 226 140 264C118 258 100 246 82 242C64 238 48 254 34 268Z"
        fill="#5D4442"
      />

      {/* RIGHT PERSON (Male Staff) */}
      {/* Neck */}
      <rect x="404" y="302" width="44" height="50" fill="#DFAA78" />
      {/* Shirt */}
      <path
        d="M340 442V382C340 356 366 340 398 340H454C486 340 512 356 512 382V442H340Z"
        fill="#D5DFEE"
      />
      {/* Tie */}
      <polygon points="420,348 432,348 436,442 416,442" fill="#A6B4CA" />
      {/* Face */}
      <circle cx="426" cy="268" r="52" fill="#F2C18D" />
      {/* Hair */}
      <path
        d="M372 254C370 212 396 194 440 194H468C480 194 486 204 484 222C482 240 478 256 476 264C466 244 444 236 416 236C392 236 380 244 372 254Z"
        fill="#5D4442"
      />

      {/* CENTER PERSON (Admin / Manager in Red/Crimson Shirt & Tie) */}
      {/* Neck */}
      <rect x="206" y="264" width="100" height="76" fill="#DFAA78" />
      {/* Shoulders / Red Shirt */}
      <path
        d="M116 442V392C116 356 154 334 202 326H310C358 334 396 356 396 392V442H116Z"
        fill="#F43F5E"
      />
      {/* Shirt Shading */}
      <path
        d="M116 442V392C116 372 130 354 156 342L166 442H116Z"
        fill="#D73353"
      />
      <path
        d="M396 442V392C396 372 382 354 356 342L346 442H396Z"
        fill="#D73353"
      />
      {/* Collar */}
      <polygon points="200,312 256,350 222,372 188,334" fill="#CE2D4F" />
      <polygon points="312,312 256,350 290,372 324,334" fill="#CE2D4F" />
      {/* Tie */}
      <polygon points="242,344 270,344 266,370 246,370" fill="#596579" />
      <polygon points="246,370 266,370 274,442 238,442" fill="#68758C" />
      {/* Center Head / Face */}
      <path
        d="M172 178C172 122 208 92 256 92C304 92 340 122 340 178V208C340 258 304 294 256 294C208 294 172 258 172 208V178Z"
        fill="#F2C18D"
      />
      {/* Center Face Shading */}
      <path
        d="M236 94C200 102 172 132 172 178V208C172 252 200 286 240 292C216 274 204 244 204 204V164C204 130 218 106 236 94Z"
        fill="#E5B17E"
      />
      {/* Center Hair */}
      <path
        d="M166 192C162 120 194 70 264 70H328C342 70 348 80 346 106C344 134 342 168 338 192C330 162 308 142 266 142H214C194 142 186 154 184 174L166 192Z"
        fill="#5D4442"
      />
    </svg>
  );
};
