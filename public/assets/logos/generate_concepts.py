import math
import os
import subprocess

# Ensure directory
os.makedirs("public/assets/logos", exist_ok=True)

# ---------------------------------------------------------------------------
# CONCEPT 1: APEX STEALTH (Geometric Stencil & Upward Chevron)
# Monogram A with upward arrow negative-space counter and laser-cut crossbar
# ---------------------------------------------------------------------------
concept_1_svg = '''<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Concept 1: Apex Stealth - Razor-sharp geometric A with upward momentum -->
  <!-- Left Wing -->
  <path d="M128 26L36 226H82L128 126V26Z" fill="#FFFFFF"/>
  <!-- Right Wing (Subtle architectural facet tone: pure white with crisp contrast) -->
  <path d="M128 26L220 226H174L128 126V26Z" fill="#F0F4F8"/>
  <!-- Floating Precision Crossbar (Upward Chevron) -->
  <path d="M72 176L128 136L184 176L170 196L128 166L86 196L72 176Z" fill="#FFFFFF"/>
</svg>'''

with open("public/assets/logos/concept-1-stealth.svg", "w", encoding="utf-8") as f:
    f.write(concept_1_svg.strip())


# ---------------------------------------------------------------------------
# CONCEPT 2: ORIGAMI PRISM (3D Isometric Folded Ribbon A)
# Multi-faceted isometric ribbon creating a deep dimensional illusion
# ---------------------------------------------------------------------------
concept_2_svg = '''<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Concept 2: Origami Prism - 3D Folded isometric ribbon A -->
  <!-- Left Climbing Pillar -->
  <path d="M128 24L52 176L76 224L128 120L152 72L128 24Z" fill="#FFFFFF"/>
  <!-- Right Descending Pillar -->
  <path d="M128 24L152 72L180 128L204 224L180 176L128 24Z" fill="#CBD5E1"/>
  <!-- Front Horizontal Bridge / Fold -->
  <path d="M52 176L128 136L204 176L180 224L128 184L76 224L52 176Z" fill="#F8FAFC"/>
  <!-- Inner Shadow Facet for optical depth -->
  <path d="M128 136L128 184L76 224L76 176L128 136Z" fill="#94A3B8" opacity="0.4"/>
</svg>'''

with open("public/assets/logos/concept-2-origami.svg", "w", encoding="utf-8") as f:
    f.write(concept_2_svg.strip())


# ---------------------------------------------------------------------------
# CONCEPT 3: CYBER DELTA (Minimalist High-Tech Monogram)
# Pure Swiss-style bold geometry: Delta frame with floating dynamic crossbar
# ---------------------------------------------------------------------------
concept_3_svg = '''<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Concept 3: Cyber Delta - Minimalist, bold, ultra-iconic monolithic A -->
  <g fill-rule="evenodd" clip-rule="evenodd">
    <!-- Main Stencil Body with angled precision cuts -->
    <path d="M128 24C123.582 24 119.534 26.438 117.466 30.342L33.466 188.342C31.282 192.456 31.428 197.432 33.848 201.408C36.268 205.384 40.612 208 45.312 208H85.312L128 128L170.688 208H210.688C215.388 208 219.732 205.384 222.152 201.408C224.572 197.432 224.718 192.456 222.534 188.342L138.534 30.342C136.466 26.438 132.418 24 128 24ZM128 76L158 132H98L128 76Z" fill="#FFFFFF"/>
    <!-- Floating Cyber Crossbar Accent (Emerald Glow / Tech Accent) -->
    <rect x="68" y="160" width="120" height="20" rx="4" fill="#FFFFFF"/>
  </g>
</svg>'''

with open("public/assets/logos/concept-3-cyber.svg", "w", encoding="utf-8") as f:
    f.write(concept_3_svg.strip())

print("3 SVG concepts created successfully.")
