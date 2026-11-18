'use client';

import React from 'react';

export function HandsIllustration() {
  return (
    <div
      style={{
        width: '100%',
        margin: '0 auto',
        padding: '40px 0 64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: 0.85,
        boxSizing: 'border-box',
      }}
    >
      <svg
        viewBox="0 0 1200 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', maxHeight: 220, display: 'block' }}
      >
        {/* Left Hand Reaching Right (Adam - Creation of Adam) */}
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-dim)' }}>
          {/* Forearm extending from left screen edge */}
          <path d="M0 135 C140 122 220 115 320 118 C370 120 410 115 450 110" />
          <path d="M0 178 C130 170 210 162 310 164 C360 166 400 160 440 150" strokeDasharray="3 2" />

          {/* Wrist and Palm */}
          <path d="M450 110 C480 105 505 102 525 105 C540 107 555 112 565 118" />
          <path d="M440 150 C470 155 500 152 522 148 C542 145 558 138 568 132" />

          {/* Index Finger Extended */}
          <path d="M565 118 C580 116 600 116 618 118 C627 119 633 121 638 123" />
          <path d="M638 123 C638 126 634 128 628 128 C612 128 594 126 575 125" />

          {/* Middle Finger Bent */}
          <path d="M560 125 C572 127 588 130 600 135 C604 137 602 140 596 140 C583 140 570 136 558 133" strokeDasharray="4 2" />

          {/* Ring Finger */}
          <path d="M550 133 C562 136 578 141 588 146 C591 148 589 151 584 151 C573 150 562 145 550 140" strokeDasharray="3 3" />

          {/* Pinky */}
          <path d="M540 140 C550 144 564 150 574 155 C577 157 575 159 571 159 C562 158 552 152 540 146" />

          {/* Thumb */}
          <path d="M515 115 C520 105 530 98 542 95 C552 93 558 97 554 104 C548 112 538 118 530 122" />

          {/* Stipple Engraving Shading Dots */}
          <circle cx="280" cy="130" r="0.9" fill="currentColor" />
          <circle cx="320" cy="132" r="0.9" fill="currentColor" />
          <circle cx="360" cy="128" r="0.9" fill="currentColor" />
          <circle cx="400" cy="130" r="0.9" fill="currentColor" />
          <circle cx="440" cy="126" r="0.9" fill="currentColor" />
          <circle cx="480" cy="122" r="0.9" fill="currentColor" />
          <circle cx="510" cy="124" r="0.9" fill="currentColor" />
          <circle cx="530" cy="128" r="0.9" fill="currentColor" />
          <circle cx="550" cy="120" r="0.9" fill="currentColor" />
          <circle cx="580" cy="120" r="0.9" fill="currentColor" />
          <circle cx="605" cy="121" r="0.9" fill="currentColor" />
        </g>

        {/* Right Hand Reaching Left (God - Creation of Adam) */}
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-dim)' }}>
          {/* Forearm and Wrist extending to right screen edge */}
          <path d="M1200 80 C1060 86 980 92 880 100 C830 104 790 110 750 116" />
          <path d="M1200 122 C1070 128 990 135 890 142 C840 146 800 150 760 154" strokeDasharray="3 2" />

          {/* Palm */}
          <path d="M750 116 C720 120 698 123 678 123 C663 123 650 121 643 119" />
          <path d="M760 154 C730 156 700 151 678 143 C663 137 653 129 646 123" />

          {/* Index Finger Pointing Downward/Left */}
          <path d="M678 123 C668 123 658 123 648 124 C642 124 638 125 633 126" />
          <path d="M633 126 C633 123 637 121 643 120 C653 118 666 117 680 117" />

          {/* Middle Finger */}
          <path d="M684 129 C671 130 657 133 647 137 C644 138 646 140 651 140 C664 138 677 134 689 131" strokeDasharray="4 2" />

          {/* Ring Finger */}
          <path d="M691 136 C679 139 665 143 655 147 C652 148 654 150 659 150 C671 147 683 142 695 138" strokeDasharray="3 3" />

          {/* Pinky */}
          <path d="M699 143 C687 147 673 151 664 155 C662 156 663 158 667 158 C677 155 689 149 701 145" />

          {/* Thumb */}
          <path d="M720 119 C715 111 706 105 694 103 C685 102 680 106 684 113 C690 120 700 125 710 128" />

          {/* Stipple Shading Dots */}
          <circle cx="920" cy="115" r="0.9" fill="currentColor" />
          <circle cx="880" cy="118" r="0.9" fill="currentColor" />
          <circle cx="840" cy="124" r="0.9" fill="currentColor" />
          <circle cx="800" cy="130" r="0.9" fill="currentColor" />
          <circle cx="760" cy="132" r="0.9" fill="currentColor" />
          <circle cx="730" cy="130" r="0.9" fill="currentColor" />
          <circle cx="700" cy="134" r="0.9" fill="currentColor" />
          <circle cx="680" cy="128" r="0.9" fill="currentColor" />
          <circle cx="660" cy="126" r="0.9" fill="currentColor" />
          <circle cx="645" cy="123" r="0.9" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
}
