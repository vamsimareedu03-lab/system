"""Compatibility entry point for the unified VTON backend API.

Prefer running:
    python -m backend.vton_api.wsgi
"""

from backend.vton_api import create_app

app = create_app()


if __name__ == "__main__":
    settings = app.config["settings"]
    app.run(host=settings.host, port=settings.port, debug=settings.debug)
