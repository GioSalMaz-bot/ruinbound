const MODULE_ID = "ruinbound";
const VERSION = "1.0.0";

const CLASS_ID = "ruinbound";
const SUBCLASS_ID = "ruin-architect";

const FEATURES = [
  {
    id: "infernal-brand",
    name: "Infernal Brand",
    level: 1,
    description: `
      <p>You mark a creature you strike with a supernatural sigil of ruin.</p>
      <p>Once per turn when you hit a creature with a weapon attack, you may brand it.
      The brand lasts for 1 minute. Once per turn when you deal damage to a branded
      creature, deal an additional 1d6 necrotic damage.</p>
      <p>You can maintain a number of brands equal to your proficiency bonus.</p>
    `
  },
  {
    id: "ruin-dice",
    name: "Ruin Dice",
    level: 1,
    description: `
      <p>You possess a pool of Ruin Dice representing destructive supernatural power.</p>
      <p>You have a number of Ruin Dice equal to your proficiency bonus.
      Your Ruin Die is a d6. You regain all expended Ruin Dice when you finish a
      long rest.</p>
      <p>Several Ruinbound features allow you to spend a Ruin Die.</p>
    `
  },
  {
    id: "hellforged-armament",
    name: "Hellforged Armament",
    level: 1,
    description: `
      <p>You can bind yourself to one weapon during a long rest. You cannot be
      disarmed of your bound weapon against your will unless you are incapacitated.</p>
      <p>Your bound weapon counts as magical for overcoming resistance and immunity.</p>
    `
  },
  {
    id: "ruinous-strike",
    name: "Ruinous Strike",
    level: 2,
    description: `
      <p>When you hit with a weapon attack, you can spend one Ruin Die to deal
      additional necrotic damage equal to the die's roll.</p>
    `
  },
  {
    id: "infernal-mobility",
    name: "Infernal Mobility",
    level: 2,
    description: `
      <p>As a bonus action, you may teleport up to 15 feet to an unoccupied space
      you can see. After teleporting, your next weapon hit before the end of the
      turn deals additional fire damage equal to your proficiency bonus.</p>
    `
  },
  {
    id: "extra-attack",
    name: "Extra Attack",
    level: 5,
    description: `
      <p>You can attack twice, instead of once, whenever you take the Attack action
      on your turn.</p>
    `
  },
  {
    id: "brand-of-command",
    name: "Brand of Command",
    level: 6,
    description: `
      <p>Your brands become instruments of control. When a branded creature attacks
      an ally you can see, you may use your reaction and expend one Ruin Die to
      impose disadvantage on the attack.</p>
    `
  },
  {
    id: "ruinous-resilience",
    name: "Ruinous Resilience",
    level: 9,
    description: `
      <p>When you fail a saving throw, you may spend one Ruin Die and add the result
      to the saving throw, potentially turning failure into success.</p>
    `
  },
  {
    id: "greater-brand",
    name: "Greater Brand",
    level: 10,
    description: `
      <p>The additional damage from Infernal Brand becomes 1d8.</p>
      <p>A branded creature also cannot benefit from invisibility against you.</p>
    `
  },
  {
    id: "devastating-strike",
    name: "Devastating Strike",
    level: 11,
    description: `
      <p>Once per turn when you hit a branded creature, you may spend a Ruin Die
      to deal an additional 2d8 necrotic damage.</p>
    `
  },
  {
    id: "unbreakable-will",
    name: "Unbreakable Will",
    level: 13,
    description: `
      <p>You have advantage on saving throws against being frightened or charmed.</p>
      <p>When you would become frightened or charmed, you may spend a Ruin Die to
      ignore the effect for 1 minute.</p>
    `
  },
  {
    id: "greater-ruin",
    name: "Greater Ruin",
    level: 15,
    description: `
      <p>Your Ruin Die becomes a d10.</p>
    `
  },
  {
    id: "ruinous-recovery",
    name: "Ruinous Recovery",
    level: 17,
    description: `
      <p>When you reduce a branded enemy to 0 hit points, regain one expended
      Ruin Die. This can occur once per turn.</p>
    `
  },
  {
    id: "avatar-of-ruin",
    name: "Avatar of Ruin",
    level: 20,
    description: `
      <p>As a bonus action, you can enter your Avatar of Ruin state for 1 minute.
      During it, you gain resistance to bludgeoning, piercing, and slashing damage,
      your walking speed increases by 20 feet, and your Infernal Brand damage
      becomes 2d10.</p>
      <p>Once you use this feature, you cannot use it again until you finish a
      long rest.</p>
    `
  }
];

