# Storage category audit R25

Reviewed 2026-10-15. Scope: storage data classification only; no UI, generator, image, source specification or publication changes.

## Active records

- 3 `battery-cabinet` records: `storage-air-215kwh`, `storage-liquid-215kwh`, `storage-liquid-261kwh`.
- 1 `battery-container` record: `storage-container-3700kwh`.
- 8 `battery-module` records: `storage-wall-5kwh`, `storage-rack-25v-100`, `storage-rack-25v-200`, `storage-rack-5kwh`, `storage-rack-51v-200`, `storage-hv-stacked-20kwh`, `storage-hv-stacked-30kwh`, `storage-hv-stacked-40kwh`.

The active source has 12 records. `equipmentType` is an explicit routing discriminator: only the first three belong on a strict commercial storage-cabinet landing. Battery modules and the DC battery container require clearly separate routes; they must not be presented as equivalent cabinet products. Root integration owns those routes and related-product filtering.

## Retired all-in-one references

Removed active records `storage-all-in-one-5kwh` and `storage-all-in-one-10kwh`. Their supplier describes BP51100/BP51200 as residential battery-plus-inverter all-in-one systems, and the shared wall-format image visually resembles an inverter. These records do not belong in the strict cabinet directory, irrespective of the supplier's use of the broad energy-storage label.

No current record was proven to be a standalone inverter-only device. This does not justify keeping the residential all-in-one systems in the cabinet directory. Genuine wall/rack/HV batteries are also not complete commercial storage cabinets and are assigned `battery-module` instead.

The two complete retired objects are preserved unchanged outside the published repo at `/Users/zilongyang/Documents/Codex/2026-09-30/wo/work/catalog-r25-retired-all-in-one.json` as a JSON array. They are not moved into the standalone-inverter category. Root integration will replace old public all-in-one product URLs with non-product redirects.

Every retained ID, technical parameter, source, image, caption and other existing field is unchanged. Only the explicit `equipmentType` field was added to retained objects.
