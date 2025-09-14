// App.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/* ------------------ Assets (files must exist in ./assets) ------------------ */
const IMAGES: Record<string, any> = {
  "beige-trouser.jpg": require("./assets/beige-trouser.jpg"),
  "black-crop-top.jpg": require("./assets/black-crop-top.jpg"),
  "black-jeans.jpg": require("./assets/black-jeans.jpg"),
  "brown-bag.jpg": require("./assets/brown-bag.jpg"),
  "brown-sandals.jpg": require("./assets/brown-sandals.jpg"),
  "brown-trousers.jpg": require("./assets/brown-trousers.jpg"),
  "casual-brown-tshirt.jpg": require("./assets/casual-brown-tshirt.jpg"),
  "denim-crop-top.jpg": require("./assets/denim-crop-top.jpg"),
  "denim-shorts.jpg": require("./assets/denim-shorts.jpg"),
  "earrings.jpg": require("./assets/earrings.jpg"),
  "gold-earrings.jpg": require("./assets/gold-earrings.jpg"),
  "green-dress.jpg": require("./assets/green-dress.jpg"),
  "grey-tshirt.jpg": require("./assets/grey-tshirt.jpg"),
  "knit-top.jpg": require("./assets/knit-top.jpg"),
  "lemon-dress.jpg": require("./assets/lemon-dress.jpg"),
  "light-brown-flats.jpg": require("./assets/light-brown-flats.jpg"),
  "navy-blue-jeans.jpg": require("./assets/navy-blue-jeans.jpg"),
  "printed-blouse.jpg": require("./assets/printed-blouse.jpg"),
  "red-earrings.jpg": require("./assets/red-earrings.jpg"),
  "round-bag.jpg": require("./assets/round-bag.jpg"),
  "sky-tee.jpg": require("./assets/sky-tee.jpg"),
  "small-bag.jpg": require("./assets/small-bag.jpg"),
  "striped-shirt.jpg": require("./assets/striped-shirt.jpg"),
  "sunglasses.jpg": require("./assets/sunglasses.jpg"),
  "tote-bag.jpg": require("./assets/tote-bag.jpg"),
  "wide-leg-trousers.jpg": require("./assets/wide-leg-trousers.jpg"),
};

const ALL_KEYS = Object.keys(IMAGES);

/* ------------------ Role mapping ------------------ */
const ROLE_MAP: Record<string, "top" | "bottom" | "accessory"> = {
  "striped-shirt.jpg": "top",
  "black-crop-top.jpg": "top",
  "denim-crop-top.jpg": "top",
  "printed-blouse.jpg": "top",
  "grey-tshirt.jpg": "top",
  "casual-brown-tshirt.jpg": "top",
  "sky-tee.jpg": "top",
  "knit-top.jpg": "top",

  "wide-leg-trousers.jpg": "bottom",
  "brown-trousers.jpg": "bottom",
  "black-jeans.jpg": "bottom",
  "navy-blue-jeans.jpg": "bottom",
  "denim-shorts.jpg": "bottom",
  "beige-trouser.jpg": "bottom",

  "tote-bag.jpg": "accessory",
  "round-bag.jpg": "accessory",
  "small-bag.jpg": "accessory",
  "brown-bag.jpg": "accessory",
  "light-brown-flats.jpg": "accessory",
  "brown-sandals.jpg": "accessory",
  "sunglasses.jpg": "accessory",
  "gold-earrings.jpg": "accessory",
  "red-earrings.jpg": "accessory",
  "earrings.jpg": "accessory",
};

/* ------------------ Tag map ------------------ */
const TAG_MAP: Record<string, string[]> = {
  Work: [
    "striped-shirt.jpg",
    "wide-leg-trousers.jpg",
    "tote-bag.jpg",
    "black-jeans.jpg",
    "round-bag.jpg",
    "beige-trouser.jpg",
  ],
  Leisure: [
    "casual-brown-tshirt.jpg",
    "denim-shorts.jpg",
    "sunglasses.jpg",
    "light-brown-flats.jpg",
    "navy-blue-jeans.jpg",
    "sky-tee.jpg",
  ],
  "Date Night": [
    "green-dress.jpg",
    "lemon-dress.jpg",
    "gold-earrings.jpg",
    "red-earrings.jpg",
    "brown-sandals.jpg",
    "printed-blouse.jpg",
  ],
};

