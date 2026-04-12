# Design System Specification: Technical Simulation & Tactile Precision

## 1. Overview & Creative North Star: "The Analog Digitalist"

This design system moves beyond the kitsch of early soft UI to establish a **Creative North Star** we call **The Analog Digitalist**. The goal is to transform a technical simulator into a high-end, tactile experience that feels like interacting with a multi-million dollar piece of physical laboratory equipment.

We reject the "flatness" of the modern web. Instead, we embrace a **hyper-physicality** through intentional asymmetry, varying depths, and a sophisticated monochromatic palette. By leveraging dual-source light physics and editorial typography, we create an interface that feels carved from a single block of material—minimizing cognitive load while maximizing the "soul" of the digital tool.

---

## 2. Colors: Tonal Architecture

Our palette is a study in monochromatic nuance. We do not use color to decorate; we use it to indicate state and simulate light.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts or the neumorphic "extrusion." For instance, a control panel section (using `surface-container-low`) should sit on the main `background` (#f9f9f9), separated only by its dual-shadow "lift."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers.
*   **Base:** `surface` (#f9f9f9) - The primary "tabletop."
*   **Recessed (Inset):** `surface-container` (#eceeef) - Used for input wells or inactive track areas.
*   **Elevated (Extruded):** `surface-container-lowest` (#ffffff) - Used for primary interactive knobs and buttons to catch the most "light."

### The "Glass & Gradient" Rule
To prevent the interface from feeling "muddy," use **Glassmorphism** for floating overlays or HUD elements. Apply `surface-container-lowest` at 60% opacity with a `backdrop-blur` of 20px. 
*   **Signature Texture:** Main CTAs or active simulator states should use a linear gradient from `tertiary` (#005bc2) to `tertiary-container` (#007aff) at a 135-degree angle to provide a jewel-like finish against the matte gray.

---

## 3. Typography: Editorial Precision

The typography system pairs the technical rigor of **Inter** with the architectural character of **Space Grotesk**.

*   **Display & Headlines (Space Grotesk):** These should be used with intentional asymmetry. Align `display-lg` (3.5rem) to the far left of a layout with significant tracking (-0.02em) to create an authoritative, editorial feel.
*   **Body & Labels (Inter):** High-readability sans-serif for data-heavy simulation readouts.
*   **Hierarchy as Brand:** Use `label-sm` (all caps, +0.05em tracking) in `on-surface-variant` (#5a6061) for technical metadata. This creates a "blueprint" aesthetic that feels precise and sophisticated.

---

## 4. Elevation & Depth: The Physics of Light

Neumorphism fails when shadows are "dirty." We use a clean, dual-light source model: **Top-Left (Highlight)** and **Bottom-Right (Shadow).**

### The Layering Principle (Tonal Stacking)
Avoid drop shadows for hierarchy. Instead, "stack" tiers. Place a `surface-container-highest` card within a `surface-container-low` tray. The change in luminance provides the separation; the shadows provide the "tactility."

### Neumorphic Shadows (The 1:2 Ratio)
For an object on the `surface` (#f9f9f9):
*   **Light Shadow (Top-Left):** `x: -8px, y: -8px, blur: 16px, color: #ffffff (100%)`
*   **Dark Shadow (Bottom-Right):** `x: 8px, y: 8px, blur: 16px, color: #d4dbdd (70%)`

### The "Ghost Border" Fallback
If accessibility requires a container edge, use the `outline-variant` (#adb3b4) at **15% opacity**. This "Ghost Border" provides a hint of structure without breaking the illusion of a continuous, molded surface. Forbid 100% opaque borders.

---

## 5. Components: Tactile Primitives

### Buttons (The "Tactile Switch")
*   **Primary:** Highly rounded (`rounded-full`). Surface color `primary-container`. Use the dual shadow to create a 3D "extruded" effect. On `active`, switch to `inset` shadows to simulate the button being physically pressed.
*   **Tertiary:** No background. Use `label-md` typography. On hover, the background subtly shifts to `surface-container-low` with a soft inset shadow.

### Input Fields (The "Machine Well")
*   **Styling:** Inputs must be "Inset" (concave). Use dual inner shadows to make the field look carved into the surface. 
*   **Radius:** `rounded-md` (1.5rem) to maintain the soft-UI language.

### Cards & Lists (The "Floating Platter")
*   **Constraint:** Forbid divider lines.
*   **Separation:** Separate list items using 16px of vertical white space. For distinct cards, use the `surface-container-lowest` color with a soft ambient shadow (4% opacity `on-surface` tint).

### Additional: The "Status Orb"
For technical simulators, use a 12px circular "Orb" component. 
*   **Inactive:** `primary-dim` with a subtle inset shadow.
*   **Active:** `tertiary` (#005bc2) with an outer glow (blur: 10px) using the `tertiary_container` color to simulate an LED.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use extreme roundedness (`rounded-xl` or `full`) for interactive elements to mimic ergonomic physical design.
*   **Do** use asymmetrical layouts—place a large display header in a corner and surround it with "breathing room" (64px+ padding).
*   **Do** use `tertiary` accents sparingly. One glowing LED or one blue toggle is more powerful than a screen full of color.

### Don’t:
*   **Don’t** use pure black (#000000) for shadows. It breaks the neumorphic illusion. Always use a tinted neutral like `surface-dim`.
*   **Don’t** use 1px dividers. Use white space or a change in the `surface-container` tier.
*   **Don’t** crowd the interface. Tactile UI requires "finger room"—increase hit targets and gutter widths beyond standard web patterns.