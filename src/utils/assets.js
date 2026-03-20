const loadedAssetPaths = new Set();
const failedAssetPaths = new Set();
const warmedAssetPaths = new Set();
const queuedAssetPaths = new Set();
const pendingAssetPaths = [];

const MAX_CONCURRENT_WARMS = 2;

let activeWarmCount = 0;
let warmDrainHandle = null;

function scheduleWarmDrain() {
  if (warmDrainHandle !== null || pendingAssetPaths.length === 0) {
    return;
  }

  if (typeof window !== "undefined" && typeof window.requestIdleCallback === "function") {
    warmDrainHandle = window.requestIdleCallback(
      () => {
        warmDrainHandle = null;
        drainWarmQueue();
      },
      { timeout: 280 }
    );

    return;
  }

  warmDrainHandle = window.setTimeout(() => {
    warmDrainHandle = null;
    drainWarmQueue();
  }, 40);
}

function finalizeWarm(assetPath, didLoad) {
  queuedAssetPaths.delete(assetPath);
  activeWarmCount = Math.max(0, activeWarmCount - 1);

  if (didLoad) {
    markAssetLoaded(assetPath);
  } else {
    markAssetFailed(assetPath);
  }

  scheduleWarmDrain();
}

function startWarmAsset(assetPath) {
  activeWarmCount += 1;

  const image = new Image();
  let hasFinalized = false;

  const completeWarm = (didLoad) => {
    if (hasFinalized) {
      return;
    }

    hasFinalized = true;
    finalizeWarm(assetPath, didLoad);
  };

  image.addEventListener("load", () => {
    completeWarm(true);
  });

  image.addEventListener("error", () => {
    completeWarm(false);
  });

  image.src = assetPath;

  if (image.complete) {
    completeWarm(image.naturalWidth > 0);
  }
}

function drainWarmQueue() {
  while (activeWarmCount < MAX_CONCURRENT_WARMS && pendingAssetPaths.length > 0) {
    const assetPath = pendingAssetPaths.shift();

    if (!assetPath) {
      continue;
    }

    startWarmAsset(assetPath);
  }
}

export function getAssetStateClass(assetPath) {
  return loadedAssetPaths.has(assetPath) ? "has-asset" : "asset-missing";
}

export function markAssetLoaded(assetPath) {
  if (!assetPath) {
    return;
  }

  loadedAssetPaths.add(assetPath);
  failedAssetPaths.delete(assetPath);
}

export function markAssetFailed(assetPath) {
  if (!assetPath) {
    return;
  }

  failedAssetPaths.add(assetPath);
  loadedAssetPaths.delete(assetPath);
}

export function warmAssetSources(assetPaths) {
  assetPaths.forEach((assetPath) => {
    if (
      !assetPath ||
      warmedAssetPaths.has(assetPath) ||
      queuedAssetPaths.has(assetPath) ||
      failedAssetPaths.has(assetPath)
    ) {
      return;
    }

    warmedAssetPaths.add(assetPath);
    queuedAssetPaths.add(assetPath);
    pendingAssetPaths.push(assetPath);
  });

  scheduleWarmDrain();
}
