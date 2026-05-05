import { promises as fs } from 'node:fs';
import path from 'node:path';

const DIR = path.resolve('public/images');

const map = {
  'AttentionTo Detail.webp': 'attention-to-detail.webp',
  'Attentiontodetail2.webp': 'attention-to-detail-2.webp',
  'AttentionToDetail3.webp': 'attention-to-detail-3.webp',
  'BackyardGazebo.webp': 'backyard-gazebo.webp',
  'Build Under Progress.webp': 'build-under-progress.webp',
  'CleanSiteInsideHouse.webp': 'clean-site-inside-house.webp',
  'EffiecentHome.webp': 'efficient-home.webp',
  'FnishedHouseNightDrop.webp': 'finished-house-night-drop.webp',
  'FoundationPreBuild.webp': 'foundation-pre-build.webp',
  'FramedWithWindows.webp': 'framed-with-windows.webp',
  'FrontHouseDoneWindowsIn.webp': 'front-house-done.webp',
  'HouseFramedWithWindows.webp': 'house-framed-with-windows.webp',
  'Insidegazebo.webp': 'inside-gazebo.webp',
  'Logo.webp': 'logo.webp',
  'LuxuryShop.webp': 'luxury-shop.webp',
  'MidBuildBeautifulDay.webp': 'mid-build-beautiful-day.webp',
  'OwnerLiftingBeam.webp': 'owner-lifting-beam.webp',
  'ShopinFall.webp': 'shop-in-fall.webp',
  'TrussDay.webp': 'truss-day.webp',
  'WorkerAtSawHorse.webp': 'worker-at-sawhorse.webp',
  'Logo.png': 'logo.png',
  'AttentionToDetailVideo.mp4': 'attention-to-detail.mp4'
};

for (const [from, to] of Object.entries(map)) {
  const src = path.join(DIR, from);
  const dst = path.join(DIR, to);
  try {
    await fs.access(src);
    if (src.toLowerCase() === dst.toLowerCase() && src !== dst) {
      // Windows case-only rename: two-step
      const tmp = path.join(DIR, '__tmp_' + to);
      await fs.rename(src, tmp);
      await fs.rename(tmp, dst);
    } else if (src !== dst) {
      await fs.rename(src, dst);
    }
    console.log(`  ${from} → ${to}`);
  } catch {
    console.log(`  (skipped: ${from})`);
  }
}
