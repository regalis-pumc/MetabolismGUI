@echo off
title Metabolism Visualizer Server

echo Starting server at http://localhost:5500
echo Press Ctrl + C to stop.
echo.

python -m http.server 5500

pause