const TAG_CHIPS = [
  { key: "Work", label: "💼 Work" },
  { key: "Leisure", label: "🏖️ Leisure" },
  { key: "Date Night", label: "💖 Date Night" },
];

/* ------------------ Metadata for items (style / mood / color) ------------------
   Use this to power the Style / Mood / Color filters. Add or tweak values as needed.
*/
const ITEM_META: Record<
  string,
  { style: string; mood: string; color: string }
> = {
  "striped-shirt.jpg": { style: "Classic", mood: "Smart", color: "Blue" },
  "black-crop-top.jpg": { style: "Casual", mood: "Edgy", color: "Black" },
  "denim-crop-top.jpg": { style: "Casual", mood: "Fun", color: "Blue" },
  "printed-blouse.jpg": { style: "Boho", mood: "Playful", color: "Multi" },
  "grey-tshirt.jpg": { style: "Basic", mood: "Relaxed", color: "Grey" },
  "casual-brown-tshirt.jpg": { style: "Basic", mood: "Relaxed", color: "Brown" },
  "sky-tee.jpg": { style: "Basic", mood: "Bright", color: "Sky" },
  "knit-top.jpg": { style: "Cozy", mood: "Warm", color: "Beige" },

  "wide-leg-trousers.jpg": { style: "Work", mood: "Polished", color: "Brown" },
  "brown-trousers.jpg": { style: "Work", mood: "Polished", color: "Brown" },
  "black-jeans.jpg": { style: "Casual", mood: "Edgy", color: "Black" },
  "navy-blue-jeans.jpg": { style: "Casual", mood: "Classic", color: "Blue" },
  "denim-shorts.jpg": { style: "Leisure", mood: "Playful", color: "Blue" },
  "beige-trouser.jpg": { style: "Work", mood: "Polished", color: "Beige" },

  "tote-bag.jpg": { style: "Classic", mood: "Practical", color: "Brown" },
  "round-bag.jpg": { style: "Trendy", mood: "Fun", color: "Brown" },
  "small-bag.jpg": { style: "Chic", mood: "Elegant", color: "Brown" },
  "brown-bag.jpg": { style: "Classic", mood: "Warm", color: "Brown" },
  "light-brown-flats.jpg": { style: "Classic", mood: "Comfort", color: "Brown" },
  "brown-sandals.jpg": { style: "Leisure", mood: "Relaxed", color: "Brown" },
  "sunglasses.jpg": { style: "Beach", mood: "Sunny", color: "Black" },
  "gold-earrings.jpg": { style: "Glam", mood: "Fancy", color: "Gold" },
  "red-earrings.jpg": { style: "Glam", mood: "Bold", color: "Red" },
  "earrings.jpg": { style: "Classic", mood: "Subtle", color: "Gold" },

  "green-dress.jpg": { style: "Dress", mood: "Romantic", color: "Green" },
  "lemon-dress.jpg": { style: "Dress", mood: "Playful", color: "Yellow" },
  "printed-blouse.jpg": { style: "Boho", mood: "Playful", color: "Multi" },
};

/* ------------------ Layout constants ------------------ */
const H_PADDING = 12;
const CARD_WIDTH = SCREEN_WIDTH - H_PADDING * 2;
const LEFT_W = Math.round(CARD_WIDTH * 0.56);
const RIGHT_W = Math.round(CARD_WIDTH * 0.36);

