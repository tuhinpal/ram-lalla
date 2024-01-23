import cp from "child_process";
import fs from "fs";
import sharp from "sharp";

// extract every 4th frame from the video
async function extractFrames() {
  // clean up the frames directory
  if (fs.existsSync("assets/frames")) {
    fs.rmSync("assets/frames", { recursive: true });
  }
  fs.mkdirSync("assets/frames");

  const cmd = "ffmpeg -i assets/video.mp4 -vf fps=10 assets/frames/%d.png";
  cp.execSync(cmd);
}

// convert the pngs to jpgs and lower the quality with sharp
async function convertFrames() {
  const files = fs.readdirSync("assets/frames");
  const jpgs = files.filter((f) => f.endsWith(".png"));
  for (const jpg of jpgs) {
    const input = `assets/frames/${jpg}`;
    const output = `assets/frames/${jpg.replace(".png", ".jpg")}`;
    await sharp(input).resize(1280, 720).jpeg({ quality: 30 }).toFile(output);

    console.log(`Converted ${input} to ${output}`);
  }

  // remove the pngs
  for (const jpg of jpgs) {
    fs.unlinkSync(`assets/frames/${jpg}`);
  }
}

async function createConfig() {
  // get all .jpg files in the frames directory
  const files = fs.readdirSync("assets/frames");
  const jpgs = files.filter((f) => f.endsWith(".jpg"));

  // order them 1.jpg, 2.jpg, 3.jpg, etc.
  jpgs.sort((a, b) => {
    const aNum = parseInt(a.replace(".jpg", ""));
    const bNum = parseInt(b.replace(".jpg", ""));
    return aNum - bNum;
  });

  // create the config file
  fs.writeFileSync("assets/frames/config.json", JSON.stringify(jpgs));
}

// extractFrames();
// convertFrames();
// createConfig();