const ARCHITECT_FEATURES = [
  {
    id: "ruinous-geometry",
    name: "Ruinous Geometry",
    level: 3,
    description: `
      <p>You can reshape the battlefield around your brands.</p>
      <p>When you brand a creature, you may designate a 10-foot-radius ruin zone
      centered on it until the start of your next turn. The zone is difficult terrain
      for your enemies.</p>
    `
  },
  {
    id: "architects-command",
    name: "Architect's Command",
    level: 7,
    description: `
      <p>When a creature inside one of your ruin zones takes damage from one of
      your attacks, you may move it up to 10 feet in a direction you choose.</p>
      <p>A creature can be moved this way only once per turn.</p>
    `
  },
  {
    id: "fracture-space",
    name: "Fracture Space",
    level: 11,
    description: `
      <p>When you teleport using Infernal Mobility, you may create a temporary
      rupture at the space you leave and the space you enter.</p>
      <p>Each enemy within 5 feet of either rupture must succeed on a Dexterity
      saving throw or take 2d8 force damage.</p>
    `
  },
  {
    id: "masterwork-of-ruin",
    name: "Masterwork of Ruin",
    level: 15,
    description: `
      <p>Your ruin zones expand to a 15-foot radius.</p>
      <p>Enemies entering one of your ruin zones for the first time on a turn take
      force damage equal to your proficiency bonus.</p>
    `
  }
];

function description(html) {
  return {
    value: html.trim(),
    chat: html.trim()
  };
}

function featureData(feature) {
  return {
    name: feature.name,
    type: "feat",
    img: "icons/magic/unholy/hand-grasping-pink.webp",
    system: {
      description: description(feature.description),
      identifier: feature.id
    },
    flags: {
      [MODULE_ID]: {
        feature: true,
        level: feature.level
      }
    }
  };
}

async function getOrCreateItem(data) {
  const identifier = data.system?.identifier;

  const existing = game.items.find(i =>
    i.getFlag(MODULE_ID, "generated") &&
    i.system.identifier === identifier
  );

  if (existing) return existing;

  data.flags ??= {};
  data.flags[MODULE_ID] ??= {};
  data.flags[MODULE_ID].generated = true;

  return Item.create(data, { renderSheet: false });
}

async function createFeature(feature) {
  return getOrCreateItem(featureData(feature));
}

async function createClass(features, subclass) {
  const existing = game.items.find(i =>
    i.type === "class" &&
    i.system.identifier === CLASS_ID
  );

  if (existing) return existing;

  const grants = features.map((item, index) => ({
    uuid: item.uuid,
    optional: false,
    sort: index * 10000
  }));

  const levels = {};

  for (const feature of FEATURES) {
    levels[feature.level] ??= [];
    const item = features.find(f =>
      f.getFlag(MODULE_ID, "feature") &&
      f.name === feature.name
    );

    if (item) levels[feature.level].push(item);
  }

  const advancement = [];

  for (const [level, items] of Object.entries(levels)) {
    advancement.push({
      type: "ItemGrant",
      level: Number(level),
      configuration: {
        items: items.map((item, index) => ({
          uuid: item.uuid,
          optional: false,
          sort: index * 10000
        })),
        optional: false,
        sorting: "m",
        spell: null
      },
      value: {
        added: {}
      }
    });
  }

  advancement.push({
    type: "Subclass",
    level: 3,
    configuration: {},
    value: {
      document: null,
      uuid: null
    }
  });

  return Item.create({
    name: "Ruinbound",
    type: "class",
    img: "icons/magic/unholy/hand-glowing-pink.webp",
    system: {
      identifier: CLASS_ID,
      description: description(`
        <h2>Ruinbound</h2>
        <p>A martial class that channels infernal destruction through supernatural
        brands, cursed weapons, and controlled battlefield devastation.</p>
      `),
      hitDie: "d10",
      levels: 20,
      advancement
    },
    flags: {
      [MODULE_ID]: {
        generated: true,
        class: true
      }
    }
  }, { renderSheet: false });
}

async function createSubclass(features) {
  const existing = game.items.find(i =>
    i.type === "subclass" &&
    i.system.identifier === SUBCLASS_ID
  );

  if (existing) return existing;

  const advancement = [];

  const levels = {};

  for (const feature of ARCHITECT_FEATURES) {
    levels[feature.level] ??= [];
    const item = features.find(f => f.name === feature.name);
    if (item) levels[feature.level].push(item);
  }

  for (const [level, items] of Object.entries(levels)) {
    advancement.push({
      type: "ItemGrant",
      level: Number(level),
      configuration: {
        items: items.map((item, index) => ({
          uuid: item.uuid,
          optional: false,
          sort: index * 10000
        })),
        optional: false,
        sorting: "m",
        spell: null
      },
      value: {
        added: {}
      }
    });
  }

  return Item.create({
    name: "Ruin Architect",
    type: "subclass",
    img: "icons/magic/symbols/runes-star-pentagon-orange.webp",
    system: {
      identifier: SUBCLASS_ID,
      classIdentifier: CLASS_ID,
      description: description(`
        <h2>Ruin Architect</h2>
        <p>You treat the battlefield as a structure waiting to be redesigned.
        Your supernatural power creates zones of distortion, forced movement,
        ruptures, and controlled destruction.</p>
      `),
      advancement
    },
    flags: {
      [MODULE_ID]: {
        generated: true,
        subclass: true
      }
    }
  }, { renderSheet: false });
}