/* ------------------ Helpers ------------------ */
function humanizeFilename(fn: string) {
  // remove extension, replace - with space, capitalize each word
  const base = fn.replace(/\.[^.]+$/, "");
  return base
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* Build triples (top, bottom, accessory) but choose combos so items are not repeated across combos.
   Strategy:
   - build all triples (t,b,a)
   - shuffle them
   - pick triples greedily ensuring we haven't already used the top/bottom/accessory in previously selected combos
   - limit to `limit` combos
*/
function buildDistinctTriples(tops: string[], bottoms: string[], accs: string[], limit = 3): string[][] {
  if (!tops.length || !bottoms.length || !accs.length) return [];

  const triples: string[][] = [];
  for (const t of tops) for (const b of bottoms) for (const a of accs) triples.push([t, b, a]);

  const shuffled = shuffle(triples);
  const used = { tops: new Set<string>(), bottoms: new Set<string>(), accs: new Set<string>() };
  const out: string[][] = [];

  for (const tri of shuffled) {
    const [t, b, a] = tri;
    if (used.tops.has(t) || used.bottoms.has(b) || used.accs.has(a)) continue;
    out.push([t, b, a]);
    used.tops.add(t);
    used.bottoms.add(b);
    used.accs.add(a);
    if (out.length >= limit) break;
  }

  // If we couldn't find enough non-overlapping combos (because pools are small),
  // relax constraint and fill with remaining unique triples (still dedup by exact triple)
  if (out.length < limit) {
    const seen = new Set(out.map((c) => c.join("|")));
    for (const tri of shuffled) {
      const k = tri.join("|");
      if (seen.has(k)) continue;
      out.push(tri);
      seen.add(k);
      if (out.length >= limit) break;
    }
  }

  return out;
}

/* Build combos for tag; if tag lacks a role, substitute from global pools so combos are complete */
function buildCombosForTag(tag: string, limit = 3) {
  const pool = TAG_MAP[tag] || [];
  const tops = pool.filter((k) => ROLE_MAP[k] === "top");
  const bottoms = pool.filter((k) => ROLE_MAP[k] === "bottom");
  const accs = pool.filter((k) => ROLE_MAP[k] === "accessory");

  const globalTops = ALL_KEYS.filter((k) => ROLE_MAP[k] === "top");
  const globalBottoms = ALL_KEYS.filter((k) => ROLE_MAP[k] === "bottom");
  const globalAccs = ALL_KEYS.filter((k) => ROLE_MAP[k] === "accessory");

  const t = tops.length ? tops : globalTops;
  const b = bottoms.length ? bottoms : globalBottoms;
  const a = accs.length ? accs : globalAccs;

  return buildDistinctTriples(t, b, a, limit);
}

/* Build combos across multiple selected tags and dedupe */
function buildCombosForTags(tags: string[], limitPerTag = 3) {
  const chosen = tags && tags.length ? tags : Object.keys(TAG_MAP);
  let all: string[][] = [];
  chosen.forEach((t) => (all = all.concat(buildCombosForTag(t, limitPerTag))));
  const seen = new Set<string>();
  const out: string[][] = [];
  for (const c of all) {
    const k = c.join("|");
    if (!seen.has(k)) {
      seen.add(k);
      out.push(c);
    }
  }
  return out;
}

/* ------------------ UI components ------------------ */

function TopTabs({
  active,
  setActive,
}: {
  active: "collections" | "outfits" | "items";
  setActive: (s: "collections" | "outfits" | "items") => void;
}) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Saved</Text>
      <View style={styles.tabRow}>
        {(["collections", "outfits", "items"] as const).map((tab) => (
          <TouchableOpacity key={tab} onPress={() => setActive(tab)} style={[styles.tabPill, active === tab && styles.tabActive]}>
            <Text style={[styles.tabText, active === tab && styles.tabTextActive]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

/* Collection chips (Work/Leisure/Date Night) */
function CollectionChips({ selectedTags, toggleTag, onOpenAdd }: { selectedTags: string[]; toggleTag: (t: string) => void; onOpenAdd: () => void }) {
  return (
    <View style={styles.chipsContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRowContent}>
        <TouchableOpacity style={styles.chipDashed} onPress={onOpenAdd}>
          <Text style={styles.chipText}>+ Add new</Text>
        </TouchableOpacity>

        {TAG_CHIPS.map((chip) => {
          const active = selectedTags.includes(chip.key);
          return (
            <TouchableOpacity key={chip.key} onPress={() => toggleTag(chip.key)} style={[styles.chip, active && styles.chipSelected]}>
              <Text style={[styles.chipText, active && styles.chipTextSelected]}>{chip.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

/* Item filters: interactive pickers for Type / Style / Mood / Color */
const FILTER_DEFAULT = "All";
const TYPE_OPTIONS = [FILTER_DEFAULT, "top", "bottom", "accessory"];
const STYLE_OPTIONS = [FILTER_DEFAULT, ...Array.from(new Set(Object.values(ITEM_META).map((m) => m.style)))];
const MOOD_OPTIONS = [FILTER_DEFAULT, ...Array.from(new Set(Object.values(ITEM_META).map((m) => m.mood)))];
const COLOR_OPTIONS = [FILTER_DEFAULT, ...Array.from(new Set(Object.values(ITEM_META).map((m) => m.color)))];

function ItemFilters({
  filterType,
  setFilterType,
  filterStyle,
  setFilterStyle,
  filterMood,
  setFilterMood,
  filterColor,
  setFilterColor,
}: {
  filterType: string;
  setFilterType: (s: string) => void;
  filterStyle: string;
  setFilterStyle: (s: string) => void;
  filterMood: string;
  setFilterMood: (s: string) => void;
  filterColor: string;
  setFilterColor: (s: string) => void;
}) {
  return (
    <View style={styles.filtersRow}>
      <View style={styles.filterPicker}>
        <Picker selectedValue={filterType} onValueChange={(v) => setFilterType(String(v))}>
          {TYPE_OPTIONS.map((o) => (
            <Picker.Item label={o === FILTER_DEFAULT ? "Type ▾" : o} value={o} key={o} />
          ))}
        </Picker>
      </View>

      <View style={styles.filterPicker}>
        <Picker selectedValue={filterStyle} onValueChange={(v) => setFilterStyle(String(v))}>
          {STYLE_OPTIONS.map((o) => (
            <Picker.Item label={o === FILTER_DEFAULT ? "Style ▾" : o} value={o} key={o} />
          ))}
        </Picker>
      </View>

      <View style={styles.filterPicker}>
        <Picker selectedValue={filterMood} onValueChange={(v) => setFilterMood(String(v))}>
          {MOOD_OPTIONS.map((o) => (
            <Picker.Item label={o === FILTER_DEFAULT ? "Mood ▾" : o} value={o} key={o} />
          ))}
        </Picker>
      </View>

      <View style={styles.filterPicker}>
        <Picker selectedValue={filterColor} onValueChange={(v) => setFilterColor(String(v))}>
          {COLOR_OPTIONS.map((o) => (
            <Picker.Item label={o === FILTER_DEFAULT ? "Color ▾" : o} value={o} key={o} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

/* Collection card (left big + two on right) */
function CollectionCard({ images, onOpen, tagLabel }: { images: string[]; onOpen?: (images: string[]) => void; tagLabel?: string }) {
  const left = images[0];
  const r1 = images[1];
  const r2 = images[2];
  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <TouchableOpacity onPress={() => onOpen && onOpen(images)} activeOpacity={0.95}>
          <Image source={IMAGES[left]} style={styles.leftImage} />
        </TouchableOpacity>
        <View style={styles.rightColumn}>
          <TouchableOpacity onPress={() => onOpen && onOpen(images)} activeOpacity={0.95}>
            {r1 ? <Image source={IMAGES[r1]} style={styles.rightTop} /> : <View style={[styles.rightTop, styles.placeholder]} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onOpen && onOpen(images)} activeOpacity={0.95}>
            {r2 ? <Image source={IMAGES[r2]} style={styles.rightBottom} /> : <View style={[styles.rightBottom, styles.placeholder]} />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

/* Item card: image + correct title + optional badge */
function ItemCard({ keyName, onOpen }: { keyName: string; onOpen?: (k: string) => void }) {
  const badge = Object.keys(TAG_MAP).find((t) => (TAG_MAP[t] || []).includes(keyName));
  const title = humanizeFilename(keyName);
  return (
    <View style={styles.itemCard}>
      <TouchableOpacity onPress={() => onOpen && onOpen(keyName)} activeOpacity={0.95}>
        <View style={styles.itemImageWrap}>
          <Image source={IMAGES[keyName]} style={styles.itemImage} />
          {badge ? (
            <View style={styles.itemBadge}>
              <Text style={styles.itemBadgeText}>{badge}</Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
      <View style={styles.itemFooter}>
        <Text numberOfLines={1} style={styles.itemTitle}>
          {title}
        </Text>
      </View>
    </View>
  );
}

/* ------------------ MAIN APP ------------------ */
export default function App() {
  const [activeTab, setActiveTab] = useState<"collections" | "outfits" | "items">("collections");

  // Collections-only tags (single select)
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // modal preview
  const [modalImages, setModalImages] = useState<string[] | null>(null);

  // custom combos via +Add new
  const [customCombos, setCustomCombos] = useState<Array<{ tag: string; images: string[] }>>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // picker values for Add-new
  const roleLists = useMemo(
    () => ({
      tops: ALL_KEYS.filter((k) => ROLE_MAP[k] === "top"),
      bottoms: ALL_KEYS.filter((k) => ROLE_MAP[k] === "bottom"),
      accessories: ALL_KEYS.filter((k) => ROLE_MAP[k] === "accessory"),
    }),
    []
  );
  const [newTag, setNewTag] = useState<string>("Work");
  const [selectedTop, setSelectedTop] = useState<string | null>(roleLists.tops[0] || null);
  const [selectedBottom, setSelectedBottom] = useState<string | null>(roleLists.bottoms[0] || null);
  const [selectedAccessory, setSelectedAccessory] = useState<string | null>(roleLists.accessories[0] || null);

  // Item filters (multi-filter)
  const [filterType, setFilterType] = useState<string>(FILTER_DEFAULT);
  const [filterStyle, setFilterStyle] = useState<string>(FILTER_DEFAULT);
  const [filterMood, setFilterMood] = useState<string>(FILTER_DEFAULT);
  const [filterColor, setFilterColor] = useState<string>(FILTER_DEFAULT);

  // toggle tags (single-select behavior)
  const toggleTag = (tagKey: string) => setSelectedTags((prev) => (prev.includes(tagKey) ? [] : [tagKey]));

  // combos to show:
  // - for Collections: show combos for selected tag(s) (custom combos first for that tag)
  // - for Outfits: show combos generated from all tags (no chips)
  const combosToShow = useMemo(() => {
    const tags = activeTab === "collections" ? (selectedTags.length ? selectedTags : Object.keys(TAG_MAP)) : Object.keys(TAG_MAP);
    const custom = customCombos.filter((c) => (selectedTags.length ? selectedTags.includes(c.tag) : true)).map((c) => c.images);
    const generated = buildCombosForTags(tags, 3); // 3 combos per tag by default
    const seen = new Set<string>();
    const out: string[][] = [];
    custom.concat(generated).forEach((c) => {
      const k = c.join("|");
      if (!seen.has(k)) {
        seen.add(k);
        out.push(c);
      }
    });
    return out;
  }, [activeTab, selectedTags, customCombos]);

  // Items filtered by filterType/style/mood/color and by selectedTags when Collections tags selected
  const filteredItems = useMemo(() => {
    let items = ALL_KEYS.slice();

    // If a collection tag is selected, narrow items to that tag
    if (selectedTags.length) {
      const allowed = new Set<string>();
      selectedTags.forEach((t) => (TAG_MAP[t] || []).forEach((k) => allowed.add(k)));
      items = items.filter((k) => allowed.has(k));
    }

    // Type filter (top/bottom/accessory)
    if (filterType !== FILTER_DEFAULT) {
      items = items.filter((k) => ROLE_MAP[k] === filterType);
    }

    // Style / Mood / Color filters (use ITEM_META if present)
    if (filterStyle !== FILTER_DEFAULT) items = items.filter((k) => ITEM_META[k] && ITEM_META[k].style === filterStyle);
    if (filterMood !== FILTER_DEFAULT) items = items.filter((k) => ITEM_META[k] && ITEM_META[k].mood === filterMood);
    if (filterColor !== FILTER_DEFAULT) items = items.filter((k) => ITEM_META[k] && ITEM_META[k].color === filterColor);

    return items;
  }, [selectedTags, filterType, filterStyle, filterMood, filterColor]);

  const saveNewCombo = () => {
    const images = [selectedTop, selectedBottom, selectedAccessory].filter(Boolean) as string[];
    if (images.length === 3) {
      setCustomCombos((prev) => [{ tag: newTag, images }, ...prev]);
      setSelectedTags([newTag]); // show it immediately
    }
    setAddModalOpen(false);
  };

  const openPreview = (imgs: string[] | null) => setModalImages(imgs);

  return (
    <View style={styles.root}>
      <SafeAreaView style={{ backgroundColor: "#fbf7f4" }} />
      <TopTabs active={activeTab} setActive={setActiveTab} />

      {/* Controls */}
      {activeTab === "collections" && <CollectionChips selectedTags={selectedTags} toggleTag={toggleTag} onOpenAdd={() => setAddModalOpen(true)} />}
      {activeTab === "items" && (
        <ItemFilters
          filterType={filterType}
          setFilterType={setFilterType}
          filterStyle={filterStyle}
          setFilterStyle={setFilterStyle}
          filterMood={filterMood}
          setFilterMood={setFilterMood}
          filterColor={filterColor}
          setFilterColor={setFilterColor}
        />
      )}

      {/* CONTENT */}
      {activeTab === "collections" && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: H_PADDING, paddingBottom: 140 }}>
          {combosToShow.map((c, i) => (
            <CollectionCard key={`col-${i}`} images={c} onOpen={openPreview} />
          ))}
        </ScrollView>
      )}

      {activeTab === "outfits" && (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: H_PADDING, paddingBottom: 140 }}>
          {combosToShow.map((c, i) => (
            <CollectionCard key={`out-${i}`} images={c} onOpen={openPreview} />
          ))}
        </ScrollView>
      )}

      {activeTab === "items" && (
        <FlatList
          data={filteredItems}
          keyExtractor={(i) => i}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: H_PADDING }}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 140 }}
          renderItem={({ item }) => <ItemCard keyName={item} onOpen={(k) => openPreview([k])} />}
        />
      )}

      {/* modal preview */}
      <Modal visible={!!modalImages} transparent animationType="fade" onRequestClose={() => setModalImages(null)}>
        <SafeAreaView style={mStyles.modalWrap}>
          <View style={mStyles.backdrop} />
          <View style={mStyles.modalCard}>
            <ScrollView contentContainerStyle={{ padding: 14 }}>
              {modalImages && modalImages.length === 1 ? (
                <Image source={IMAGES[modalImages[0]]} style={mStyles.modalImageSingle} />
              ) : (
                <>
                  {modalImages && modalImages.length > 0 && <Image source={IMAGES[modalImages[0]]} style={mStyles.modalImageLarge} />}
                  <View style={{ height: 10 }} />
                  <View style={mStyles.thumbRow}>
                    {modalImages &&
                      modalImages.map((k) => (
                        <View key={k} style={mStyles.thumbWrap}>
                          <Image source={IMAGES[k]} style={mStyles.thumb} />
                        </View>
                      ))}
                  </View>
                </>
              )}
              <Text style={mStyles.title}>Preview</Text>
            </ScrollView>
            <View style={mStyles.actions}>
              <TouchableOpacity style={mStyles.btn} onPress={() => setModalImages(null)}>
                <Text style={mStyles.btnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Add-new modal */}
      <Modal visible={addModalOpen} transparent animationType="slide" onRequestClose={() => setAddModalOpen(false)}>
        <View style={styles.filterBackdrop}>
          <View style={[styles.filterModal, { width: Math.min(380, SCREEN_WIDTH - 40) }]}>
            <Text style={{ fontWeight: "800", marginBottom: 8 }}>Create new combo</Text>

            <Text style={{ marginTop: 8 }}>Tag</Text>
            <View style={styles.pickerWrap}>
              <Picker selectedValue={newTag} onValueChange={(v) => setNewTag(String(v))}>
                {Object.keys(TAG_MAP).map((t) => (
                  <Picker.Item label={t} value={t} key={t} />
                ))}
              </Picker>
            </View>

            <Text style={{ marginTop: 10 }}>Top</Text>
            <View style={styles.pickerWrap}>
              <Picker selectedValue={selectedTop} onValueChange={(v) => setSelectedTop(String(v))}>
                {roleLists.tops.map((k) => (
                  <Picker.Item label={humanizeFilename(k)} value={k} key={k} />
                ))}
              </Picker>
            </View>

            <Text style={{ marginTop: 10 }}>Bottom</Text>
            <View style={styles.pickerWrap}>
              <Picker selectedValue={selectedBottom} onValueChange={(v) => setSelectedBottom(String(v))}>
                {roleLists.bottoms.map((k) => (
                  <Picker.Item label={humanizeFilename(k)} value={k} key={k} />
                ))}
              </Picker>
            </View>

            <Text style={{ marginTop: 10 }}>Accessory</Text>
            <View style={styles.pickerWrap}>
              <Picker selectedValue={selectedAccessory} onValueChange={(v) => setSelectedAccessory(String(v))}>
                {roleLists.accessories.map((k) => (
                  <Picker.Item label={humanizeFilename(k)} value={k} key={k} />
                ))}
              </Picker>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 12 }}>
              <TouchableOpacity style={[styles.filterClose, { marginRight: 8 }]} onPress={() => setAddModalOpen(false)}>
                <Text style={{ fontWeight: "700" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterClose} onPress={saveNewCombo}>
                <Text style={{ fontWeight: "700" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* bottom nav placeholder */}
      <View style={styles.bottomNav}>
        <View style={styles.centerBar} />
        <View style={styles.navRow}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navIcon}>◻️</Text>
          <Text style={styles.navIcon}>🔖</Text>
        </View>
      </View>
    </View>
  );
}

/* ------------------ Styles ------------------ */
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fbf7f4", paddingTop: Platform.OS === "web" ? 18 : 36 },
  header: { paddingHorizontal: H_PADDING, paddingBottom: 6 },
  title: { fontSize: 28, fontWeight: "800", color: "#111" },
  tabRow: { marginTop: 8, flexDirection: "row", alignItems: "center" },
  tabPill: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  tabActive: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#efe9e2" },
  tabText: { color: "#777", fontWeight: "600" },
  tabTextActive: { color: "#111", fontWeight: "800" },

  chipsContainer: { height: 56, marginBottom: 6, paddingLeft: H_PADDING },
  chipsRowContent: { alignItems: "center", paddingRight: 20 },
  chip: { backgroundColor: "#fff", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: "#efe9e2" },
  chipSelected: { backgroundColor: "#efe4d9", borderColor: "#e6d2c5" },
  chipText: { fontSize: 13, fontWeight: "600", color: "#333" },
  chipTextSelected: { color: "#5a3c2f" },
  chipDashed: { backgroundColor: "#fff", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: "#d6d0cb", borderStyle: "dashed" },

  // filters row for Items
  filtersRow: { flexDirection: "row", paddingHorizontal: H_PADDING, marginBottom: 6, alignItems: "center" },
  filterPicker: { backgroundColor: "#fff", borderRadius: 14, borderWidth: 1, borderColor: "#efe9e2", marginRight: 10, overflow: "hidden", width: (SCREEN_WIDTH - H_PADDING * 2 - 10 * 3) / 4 },

  card: {
    width: CARD_WIDTH,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#efe9e2",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    position: "relative",
  },
  cardRow: { flexDirection: "row", alignItems: "flex-start" },

  leftImage: { width: LEFT_W, height: 200, borderRadius: 10, resizeMode: "contain", backgroundColor: "#f6f6f6" },
  rightColumn: { marginLeft: 14, width: RIGHT_W, justifyContent: "space-between" },
  rightTop: { width: "100%", height: 92, borderRadius: 8, resizeMode: "contain", backgroundColor: "#f6f6f6", marginBottom: 6 },
  rightBottom: { width: "100%", height: 92, borderRadius: 8, resizeMode: "contain", backgroundColor: "#f6f6f6" },

  placeholder: { backgroundColor: "#faf7f5" },

  itemCard: {
    width: (SCREEN_WIDTH - H_PADDING * 2 - 12) / 2,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f1e9e2",
    overflow: "hidden",
    marginTop: 12,
  },
  itemImageWrap: { height: 140, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  itemImage: { width: "100%", height: "100%", resizeMode: "contain" },
  itemBadge: { position: "absolute", top: 10, left: 10, backgroundColor: "#fff", paddingHorizontal: 8, paddingVertical: 6, borderRadius: 10 },
  itemBadgeText: { fontSize: 11, fontWeight: "700" },
  itemFooter: { padding: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  itemTitle: { fontSize: 13, fontWeight: "700", width: "78%" },

  bottomNav: { position: "absolute", left: 0, right: 0, bottom: 0, height: 78, borderTopWidth: 1, borderTopColor: "#f0ebe6", backgroundColor: "#fff", justifyContent: "center" },
  centerBar: { position: "absolute", top: 8, left: 24, right: 24, height: 4, borderRadius: 8, backgroundColor: "#dcd3cb" },
  navRow: { flexDirection: "row", justifyContent: "space-around", paddingHorizontal: 40 },
  navIcon: { fontSize: 20 },

  filterBackdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "center", alignItems: "center" },
  filterModal: { width: 300, backgroundColor: "#fff", borderRadius: 10, padding: 16, alignItems: "flex-start" },
  filterClose: { paddingHorizontal: 14, paddingVertical: 8, backgroundColor: "#efe4d9", borderRadius: 8, marginLeft: 8 },
  pickerWrap: { borderWidth: 1, borderColor: "#efe9e2", borderRadius: 8, marginTop: 6, width: "100%" },
});

/* ------------------ Modal styles ------------------ */
const mStyles = StyleSheet.create({
  modalWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(16,12,10,0.45)" },
  modalCard: { width: Math.min(SCREEN_WIDTH - 32, 760), maxHeight: 700, borderRadius: 12, backgroundColor: "#fff", overflow: "hidden" },
  modalImageSingle: { width: "100%", height: 420, resizeMode: "cover" },
  modalImageLarge: { width: "100%", height: 340, resizeMode: "cover", borderRadius: 8 },
  thumbRow: { flexDirection: "row", marginTop: 10, justifyContent: "space-between" },
  thumbWrap: { width: 100, height: 100, borderRadius: 8, overflow: "hidden", marginRight: 8 },
  thumb: { width: "100%", height: "100%", resizeMode: "cover" },
  title: { fontSize: 18, fontWeight: "800", marginTop: 12 },
  actions: { padding: 12, borderTopWidth: 1, borderColor: "#f1e9e2", alignItems: "flex-end" },
  btn: { backgroundColor: "#efe4d9", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  btnText: { color: "#5a3c2f", fontWeight: "800" },
});
