"""
conftest.py — src/ level

Puts the src/ directory on sys.path so that all tests under src/
can import project modules with their natural dotted names
(e.g. `from verification.verifier import verify_certificate`)
regardless of which directory pytest is invoked from.

This removes the need for sys.path hacks in individual test files.
"""

import sys
import os

# Insert project root, src/, and verification/ on sys.path
_src = os.path.abspath(os.path.dirname(__file__))
_root = os.path.abspath(os.path.join(_src, ".."))
_verification = os.path.abspath(os.path.join(_src, "verification"))

for p in [_root, _src, _verification]:
    if p not in sys.path:
        sys.path.insert(0, p)
