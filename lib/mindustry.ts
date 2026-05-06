import { MindustryIcon } from "@/types/mindustry-icon";

const GITHUB_RAW =
    "https://raw.githubusercontent.com/Anuken/Mindustry/master/core/assets-raw/sprites";

function getSpritePath(region: string) {
    region = region.replace(/-ui$/, "")

    if (region.startsWith("item-")) {
        return `items/${region}.png`;
    }

    if (region.startsWith("liquid-")) {
        return `items/${region}.png`;
    }

    if (region.startsWith("unit-")) {
        return `units/${region}.png`;
    }

    if (region.startsWith("status-")) {
        return `statuses/${region}.png`;
    }

    if (region.startsWith("team-")) {
        return `teams/${region}.png`;
    }

    if (region.startsWith("block-")) {
        return `blocks/${region}.png`;
    }

    return `ui/${region}.png`;
}

function createIcon(codepoint: number, name: string, region: string): MindustryIcon {
    return {
        codepoint,
        unicode: String.fromCodePoint(codepoint),
        name,
        region,
        url: `${GITHUB_RAW}/${getSpritePath(region)}`,
    };
}

export const MINDUSTRY_ICONS: Record<string, MindustryIcon> = {
    spawn: createIcon(63743, "spawn", "block-spawn-ui"),
    deepwater: createIcon(63742, "deepwater", "block-deepwater-ui"),
    "shallow-water": createIcon(63741, "shallow-water", "block-shallow-water-ui"),

    copper: createIcon(63544, "copper", "item-copper-ui"),
    lead: createIcon(63543, "lead", "item-lead-ui"),
    metaglass: createIcon(63542, "metaglass", "item-metaglass-ui"),
    graphite: createIcon(63541, "graphite", "item-graphite-ui"),
    sand: createIcon(63540, "sand", "item-sand-ui"),
    coal: createIcon(63539, "coal", "item-coal-ui"),
    titanium: createIcon(63538, "titanium", "item-titanium-ui"),
    thorium: createIcon(63537, "thorium", "item-thorium-ui"),
    scrap: createIcon(63536, "scrap", "item-scrap-ui"),
    silicon: createIcon(63535, "silicon", "item-silicon-ui"),
    plastanium: createIcon(63534, "plastanium", "item-plastanium-ui"),
    "phase-fabric": createIcon(63533, "phase-fabric", "item-phase-fabric-ui"),
    "surge-alloy": createIcon(63532, "surge-alloy", "item-surge-alloy-ui"),
    "spore-pod": createIcon(63531, "spore-pod", "item-spore-pod-ui"),
    "blast-compound": createIcon(63530, "blast-compound", "item-blast-compound-ui"),
    pyratite: createIcon(63529, "pyratite", "item-pyratite-ui"),

    water: createIcon(63528, "water", "liquid-water-ui"),
    slag: createIcon(63527, "slag", "liquid-slag-ui"),
    oil: createIcon(63526, "oil", "liquid-oil-ui"),
    cryofluid: createIcon(63525, "cryofluid", "liquid-cryofluid-ui"),

    dagger: createIcon(63488, "dagger", "unit-dagger-ui"),
    mace: createIcon(63487, "mace", "unit-mace-ui"),
    fortress: createIcon(63486, "fortress", "unit-fortress-ui"),
    nova: createIcon(63485, "nova", "unit-nova-ui"),
    pulsar: createIcon(63484, "pulsar", "unit-pulsar-ui"),
    quasar: createIcon(63483, "quasar", "unit-quasar-ui"),
    crawler: createIcon(63482, "crawler", "unit-crawler-ui"),
    atrax: createIcon(63481, "atrax", "unit-atrax-ui"),
    spiroct: createIcon(63480, "spiroct", "unit-spiroct-ui"),
    arkyid: createIcon(63479, "arkyid", "unit-arkyid-ui"),
    flare: createIcon(63478, "flare", "unit-flare-ui"),
    horizon: createIcon(63477, "horizon", "unit-horizon-ui"),
    zenith: createIcon(63476, "zenith", "unit-zenith-ui"),
    antumbra: createIcon(63475, "antumbra", "unit-antumbra-ui"),
    eclipse: createIcon(63474, "eclipse", "unit-eclipse-ui"),
    mono: createIcon(63473, "mono", "unit-mono-ui"),
    poly: createIcon(63472, "poly", "unit-poly-ui"),
    mega: createIcon(63471, "mega", "unit-mega-ui"),

    burning: createIcon(63414, "burning", "status-burning-ui"),
    freezing: createIcon(63413, "freezing", "status-freezing-ui"),
    slow: createIcon(63411, "slow", "status-slow-ui"),
    wet: createIcon(63410, "wet", "status-wet-ui"),
    muddy: createIcon(63409, "muddy", "status-muddy-ui"),
    melting: createIcon(63408, "melting", "status-melting-ui"),
    sapped: createIcon(63407, "sapped", "status-sapped-ui"),
    tarred: createIcon(63405, "tarred", "status-tarred-ui"),
    overdrive: createIcon(63404, "overdrive", "status-overdrive-ui"),
    boss: createIcon(63401, "boss", "status-boss-ui"),
    shocked: createIcon(63400, "shocked", "status-shocked-ui"),
    blasted: createIcon(63399, "blasted", "status-blasted-ui"),

    sharded: createIcon(63356, "sharded", "team-sharded"),
    crux: createIcon(63357, "crux", "team-crux"),
    derelict: createIcon(63358, "derelict", "team-derelict"),

    beryllium: createIcon(63304, "beryllium", "item-beryllium-ui"),
    "fissile-matter": createIcon(63303, "fissile-matter", "item-fissile-matter-ui"),
    "dormant-cyst": createIcon(63302, "dormant-cyst", "item-dormant-cyst-ui"),
    neoplasm: createIcon(63301, "neoplasm", "liquid-neoplasm-ui"),
    tungsten: createIcon(63289, "tungsten", "item-tungsten-ui"),
    carbide: createIcon(63286, "carbide", "item-carbide-ui"),
    oxide: createIcon(63265, "oxide", "item-oxide-ui"),
    oxygen: createIcon(63264, "oxygen", "liquid-oxygen-ui"),
    hydrogen: createIcon(63263, "hydrogen", "liquid-hydrogen-ui"),
    ozone: createIcon(63261, "ozone", "liquid-ozone-ui"),
    cyanogen: createIcon(63252, "cyanogen", "liquid-cyanogen-ui"),
    gallium: createIcon(63251, "gallium", "liquid-gallium-ui"),
    nitrogen: createIcon(63243, "nitrogen", "liquid-nitrogen-ui"),
    arkycite: createIcon(63237, "arkycite", "liquid-arkycite-ui"),

    alphaaaa: createIcon(63146, "alphaaaa", "alphaaaa"),
    malis: createIcon(63145, "malis", "team-malis"),
    canvas: createIcon(63144, "canvas", "block-canvas-ui"),
    ranai: createIcon(63095, "ranai", "ranai"),
    cat: createIcon(63094, "cat", "cat"),
};

export const MINDUSTRY_ICONS_BY_UNICODE: Record<string, MindustryIcon> =
    Object.fromEntries(
        Object.values(MINDUSTRY_ICONS).map((icon) => [icon.unicode, icon])
    );