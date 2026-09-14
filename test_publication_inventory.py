import shutil
import subprocess
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parent
CHECKER = ROOT / "_scripts/check_publications.py"


class PublicationInventoryTest(unittest.TestCase):
    def fixture(self) -> Path:
        temp = Path(tempfile.mkdtemp())
        self.addCleanup(shutil.rmtree, temp, True)
        for relative in ["_bibliography", "_data", "_news", "_projects", "_pages", "assets/img/publication_preview"]:
            shutil.copytree(ROOT / relative, temp / relative)
        return temp

    def run_check(self, root: Path) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            ["py", str(CHECKER), "--root", str(root)],
            text=True,
            capture_output=True,
            check=False,
        )

    def test_current_repository_passes(self):
        result = self.run_check(ROOT)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_missing_asset_fails(self):
        root = self.fixture()
        (root / "assets/img/publication_preview/demos/srjepa-poster.webp").unlink()
        result = self.run_check(root)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("missing preview asset", result.stdout)

    def test_public_paused_collision_fails(self):
        root = self.fixture()
        paused = root / "_bibliography/ecrl-paused.bib"
        paused.write_text(paused.read_text(encoding="utf-8") + "\n@article{wen2026predictor, title={duplicate}}\n", encoding="utf-8")
        result = self.run_check(root)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("cannot be public and paused", result.stdout)

    def test_oversized_poster_fails(self):
        root = self.fixture()
        poster = root / "assets/img/publication_preview/demos/srjepa-poster.webp"
        poster.write_bytes(poster.read_bytes() + b"0" * 10_000)
        result = self.run_check(root)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("demo poster exceeds 30 KB", result.stdout)

    def test_oversized_animation_fails(self):
        root = self.fixture()
        animation = root / "assets/img/publication_preview/demos/srjepa-masking.gif"
        animation.write_bytes(animation.read_bytes() + b"0" * 600_000)
        result = self.run_check(root)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("demo animation exceeds 700 KB", result.stdout)

    def test_visible_paused_title_fails(self):
        root = self.fixture()
        news = root / "_news/paused-paper.md"
        news.write_text("---\nlayout: post\n---\nPose as a Lens: Diagnosing Self-Supervised Visual Representations Through Frozen Keypoint Probing\n", encoding="utf-8")
        result = self.run_check(root)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("paused title exposed", result.stdout)

    def test_derivative_name_collision_fails(self):
        root = self.fixture()
        duplicate = root / "assets/img/publication_preview/statz.gif"
        duplicate.write_bytes((root / "assets/img/publication_preview/statz.png").read_bytes())
        result = self.run_check(root)
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("image derivative collision", result.stdout)


if __name__ == "__main__":
    unittest.main()
