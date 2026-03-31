"""
Figma REST API — screenshots with base64 vision output for Claude.
"""
import os
import base64
import requests

FIGMA_API_BASE = "https://api.figma.com/v1"


def take_screenshot(file_key: str, node_id: str, scale: float = 1) -> dict:
    """
    Fetch a node screenshot and return it as base64 so Claude can see it.
    Returns: {"base64": "...", "media_type": "image/jpeg"} or {"error": "..."}
    """
    token = os.environ.get("FIGMA_ACCESS_TOKEN", "")
    if not token:
        return {"error": "FIGMA_ACCESS_TOKEN not set"}

    headers = {"X-Figma-Token": token}
    url = f"{FIGMA_API_BASE}/images/{file_key}"
    params = {
        "ids": node_id,
        "format": "jpg",
        "scale": scale,
    }

    resp = requests.get(url, headers=headers, params=params, timeout=30)
    data = resp.json()

    if data.get("err"):
        return {"error": data["err"]}

    # Figma returns IDs with "-" instead of ":"
    normalized_id = node_id.replace(":", "-")
    img_url = data.get("images", {}).get(normalized_id, "")
    if not img_url:
        return {"error": f"No image URL for node {node_id}"}

    img_resp = requests.get(img_url, timeout=30)
    if img_resp.status_code != 200:
        return {"error": f"Image download failed: {img_resp.status_code}"}

    encoded = base64.standard_b64encode(img_resp.content).decode("utf-8")
    return {"base64": encoded, "media_type": "image/jpeg", "node_id": node_id}