/* ------------------------------------------------------------ */
/* Ruin Dice automation                                         */
/* ------------------------------------------------------------ */

function getRuinDie(actor) {
  const level =
    actor.classes?.ruinbound?.system?.levels ??
    actor.items.find(i => i.type === "class" &&
      i.system.identifier === CLASS_ID)?.system?.levels ??
    1;

  if (level >= 15) return "1d10";
  if (level >= 5) return "1d8";
  return "1d6";
}

function getRuinResource(actor) {
  const existing = actor.items.find(i =>
    i.type === "feat" &&
    i.getFlag(MODULE_ID, "ruinResource")
  );

  return existing;
}

async function ensureRuinResource(actor) {
  if (!actor) return null;

  let item = getRuinResource(actor);

  if (item) return item;

  item = await actor.createEmbeddedDocuments("Item", [{
    name: "Ruin Dice",
    type: "feat",
    img: "icons/magic/symbols/runes-star-pentagon-orange.webp",
    system: {
      description: description(`
        <p>Your pool of supernatural Ruin Dice.</p>
      `),
      identifier: "ruin-dice-resource",
      uses: {
        spent: 0,
        max: "@prof",
        recovery: [{
          period: "lr",
          type: "recoverAll"
        }]
      }
    },
    flags: {
      [MODULE_ID]: {
        ruinResource: true
      }
    }
  }]);

  return item[0];
}

async function spendRuinDie(actor) {
  const item = await ensureRuinResource(actor);
  if (!item) return false;

  const uses = item.system.uses;

  if ((uses?.value ?? uses?.max ?? 0) <= 0) {
    ui.notifications.warn("No Ruin Dice remaining.");
    return false;
  }

  const spent = uses.spent ?? 0;
  const max = uses.max ?? actor.system.attributes.prof;

  await item.update({
    "system.uses.spent": Math.min(spent + 1, max)
  });

  return true;
}

async function rollRuinDie(actor) {
  if (!(await spendRuinDie(actor))) return null;

  const die = getRuinDie(actor);
  const roll = await new Roll(die).evaluate();

  await roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor }),
    flavor: "Ruin Die"
  });

  return roll.total;
}

/* ------------------------------------------------------------ */
/* Automation hooks                                             */
/* ------------------------------------------------------------ */

Hooks.once("ready", async () => {
  if (game.user.isGM) {
    try {
      const classFeatures = [];

      for (const feature of FEATURES) {
        classFeatures.push(await createFeature(feature));
      }

      const architectFeatures = [];

      for (const feature of ARCHITECT_FEATURES) {
        architectFeatures.push(await createFeature(feature));
      }

      const allFeatures = [...classFeatures, ...architectFeatures];

      const subclass = await createSubclass(allFeatures);
      const ruinbound = await createClass(allFeatures, subclass);

      console.log(
        `[${MODULE_ID}] Ruinbound ${VERSION} initialized.`,
        ruinbound,
        subclass
      );

      ui.notifications.info(
        "Ruinbound installed: Ruinbound class and Ruin Architect subclass are ready."
      );
    } catch (error) {
      console.error(`[${MODULE_ID}] Installation error`, error);
      ui.notifications.error(
        "Ruinbound encountered an installation error. Check the browser console."
      );
    }
  }
});

/*
 * Automatically maintain the Ruin Dice resource when a Ruinbound
 * class is present on an actor.
 */
Hooks.on("updateActor", async (actor) => {
  if (!game.user.isGM) return;

  const ruinbound = actor.items.find(i =>
    i.type === "class" &&
    i.system.identifier === CLASS_ID
  );

  if (!ruinbound) return;

  await ensureRuinResource(actor);
});

/*
 * Expose a small API for macros and other modules.
 */
Hooks.once("init", () => {
  game.modules.get(MODULE_ID).api = {
    spendRuinDie,
    rollRuinDie,
    ensureRuinResource,
    getRuinDie
  };

  console.log(`[${MODULE_ID}] API registered.`);
});
