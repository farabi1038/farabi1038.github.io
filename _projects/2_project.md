---
layout: page
title: LLM-Integrated Computer Vision
description: Automated crash narrative generation from video data
img: assets/img/3.jpg
importance: 2
category: work
related_publications: true
---

This pioneering research integrates Large Language Models (LLMs) with computer vision systems to automatically generate detailed crash narratives from traffic surveillance video footage.

## Innovation

Traditional crash reporting requires manual review of footage and writing of incident reports. This project automates the process by:

1. **Video Understanding**: Using advanced computer vision to detect and track vehicles, identify crash events, and extract key visual information
2. **LLM Integration**: Leveraging video-LLMs to interpret visual data and generate human-readable narratives
3. **Synthetic Data Generation**: Creating synthetic crash videos to enhance model training and handle rare event scenarios

## Technical Approach

- **Computer Vision Pipeline**: YOLOv8 for detection, ByteTrack for tracking, and custom models for crash detection
- **Video-LLMs**: Integration with models like GPT-4V and other vision-language models
- **Temporal Localization**: HybridMamba architecture for fine-grained temporal localization of crash events
- **Synthetic Simulation**: CARLA and SUMO-based simulation for generating diverse crash scenarios

## Results

- Accepted paper at TRC-30 Conference 2024
- Ongoing work submitted to IEEE ITS Transactions
- Framework being tested with real traffic camera footage from Iowa DOT

## Future Work

Expanding to handle multiple camera views, improving narrative quality, and integrating with existing crash reporting systems.
