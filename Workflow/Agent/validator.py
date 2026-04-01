"""
Visual validator — no-op stub.
Visual analysis is handled entirely by Claude Vision (screenshot sent directly via API).
"""
from __future__ import annotations


class ScreenValidator:
    def describe(self, image_bytes: bytes, block_type: str = "full") -> str:
        return ""

    def describe_base64(self, b64: str, block_type: str = "full") -> str:
        return ""
