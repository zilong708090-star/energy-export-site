# R31 exhibition and people imagery

Accessed and prepared: 2026-10-16. Primary publisher: Sunpal Power Co., Ltd. / Sunpal Solar official website.

These are **third-party supplier-reference images**, not photographs of Shandong Lantian employees, customers, exhibitions, transactions, or projects. Do not imply a partnership with the depicted people or company. Website captions and the image-viewer description should identify the source publisher. The user states that the required image-use authorization has been obtained; no independent licensing audit has been performed.

## Final assets

All three final JPEG files are 1832 × 859 px, wide landscape. The original photographs are 1200 × 563 px. Built-in editing resampled them; this is not additional optical detail.

### Exhibition overview

- Final: `assets/r31-event-exhibition.jpg`
- Official article: https://www.sunpalsolar.com/sunpal-strengthens-southeast-asia-presence-at-solar-storage-live-philippines-2026/
- Direct original: https://www.sunpalsolar.com/wp-content/uploads/2026/05/Sunpal-Team-Exhibition-Booth-Solar-Storage-Live-Philippines.webp
- Article published: 2026-05-28; source identifies Solar & Storage Live Philippines, May 19–20, 2026, Manila, booth 2-L15. These facts belong to Sunpal, not Lantian.
- Selection: a wide view with four Sunpal team members, PV display and booth counter; supports a visual theme of face-to-face industry exchange without fabricated attendance claims.
- Suggested alt: "Four representatives at a solar exhibition booth with a photovoltaic module display; Sunpal supplier-reference photograph."
- Original retained: `/Users/zilongyang/Documents/Codex/2026-09-30/wo/work/r31-event-candidates/exhibition-original.webp`
- Edited PNG retained: `/Users/zilongyang/.codex/generated_images/01a14410-0159-7cc2-915b-bba23b31f1a2/exec-4b0fd79e-ff6a-40f7-90bf-5a989e3a456b.png`

### Public group photograph

- Final: `assets/r31-partner-portrait.jpg`
- Official article: https://www.sunpalsolar.com/building-a-greener-future-together-sunpal-highlights-from-ase-2025/
- Direct original: https://www.sunpalsolar.com/wp-content/uploads/2025/07/Sunpal-Exhibits-Advanced-Energy-Storage-Technologies.webp
- Article published: 2025-07-15; source identifies ASIA Sustainable Energy Week 2025, July 2–4, Bangkok, booth K58. No names or business relationship are independently confirmed.
- Selection: three adults posing at a solar and storage booth. Do not title it "our customers", "signed partnership", or Lantian attendance.
- Suggested alt: "Three people posing at a solar and energy-storage exhibition booth; Sunpal supplier-reference photograph."
- Original retained: `/Users/zilongyang/Documents/Codex/2026-09-30/wo/work/r31-event-candidates/portrait-original.webp`
- Edited PNG retained: `/Users/zilongyang/.codex/generated_images/01a14410-0159-7cc2-915b-bba23b31f1a2/exec-4b48031c-85de-46d6-8983-4378a96e5317.png`

### Technical dialogue

- Final: `assets/r31-business-dialogue.jpg`
- Official article: https://www.sunpalsolar.com/building-a-greener-future-together-sunpal-highlights-from-ase-2025/
- Direct original: https://www.sunpalsolar.com/wp-content/uploads/2025/07/Sunpal-Team-Discussing-Solar-Solutions-with-Visitor.webp
- Same source event/report dates as above; depicts two men reviewing a solar brochure. No relationship with Lantian is asserted.
- Selection: close documentary view of technical communication, contrasting with the wider exhibition and posed group.
- Suggested alt: "Two men reviewing solar-system reference material at a trade-show booth; Sunpal supplier-reference photograph."
- Original retained: `/Users/zilongyang/Documents/Codex/2026-09-30/wo/work/r31-event-candidates/dialogue-original.webp`
- Edited PNG retained: `/Users/zilongyang/.codex/generated_images/01a14410-0159-7cc2-915b-bba23b31f1a2/exec-88255f3b-c8ec-49ca-bf53-107ff674ed03.png`

## Editing mode and exact prompts

Mode: built-in `image_gen`, not CLI/API fallback. Each local original was viewed before editing. Brand overlays and prominent company identifiers were cleaned, without substituting any Lantian identity. Generative editing can cause small texture or detail differences; edited pictures are illustrative third-party references, not unmodified evidence. JPEG conversion only used macOS sips at quality 86.

### Exhibition prompt

```text
Use case: precise-object-edit
Asset type: supplier-reference editorial trade-show photograph for a website
Input image: edit target. This is an actual Sunpal exhibition photo, not Shandong Lantian's event.
Primary request: clean only visible third-party logos, company brand names and overlaid watermarks. Remove the large Sunpal overlay in the upper left, the Sunpal company logos/text on the front counter, tiny shirt chest logos, and company logos on booth walls. Inpaint them naturally using the existing white, blue or green surface and fabric texture. Do not add any replacement brand or text. Keep generic product/technology information where possible.
Invariants: preserve every person's identity, exact face, expression, hair, body, hands, pose, clothing and badges. Preserve the number of people, actual booth structure, photovoltaic module, equipment, floor, furniture, camera perspective, colors and lighting. Do not invent new people, products or events; do not make the booth a Lantian booth. No beautification, no composition change. Keep original wide landscape aspect ratio. No watermark or logos.
```

### Group portrait prompt

```text
Use case: precise-object-edit
Asset type: supplier-reference editorial business group photograph for a website
Input image: edit target. Actual Sunpal public exhibition photo, not a Lantian customer photo.
Primary request: remove only the white Sunpal overlay logo in the upper left, the Sunpal logo on upper-right backdrop, the company website/address line near upper center and any company brand text/logo on the booth or brochures. Fill these small areas with plausible matching existing background texture. Do not replace them with a different brand or add any text.
Invariants: preserve all three people exactly including faces, identity, hair, expressions, bodies, gestures, hands, clothing and lanyards/badges. Preserve the solar/hybrid diagrams, battery cabinet pictures, generic technical labels, booth shape, perspective, actual lighting, color and composition. Do not invent a new scene or event. Do not add Lantian branding. No watermark or logos. Preserve wide landscape aspect ratio.
```

### Dialogue prompt

```text
Use case: precise-object-edit
Asset type: supplier-reference editorial technical discussion photograph for a website
Input image: edit target. Actual Sunpal exhibition photo, not a Lantian customer interaction.
Primary request: clean only the large white Sunpal overlay watermark in the upper-left corner and visible third-party company brand logos/text on the background counter/posters and the men's lanyards. Reconstruct matching existing surfaces/fabric for those small areas. Keep generic technical content, brochure page imagery and layout. Do not replace the logo with a different brand or add text.
Invariants: preserve both foreground men's exact identity, faces, glasses, hair, expressions, clothing, bodies, hands, posture and interaction. Preserve all background people, furniture, brochure, solar photos, bottles, background exhibition setting, framing, colors and lighting. No beautification or changes to actual context. No Lantian branding. No watermark or logos. Preserve original wide landscape aspect ratio.
```

## Inspection

Originals and all three edited PNGs were visually inspected. Foreground people, their counts/poses and the real booth context remain recognizable; no Lantian label, invented handshake, transaction or testimonial was introduced. Prominent Sunpal overlays, chest/counter and backdrop company branding were removed. Normal participant badges, generic technical illustrations and some small incidental product packaging details remain; no attempt was made to fabricate a brand-new event.

Unselected candidates are retained outside the publish repo in `work/r31-event-candidates/`, including a Europe collage and the source Philippine original.

