import os
import subprocess

os.makedirs("public/assets/logos", exist_ok=True)

# ---------------------------------------------------------------------------
# 1. APEX VELOCITY (Supersonic Stencil A)
# ---------------------------------------------------------------------------
c1_svg = '''<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <title>Apex Velocity Logo</title>
  <!-- Left Wing -->
  <path d="M128 24L36 226H84L128 126V24Z" fill="#FFFFFF"/>
  <!-- Right Wing -->
  <path d="M128 24L220 226H172L128 126V24Z" fill="#E2E8F0"/>
  <!-- Precision Floating Crossbar Chevron -->
  <path d="M68 180L128 138L188 180L174 200L128 168L82 200L68 180Z" fill="#FFFFFF"/>
</svg>'''

with open("public/assets/logos/concept-1-apex.svg", "w", encoding="utf-8") as f:
    f.write(c1_svg.strip())

# ---------------------------------------------------------------------------
# 2. ORIGAMI PRISM (3D Folded Architectural Ribbon A)
# ---------------------------------------------------------------------------
c2_svg = '''<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <title>Origami Prism Logo</title>
  <!-- Left Rising Face (Bright Highlight) -->
  <path d="M128 22L48 180L76 230L128 126L156 70L128 22Z" fill="#FFFFFF"/>
  <!-- Right Descending Face (Shaded Dimension) -->
  <path d="M128 22L156 70L180 120L208 230L180 180L128 22Z" fill="#CBD5E1"/>
  <!-- Floating Crossbar Bridge -->
  <path d="M48 180L128 140L208 180L180 230L128 190L76 230L48 180Z" fill="#F1F5F9"/>
  <!-- Subtle Internal Occlusion -->
  <path d="M128 140L128 190L76 230L76 180L128 140Z" fill="#000000" fill-opacity="0.25"/>
</svg>'''

with open("public/assets/logos/concept-2-origami.svg", "w", encoding="utf-8") as f:
    f.write(c2_svg.strip())

# ---------------------------------------------------------------------------
# 3. CYBER DELTA (Pure Stencil Monolith A)
# ---------------------------------------------------------------------------
c3_svg = '''<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <title>Cyber Delta Logo</title>
  <!-- Outer Delta Frame with Negative Space Stencil Arch -->
  <path fill-rule="evenodd" clip-rule="evenodd" d="M128 22L28 226H84L128 132L172 226H228L128 22ZM128 80L102 136H154L128 80Z" fill="#FFFFFF"/>
  <!-- Floating Power Bar with Emerald Accent Cut -->
  <path d="M60 170H196V196H60V170Z" fill="#FFFFFF"/>
  <!-- Subtle Inner Arrow Cutout in Crossbar -->
  <path d="M128 174L140 192H116L128 174Z" fill="#0A0A0A"/>
</svg>'''

with open("public/assets/logos/concept-3-cyber.svg", "w", encoding="utf-8") as f:
    f.write(c3_svg.strip())

# ---------------------------------------------------------------------------
# 4. INFINITY APEX (Continuous Monoline Loop A)
# ---------------------------------------------------------------------------
c4_svg = '''<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
  <title>Infinity Apex Logo</title>
  <!-- Continuous Bold Monoline Ribbon A with Rounded Terminals -->
  <path d="M44 220L117 38C121 28 135 28 139 38L212 220" stroke="#FFFFFF" stroke-width="28" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Flowing Crossbar Loop -->
  <path d="M74 154H182" stroke="#FFFFFF" stroke-width="28" stroke-linecap="round"/>
  <!-- Core Focal Center Glow Dot -->
  <circle cx="128" cy="98" r="8" fill="#39A875"/>
</svg>'''

with open("public/assets/logos/concept-4-infinity.svg", "w", encoding="utf-8") as f:
    f.write(c4_svg.strip())

print("Refined 4 SVG concepts written.")
